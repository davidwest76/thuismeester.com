import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from '@/lib/supabase'
import { isValidEmail, sanitiseMultiLine, sanitiseSingleLine } from "@/lib/validation";
import { clientIpFrom, exceedsBodySize, isRateLimited } from "@/lib/request-guards";
// TOPICS is both the form's dropdown list and this route's allowlist, so
// the two can never drift apart. It lives in site.ts rather than in the
// form component: a "use client" module's exports are client-reference
// proxies (not real values) when imported into a server bundle at runtime.
import { CONTACT_EMAIL, NO_REPLY_ADDRESS, TOPICS } from "@/lib/site";
import { buildContactBevestigingEmail, buildContactNotificatieEmail } from "./emails";
import { sendMail } from "@/lib/email";

/**
 * The one message shown for every server-side failure: it tells the visitor
 * what happened and that they can (if they want to) reach us directly.
 */
const FAILURE_MESSAGE =
    `Er is bij ons iets misgegaan en je bericht is niet opgeslagen. ` +
    `Probeer het later opnieuw, of mail ons gerust via ${CONTACT_EMAIL}.`;

/**
 * Shown when the internal notification email could not be sent. Without that
 * email nobody at Thuismeester ever sees the message, so this failure must
 * be surfaced as a real error: the visitor should try again or mail directly.
 */
const NOTIFICATION_FAILURE_MESSAGE =
    `Er is iets misgegaan bij het versturen van je bericht. ` +
    `Probeer het later opnieuw, of mail ons direct via ${CONTACT_EMAIL}.`;

/**
 * Shown (as a `warning` next to the success message) when the message reached
 * us but the confirmation email to the visitor could not be sent.
 */
const EMAIL_WARNING =
    `Let op: je bericht is goed ontvangen, maar het versturen van de bevestigingsmail is helaas niet gelukt. ` +
    `Je hoeft niets opnieuw te doen. Vragen? Mail ons gerust via ${CONTACT_EMAIL}.`;

interface ContactFormDetails {
    name: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * validatePayload - checks that the incoming data is valid before continuing.
 */
function validatePayload(body: unknown): { valid: true; data: ContactFormDetails } | { valid: false; message: string } {
    if (!body || typeof body !== "object") {
        return { valid: false, message: "Ongeldig verzoek." };
    }

    const b = body as Record<string, unknown>;

    if (!b.name || typeof b.name !== "string" || b.name.trim().length < 2 || b.name.trim().length > 200) {
        return { valid: false, message: "Vul een geldige naam in." };
    }

    if (!b.email || typeof b.email !== "string" || b.email.length > 200 || !isValidEmail(b.email)) {
        return { valid: false, message: "Vul een geldig e-mailadres in." };
    }
    // Required so every inquiry is categorised — the dropdown offers "Anders"
    // for anything that doesn't fit the listed topics. Must be one of the
    // dropdown's own values. (This also makes a length cap
    // unnecessary.)
    if (!b.subject || typeof b.subject !== "string" || !TOPICS.includes(b.subject.trim())) {
        return { valid: false, message: "Selecteer een onderwerp." };
    }
    if (!b.message || typeof b.message !== "string" || b.message.trim().length < 10) {
        return { valid: false, message: "Schrijf een bericht van minimaal 10 tekens." };
    }
    if (b.message.length > 5000) {
        return { valid: false, message: "Houd je bericht korter dan 5000 tekens." };
    }

    // The name and subject are interpolated into the *subject line* of the
    // internal notification email and into log lines. sanitiseSingleLine
    // strips control characters (CR/LF included) so a crafted submission
    // cannot inject extra email headers or forge log entries. The message
    // keeps its newlines (rendered via textToHtml) but loses all other
    // control characters.
    return {
        valid: true,
        data: {
            name: sanitiseSingleLine(b.name),
            email: sanitiseSingleLine(b.email.toLowerCase().trim()),
            subject: sanitiseSingleLine(b.subject),
            message: sanitiseMultiLine(b.message),
        },
    };
}

export async function POST(req: NextRequest) {
    // Rate limit before any work happens. This endpoint is the most abusable
    // on the site: it is unauthenticated and sends an email to a
    // visitor-supplied address, so without a brake a script could use it to
    // flood a victim's inbox — and the resulting bounces/complaints would
    // wreck the domain's sender reputation. Humans never hit this limit.
    const clientIp = clientIpFrom(req);
    if (isRateLimited("contact", clientIp)) {
        console.log(`[Thuismeester] Contact: rate limit exceeded for ${clientIp}, returning 429`);
        return NextResponse.json(
            { message: "Te veel berichten achter elkaar. Wacht een paar minuten en probeer het opnieuw." },
            { status: 429 }
        );
    }

    // Reject oversized payloads before buffering/parsing them: the per-field
    // length checks below only run after a full JSON parse, so without this
    // a multi-megabyte body would be processed in full first.
    if (exceedsBodySize(req)) {
        console.log(`[Thuismeester] Contact: rejected, request body too large (content-length: ${req.headers.get("content-length")})`);
        return NextResponse.json({ message: "Verzoek is te groot." }, { status: 413 });
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch (err) {
        console.log("[Thuismeester] Contact: rejected, invalid JSON body:", err);
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
            console.log("[Thuismeester] Contact: bot caught by honeypot, returning fake 200");
            return NextResponse.json({ message: "Bericht ontvangen." }, { status: 200 });
        }

        // Validate — return 400 if anything is missing or wrong
        const result = validatePayload(body);
        if (!result.valid) {
            console.log("[Thuismeester] Contact: rejected, validation failed:", result.message);
            return NextResponse.json({ message: result.message }, { status: 400 });
        }

        const { data: cleanedData } = result;
        console.log(`[Thuismeester] Contact: received valid message from ${cleanedData.name} <${cleanedData.email}>, subject: "${cleanedData.subject}"`);

        const { error } = await getSupabaseClient()
            .from('inquiries')
            .insert({ name: cleanedData.name, email: cleanedData.email, subject: cleanedData.subject, message: cleanedData.message });

        if (error) {
            // Supabase is the system of record: if the message wasn't stored
            // the submission failed, so no emails go out and the visitor is
            // told directly (with our address, in case they want to mail us).
            console.error("[Thuismeester] Contact: database insert failed:", error);
            return NextResponse.json(
                { message: FAILURE_MESSAGE },
                { status: 500 }
            );
        }
        console.log("[Thuismeester] Contact: stored in 'inquiries'");

        // The internal notification is the only way the message ever gets
        // read and answered — the 'inquiries' row is a backup, not an inbox.
        // So unlike the confirmation below, a failure here fails the request:
        // the visitor is told to try again or mail us directly. (A retry
        // stores a second 'inquiries' row; harmless, and the rows make the
        // failed attempt recoverable.) Awaited so the sends aren't cut off
        // when the response goes out.
        // Reply-To on the internal notification is the visitor, so replying
        // from the inbox answers them directly.
        console.log("[Thuismeester] Contact: sending internal notification email");
        const { subject, html } = buildContactNotificatieEmail(cleanedData);
        const notificationSent = await sendMail(NO_REPLY_ADDRESS, CONTACT_EMAIL, subject, html, cleanedData.email);

        if (!notificationSent) {
            // No confirmation email either: it would promise the visitor a
            // reply to a message nobody is going to see.
            console.error(`[Thuismeester] Contact: internal notification failed for ${cleanedData.email} — returning error to visitor`);
            return NextResponse.json(
                { message: NOTIFICATION_FAILURE_MESSAGE },
                { status: 500 }
            );
        }

        // The message reached us, so from here nothing may fail the request
        // anymore: a failed confirmation is logged by sendMail and reported
        // to the visitor as a warning, but the submission still succeeds.
        console.log(`[Thuismeester] Contact: sending confirmation email to ${cleanedData.email}`);
        const { subject: subject2, html: html2 } = buildContactBevestigingEmail(cleanedData);
        
        // Reply-To on the visitor's confirmation is the public inbox, so a
        // reply to it reaches us instead of no-reply.
        const confirmationSent = await sendMail(NO_REPLY_ADDRESS, cleanedData.email, subject2, html2, CONTACT_EMAIL);

        console.log(`[Thuismeester] Contact: completed for ${cleanedData.name} <${cleanedData.email}>${confirmationSent ? "" : " (without confirmation email)"}`);
        return NextResponse.json(
            confirmationSent
                ? { message: "Bericht ontvangen." }
                : { message: "Bericht ontvangen.", warning: EMAIL_WARNING },
            { status: 200 }
        );
    } catch (err) {
        console.error("[Thuismeester] Contact: unexpected error:", err);
        return NextResponse.json(
            { message: FAILURE_MESSAGE },
            { status: 500 }
        );
    }
}

/*
 * GET handler — returns 405 Method Not Allowed.
 * Only POST is supported on this endpoint. Without this, Next.js would return
 * a 404 for GET requests, which is misleading. 405 is the correct HTTP status.
 */
export function GET() {
    return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
