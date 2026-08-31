import { CreateEmailResponse, WebhookEventPayload, Resend } from 'resend';

/**
 * The Resend client is created lazily instead of at module scope.
 *
 * Why: `new Resend(undefined)` throws when the API key is missing. At module
 * scope that exception fires while Next.js is *importing* the route module,
 * so every route that imports this file (register, contact, webhook) would
 * respond with an opaque framework 500 and no [Thuismeester] log line —
 * making a simple missing-env-var deployment mistake very hard to diagnose.
 * By constructing the client on first use, the failure happens inside the
 * route's try/catch and is logged with a clear, searchable message.
 */
let resendClient: Resend | null = null;

function getResend(): Resend {
    if (!resendClient) {
        if (!process.env.RESEND_SEND_API_KEY) {
            // Explicit message so a misconfigured deployment is identifiable
            // from a single log line instead of a generic library error.
            throw new Error("[Thuismeester] Email: RESEND_SEND_API_KEY is not set — emails cannot be sent");
        }
        resendClient = new Resend(process.env.RESEND_SEND_API_KEY);
    }
    return resendClient;
}

/**
 * A utility which sends an email
 *
 * This pattern has been copied from the example snippet.
 *
 * Resend reports API failures via the `error` field of the response instead of
 * throwing, so both that and genuinely thrown errors (e.g. network, missing
 * API key) are logged here. Never throws — a failed email should not break
 * the calling route. Returns true only when Resend accepted the email, so
 * callers can tell the visitor when a send did not go through.
 * Callers must `await` this: on Vercel a floating promise can be cut off when
 * the response is sent, and the email would silently never go out.
 */
export async function sendMail(from: string, to: string, subject: string, body: string, replyTo?: string): Promise<boolean> {
    try {
        const response = await getResend().emails.send({
            from: from,
            to: [to],
            subject: subject,
            html: body,
            ...(replyTo ? { replyTo } : {}),
        });
        if (response.error) {
            console.error(`[Thuismeester] Email: failed to send "${subject}" to ${to}:`, response.error);
            return false;
        }
        // The Resend id is what webhook events reference, so logging it here
        // links a send to its delivery events in 'email_events'.
        console.log(`[Thuismeester] Email: sent "${subject}" to ${to} (Resend id: ${response.data?.id})`);
        return true;
    } catch (err) {
        console.error(`[Thuismeester] Email: failed to send "${subject}" to ${to}:`, err);
        return false;
    }
}

/**
 * Webhook verification gets its own client instead of going through
 * getResend(): `webhooks.verify` is pure HMAC checking (svix) done locally
 * with RESEND_WEBHOOK_SECRET and never calls the Resend API, so it must not
 * fail on a deployment where RESEND_SEND_API_KEY is missing. The placeholder
 * key only exists because the Resend constructor refuses an empty one; it is
 * never sent anywhere.
 */
let webhookVerifier: Resend | null = null;

function getWebhookVerifier(): Resend {
    if (!webhookVerifier) {
        if (!process.env.RESEND_WEBHOOK_SECRET) {
            throw new Error("[Thuismeester] Email: RESEND_WEBHOOK_SECRET is not set — webhooks cannot be verified");
        }

        webhookVerifier = new Resend("re_local_webhook_verification_only"); // We need a string - this could be anything
    }
    return webhookVerifier;
}

/**
 * Verifies that a webhook request genuinely came from Resend (svix HMAC
 * signature check). Throws when the signature is invalid.
 *
 * This pattern has been copied from https://resend.com/docs/webhooks/verify-webhooks-requests
 */
export function verifyWebhook(payload: string, svixId: string, svixTimestamp: string, svixSignature: string): WebhookEventPayload {
    return getWebhookVerifier().webhooks.verify({
        payload,
        headers: {
            id: svixId,
            timestamp: svixTimestamp,
            signature: svixSignature,
        },
        webhookSecret: process.env.RESEND_WEBHOOK_SECRET!,
    });
}
