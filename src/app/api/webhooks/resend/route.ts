import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { verifyWebhook } from "@/lib/email";
import { WebhookEventPayload } from "resend";

/**
 * POST handler for Resend webhooks (email.sent, email.delivered, email.bounced, ...).
 *
 * verification of POST req code based on example in https://resend.com/docs/webhooks/verify-webhooks-requests
 * Verification is mandatory here - without it anyone who finds the URL can write fake events as service_role).
 * Each event is stored as its own row in `email_events` — append-only, never updated.
 */
export async function POST(req: NextRequest) {
    // Guard the config error separately: with an empty secret verifyWebhook
    // also throws, which would be misleadingly logged as a forged signature.
    if (!process.env.RESEND_WEBHOOK_SECRET) {
        console.error("[Thuismeester] Webhook: RESEND_WEBHOOK_SECRET is not set");
        return NextResponse.json({ message: "Internal error." }, { status: 500 });
    }

    let payload: string;
    try {
        payload = await req.text();
    } catch (err) {
        console.log("[Thuismeester] Webhook rejected: body could not be read:", err);
        return new NextResponse('Issue with body', { status: 400 });
    }

    const svixId = req.headers.get('svix-id');
    const svixTimestamp = req.headers.get('svix-timestamp');
    const svixSignature = req.headers.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
        console.log("[Thuismeester] Webhook rejected: svix headers are missing");
        return new NextResponse('Missing svix headers', { status: 400 });
    }

    let result: WebhookEventPayload;
    try {
        // Throws an error if the webhook is invalid, otherwise, returns the parsed payload object
        result = verifyWebhook(payload, svixId, svixTimestamp, svixSignature);
    } catch (err) {
        // The error itself is logged because not every throw here is a forged
        // signature: a wrong/rotated RESEND_WEBHOOK_SECRET throws too, and
        // without the underlying error a config problem would be
        // indistinguishable from an attack in the logs (every real event
        // would just be "rejected" until someone notices).
        console.log(`[Thuismeester] Webhook rejected: verification failed (svix-id: ${svixId}):`, err);
        return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    }

    console.log(`[Thuismeester] Webhook: received verified event '${result.type}' (svix-id: ${svixId})`);

    try {
        switch (result.type) {
            case 'email.sent':
            case 'email.delivered':
            case 'email.bounced':
            case 'email.complained':
            case 'email.delivery_delayed':
            case 'email.failed':
            case 'email.suppressed': {
                const { error } = await getSupabaseClient()
                    .from("email_events")
                    .insert({
                        svix_id: svixId,
                        event_type: result.type,
                        email_id: result.data?.email_id ?? null,
                        recipient: Array.isArray(result.data?.to) ? result.data.to.join(", ") : null, // we never send to more than one person so we are fine
                        subject: result.data?.subject ?? null,
                        occurred_at: result.created_at,
                        payload: JSON.parse(payload),
                    });

                if (error) {
                    // Resend retries with the same svix-id, so a uniqueness violation means
                    // this event was already stored by an earlier delivery — ack it.
                    if (error.code === "23505") {
                        console.log(`[Thuismeester] Webhook: duplicate delivery of svix-id ${svixId}, already stored — acknowledging with 200`);
                        return NextResponse.json({ message: "Already processed." }, { status: 200 });
                    }

                    console.error("[Thuismeester] Webhook: database insert failed (Resend will retry):", error);
                    // A non-2xx response makes Resend retry the delivery later.
                    return NextResponse.json({ message: "Internal error." }, { status: 500 });
                }
                console.log(`[Thuismeester] Webhook: stored event '${result.type}' in 'email_events' (email_id: ${result.data?.email_id ?? "unknown"})`);
                return NextResponse.json({ message: "Processed." }, { status: 200 });
            }

            default:
                // We should not receive these event types.
                // Ack with a 200 anyway: returning nothing is a Next.js error (500),
                // and any non-2xx makes Resend retry the event indefinitely.
                console.log(`[Thuismeester] Webhook: ignored unexpected event type '${result.type}'`);
                return NextResponse.json({ message: "Ignored." }, { status: 200 });
        }
    } catch (err) {
        console.error("[Thuismeester] Webhook: unexpected error:", err);
        return NextResponse.json({ message: "Internal error." }, { status: 500 });
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
