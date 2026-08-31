/**
 * Site-wide content constants (src/lib/site.ts)
 *
 * Single source of truth for facts that appear in several places (pages,
 * forms, footer and the branded emails). Edit them here and every usage
 * updates at once.
 */

/**
 * The canonical production URL. Used as the metadataBase for absolute
 * Open Graph URLs and in robots.txt and the sitemap.
 */
export const SITE_URL =
  process.env.VERCEL_ENV === 'production'
    ? 'https://thuismeester.com'
    : `https://${process.env.VERCEL_URL}`;

/**
 * The public contact address. Shown to visitors whenever something goes
 * wrong ("mail ons gerust via …") and used as the reply-to on confirmation
 * emails, so replies land in the public inbox instead of at no-reply.
 */
export const CONTACT_EMAIL = "contact@thuismeester.com";

/**
 * The From address on every email the site sends (confirmations and the
 * internal contact notification). Replies are steered elsewhere via Reply-To.
 */
export const NO_REPLY_ADDRESS = "no-reply@thuismeester.com";

/** The short region description used in headers, footers and emails. */
export const REGION_NOTE = "Amersfoort en omstreken";

/**
 * The places Thuismeester serves in the first phase. Used for the region
 * pills on the homepage, the sidebar list and the dropdown on the signup
 * page, the contact page and the email footer.
 */
export const REGIONS = ["Amersfoort", "Leusden", "Hoevelaken", "Nijkerk", "Soest"];

/**
 * The options in the signup form's woonplaats dropdown, and the allowlist
 * the register route validates submissions against. Defined here — a plain
 * shared module — because both a client component and a server route need
 * it: importing it from the form itself doesn't work, since a "use client"
 * module's exports become client-reference proxies (not real values) inside
 * a server bundle at runtime.
 */
export const AREA_OPTIONS = [...REGIONS, "Anders"];

/**
 * The options in the contact form's subject dropdown, and the allowlist the
 * contact route validates submissions against (same reasoning as
 * AREA_OPTIONS). "Anders" covers anything that doesn't fit the listed
 * topics.
 */
export const TOPICS = [
    "Vraag over de dienst",
    "Vraag over aanmelden",
    "Vraag over mijn regio",
    "Samenwerking / partnerschap",
    "Anders",
];
