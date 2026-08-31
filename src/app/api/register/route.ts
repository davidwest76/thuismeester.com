import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from '@/lib/supabase'
// AREA_OPTIONS is both the form's dropdown list and this route's allowlist,
// so the two can never drift apart. It lives in site.ts rather than in the
// form component: a "use client" module's exports are client-reference
// proxies (not real values) when imported into a server bundle at runtime.
import { AREA_OPTIONS, CONTACT_EMAIL, NO_REPLY_ADDRESS } from "@/lib/site";
import { isValidEmail, normalisePostcode, sanitiseMultiLine, sanitiseSingleLine } from "@/lib/validation";
import { clientIpFrom, exceedsBodySize, isRateLimited } from "@/lib/request-guards";
import { sendMail } from "@/lib/email";
import { buildAanmeldBevestigingEmail, buildDubbeleAanmeldingEmail } from "./emails";

/**
 * The one message shown for every server-side failure: it tells the visitor
 * what happened and that they can (if they want to) reach us directly.
 */
const FAILURE_MESSAGE =
    `Er is bij ons iets misgegaan en je aanmelding is niet opgeslagen. ` +
    `Probeer het later opnieuw, of mail ons gerust via ${CONTACT_EMAIL}.`;

/**
 * Shown (as a `warning` next to the success message) when the registration
 * went through but the confirmation email could not be sent: the visitor
 * should not retry, but does deserve to know why no email is coming.
 */
const EMAIL_WARNING =
    `Let op: je aanmelding is gelukt, maar het versturen van de bevestigingsmail is helaas niet gelukt. ` +
    `Je hoeft niets opnieuw te doen. Vragen? Mail ons gerust via ${CONTACT_EMAIL}.`;

interface RegistrationDetails {
    name: string;
    email: string;
    postcode: string;
    area: string;
    remark?: string;
}

function validatePayload(body: unknown): { valid: true; data: RegistrationDetails } | { valid: false; message: string } {
    if (!body || typeof body !== "object") {
        return { valid: false, message: "Ongeldig verzoek." };
    }

    const b = body as Record<string, unknown>;

    if (!b.name || typeof b.name !== "string" || b.name.trim().length < 2 || b.name.trim().length > 200)
        return { valid: false, message: "Vul een geldige naam in." };

    if (!b.email || typeof b.email !== "string" || b.email.length > 200 || !isValidEmail(b.email))
        return { valid: false, message: "Vul een geldig e-mailadres in." };

    if (!b.postcode || typeof b.postcode !== "string" || b.postcode.trim().length < 4 || b.postcode.trim().length > 10)
        return { valid: false, message: "Vul een geldige postcode in." };

    // Must be one of the dropdown's own values.
    if (!b.area || typeof b.area !== "string" || !AREA_OPTIONS.includes(b.area.trim()))
        return { valid: false, message: "Selecteer een woonplaats." };

    if (b.remark && (typeof b.remark !== "string" || b.remark.length > 2000))
        return { valid: false, message: "Houd je opmerking korter dan 2000 tekens." };

    // Single-line fields go through sanitiseSingleLine to strip control
    // characters (CR/LF included): they end up in email content and in log
    // lines, where embedded newlines would enable header injection and log
    // forging. The remark keeps its newlines (multi-line by design) but is
    // stripped of all other control characters.
    return {
        valid: true,
        data: {
            name: sanitiseSingleLine(b.name),
            email: sanitiseSingleLine(b.email.toLowerCase().trim()),
            postcode: normalisePostcode(sanitiseSingleLine(b.postcode)),
            area: sanitiseSingleLine(b.area),
            remark: b.remark ? sanitiseMultiLine(String(b.remark)) : undefined,
        },
    };
}

export async function POST(req: NextRequest) {
    // Rate limit before any work happens. This endpoint is unauthenticated
    // and triggers a database write plus an outbound email, so without a
    // brake a script could flood the database and burn through the email
    // provider's quota/reputation. Humans never hit this limit.
    const clientIp = clientIpFrom(req);
    if (isRateLimited("register", clientIp)) {
        console.log(`[Thuismeester] Signup: rate limit exceeded for ${clientIp}, returning 429`);
        return NextResponse.json(
            { message: "Te veel aanmeldingen achter elkaar. Wacht een paar minuten en probeer het opnieuw." },
            { status: 429 }
        );
    }

    // Reject oversized payloads before buffering/parsing them: the per-field
    // length checks below only run after a full JSON parse, so without this
    // a multi-megabyte body would be processed in full first.
    if (exceedsBodySize(req)) {
        console.log(`[Thuismeester] Signup: rejected, request body too large (content-length: ${req.headers.get("content-length")})`);
        return NextResponse.json({ message: "Verzoek is te groot." }, { status: 413 });
    }

    let body: unknown;
    try {
        // Read and parse the JSON body that the browser sent
        body = await req.json();
    } catch (err) {
        console.log("[Thuismeester] Signup: rejected, invalid JSON body:", err);
        // A body that isn't JSON is a malformed request, not a failure on our
        // side, so this doesn't use FAILURE_MESSAGE ("er is bij ons iets
        // misgegaan").
        return NextResponse.json(
            { message: "Ongeldig verzoek." },
            { status: 400 }
        );
    }

    try {
        if (body && typeof body === "object" && "_hp" in body && body._hp) {
            console.log("[Thuismeester] Signup: bot caught by honeypot, returning fake 200");
            return NextResponse.json({ message: "Aanmelding ontvangen." }, { status: 200 });
        }

        // Validate the data — return 400 Bad Request if anything is wrong
        const result = validatePayload(body);
        if (!result.valid) {
            console.log("[Thuismeester] Signup: rejected, validation failed:", result.message);
            return NextResponse.json({ message: result.message }, { status: 400 });
        }

        const { data: cleanedData } = result;
        console.log(`[Thuismeester] Signup: received valid submission from ${cleanedData.email} (${cleanedData.postcode}, ${cleanedData.area})`);

        const { error } = await getSupabaseClient()
            .from('subscriptions')
            .insert({ name: cleanedData.name, email: cleanedData.email, postcode: cleanedData.postcode, area: cleanedData.area, remark: cleanedData.remark });

        // error code 23505 = breaking a uniqueness rule: this address is
        // already registered. Deliberately NOT reported to the browser — a
        // "this address is already registered" response would let anyone
        // probe which addresses are subscribed (enumeration). Instead the
        // visitor sees the normal success and the address itself receives an
        // email explaining that the earlier registration still stands.
        const isDuplicate = error?.code === '23505';

        if (error && !isDuplicate) {
            // Supabase is the system of record: the registration failed, so no
            // confirmation email goes out and the visitor is told directly.
            console.error("[Thuismeester] Signup: database insert failed:", error);
            return NextResponse.json(
                { message: FAILURE_MESSAGE },
                { status: 500 }
            );
        }

        console.log(
            isDuplicate
                ? `[Thuismeester] Signup: ${cleanedData.email} is already registered — sending repeat-signup email, responding as success`
                : `[Thuismeester] Signup for ${cleanedData.email}: stored in 'subscriptions', sending confirmation email`
        );

        // The registration is safely stored (or already was), so from here
        // nothing may fail the request anymore. Await so the send isn't cut
        // off when the response goes out; a failed email is logged by
        // sendMail and reported to the visitor as a warning, but doesn't fail
        // the registration. Replies to either email go to the public inbox.
        const { subject, html } = isDuplicate
            ? buildDubbeleAanmeldingEmail()
            : buildAanmeldBevestigingEmail(cleanedData);
        const emailSent = await sendMail(NO_REPLY_ADDRESS, cleanedData.email, subject, html, CONTACT_EMAIL);

        // Completion marker (the contact route has the same): its absence in
        // the logs after a "stored in 'subscriptions'" line pinpoints a
        // failure to the email step when diagnosing an incident.
        console.log(`[Thuismeester] Signup: completed for ${cleanedData.email}${emailSent ? "" : " (without confirmation email)"}`);
        return NextResponse.json(
            emailSent
                ? { message: "Aanmelding ontvangen." }
                : { message: "Aanmelding ontvangen.", warning: EMAIL_WARNING },
            { status: 200 }
        );
    } catch (err) {
        console.error("[Thuismeester] Signup: unexpected error:", err);
        return NextResponse.json(
            { message: FAILURE_MESSAGE },
            { status: 500 }
        );
    }
}

/**
 * GET handler — returns 405 Method Not Allowed.
 * Only POST is supported on this endpoint. Without this, Next.js would return
 * a 404 for GET requests, which is misleading. 405 is the correct HTTP status.
 */
export function GET() {
    return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
