import 'server-only';

/**
 * Request guards (src/lib/request-guards.ts)
 *
 * Cheap, dependency-free protections applied by the public form routes
 * (/api/register and /api/contact) before any real work happens.
 *
 * Why these routes need them: both endpoints are unauthenticated and cause
 * writes + outbound email. The contact route in particular sends a
 * confirmation email to a *visitor-supplied* address, which without a brake
 * would let a script use thuismeester.com to flood an arbitrary victim's
 * inbox ("email bombing"). That not only harms the victim: the resulting
 * bounces and spam complaints would destroy the domain's sender reputation
 * and can get the Resend account suspended — taking down all transactional
 * email for the site. Rate limiting is therefore a security fix, not an
 * optimisation. The webhook route is NOT rate limited: it is authenticated
 * by its signature and must stay available for Resend's retries.
 */

/**
 * One counting bucket per client: how many requests since the window began.
 */
interface Bucket {
    count: number;
    windowStart: number;
}

const buckets = new Map<string, Bucket>();

/**
 * How many form submissions one client may make per window, per route.
 * Generous for a human (nobody signs up or asks a question 5 times in
 * 10 minutes) while still capping what a simple abuse script achieves.
 */
const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Cap on tracked buckets so the Map cannot grow without bound if someone
 * sprays requests from many spoofed/rotating addresses (memory stability).
 * When the cap is hit, expired buckets are pruned first.
 */
const MAX_BUCKETS = 5000;

/**
 * isRateLimited — fixed-window rate limiter, keyed by route + client IP.
 *
 * Deliberately in-memory: this site runs fine without an extra service
 * (Redis/Upstash) for its traffic level. Known limitation, documented so
 * nobody mistakes this for a watertight guarantee: on serverless hosting
 * each warm instance keeps its own Map, so the effective limit is
 * "MAX_REQUESTS_PER_WINDOW per instance". That still turns an unlimited
 * email-sending endpoint into a heavily throttled one, which is the goal.
 * If abuse is ever observed despite this, the counter can be moved to a
 * shared store.
 */
export function isRateLimited(routeKey: string, clientIp: string): boolean {
    const now = Date.now();
    const key = `${routeKey}:${clientIp}`;

    // Prune expired buckets when the map gets large, before adding new ones.
    if (buckets.size >= MAX_BUCKETS) {
        for (const [k, bucket] of buckets) {
            if (now - bucket.windowStart >= WINDOW_MS) buckets.delete(k);
        }
        // Still full after pruning (active flood from many IPs): fail closed
        // for new clients — refusing a form submission is recoverable, while
        // letting a flood through (or growing until out-of-memory) is not.
        if (buckets.size >= MAX_BUCKETS && !buckets.has(key)) return true;
    }

    const bucket = buckets.get(key);
    if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
        buckets.set(key, { count: 1, windowStart: now });
        return false;
    }

    bucket.count += 1;
    return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

/**
 * clientIpFrom — best-effort client IP for rate-limit bucketing.
 *
 * On Vercel (and most reverse proxies) `x-forwarded-for` is set by the
 * platform and its first entry is the real client. When the header is
 * missing entirely (e.g. local dev) all requests share one bucket, which
 * is harmless there.
 */
export function clientIpFrom(req: Request): string {
    const forwardedFor = req.headers.get("x-forwarded-for");
    return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

/**
 * Largest request body the form routes accept, with margin: the biggest
 * legitimate payload (contact form, 5000-char message, multi-byte
 * characters) stays well under this.
 */
const MAX_BODY_BYTES = 50_000;

/**
 * exceedsBodySize — rejects oversized payloads *before* they are read and
 * JSON-parsed. Per-field length checks only run after a successful parse,
 * so without this a multi-megabyte body would still be buffered and parsed
 * in full on every request — free memory/CPU pressure for an attacker.
 * Content-Length can be absent on chunked requests (those fall through to
 * the normal parse path), so this is a cheap first line, not the only one.
 */
export function exceedsBodySize(req: Request): boolean {
    const contentLength = Number(req.headers.get("content-length"));
    return Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES;
}
