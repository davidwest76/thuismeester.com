/**
 * Shared validation helpers (src/lib/validation.ts)
 *
 * Small, framework-agnostic functions used by the API routes to validate and
 * normalise incoming form data on the server. Keeping them here means both
 * routes apply exactly the same rules instead of each route having its own
 * slightly different copy.
 */

/**
 * isValidEmail — true if the string looks like a real email address.
 * Checks for the minimum structure: text @ text . text, with no spaces.
 *
 * This is intentionally simple. The only way to truly verify an address is to
 * send mail to it, so here we just reject input that is obviously malformed.
 *
 * Besides whitespace, the characters , ; < > " ( ) are rejected. The address
 * is passed to the mail provider as a recipient (`to:`) and as a `reply-to:`
 * header, and those characters are exactly the ones mail software uses to
 * separate multiple recipients or to combine a display name with an address
 * ("Name" <addr>). Excluding them removes any chance of a crafted "address"
 * being interpreted as more than one recipient somewhere down the chain.
 * (Legitimate addresses containing them — quoted local parts — are vanishingly
 * rare, and losing those is a fair trade for the hardening.)
 */
export function isValidEmail(email: string): boolean {
    return /^[^\s@,;<>"()]+@[^\s@,;<>"()]+\.[^\s@,;<>"()]+$/.test(email);
}

/**
 * normalisePostcode — formats a Dutch postcode consistently before storing it.
 *   "1234ab"  → "1234 AB"
 *   "1234 ab" → "1234 AB"
 * Anything that isn't a standard "4 digits + 2 letters" postcode is simply
 * returned uppercased with surrounding/duplicate spaces removed.
 */
export function normalisePostcode(postcode: string): string {
    return postcode
        .toUpperCase()
        .replace(/\s+/g, "")
        .replace(/^(\d{4})([A-Z]{2})$/, "$1 $2");
}

/**
 * sanitiseSingleLine — strips ASCII control characters (including CR/LF) from
 * a value that is only ever meant to be a single line (name, subject, area).
 *
 * Why this is necessary:
 *   - These values are interpolated into email *subject lines*. Length is
 *     already capped, but nothing else stopped a submitted value from
 *     containing raw newlines, and injected CR/LF in a header value is the
 *     classic email header-injection vector. Whether or not the provider
 *     would catch it, it should never leave our code.
 *   - The same values appear in server log lines; embedded newlines would let
 *     a submitter forge extra, official-looking log entries (log injection),
 *     which directly undermines using the logs to diagnose incidents.
 *
 * Control characters are replaced with a space (not removed) so that
 * "line1\nline2" stays readably "line1 line2", then whitespace is collapsed.
 */
export function sanitiseSingleLine(value: string): string {
    return value
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * sanitiseMultiLine — like sanitiseSingleLine but for free-text fields (the
 * contact message, the signup remark) where newlines are meaningful and must
 * be kept. Only the *other* control characters (NUL, ESC, backspace, …) are
 * removed: they have no legitimate place in form input, and NUL bytes in
 * particular are a common trigger for edge-case bugs in databases, JSON
 * serialisers and mail clients. (Tab, \n and \r are kept.)
 */
export function sanitiseMultiLine(value: string): string {
    return value
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim();
}
