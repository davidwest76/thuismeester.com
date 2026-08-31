/**
 * email-util.ts — shared building blocks for transactional e-mails.
 *
 * Every e-mail that Thuismeester sends (signup confirmation, contact
 * confirmation, internal notification) is rendered through renderBrandedEmail()
 * so they all share exactly the same look: the site's green/beige palette, a
 * serif wordmark header and a muted footer with the region and launch info.
 *
 * E-mail HTML is deliberately old-fashioned: clients like Outlook and Gmail
 * strip <style> blocks and ignore modern CSS, so everything uses nested
 * <table> elements with inline styles. Web fonts are not reliable in e-mail,
 * so Georgia stands in for Playfair Display and Arial for Inter.
 */

import { CONTACT_EMAIL, REGION_NOTE, REGIONS } from "./site";

// Brand tokens — kept in sync with tailwind.config.js
const COLOR = {
  green: "#2C4A3E",       // primary brand green
  greenSoft: "#3D6B5C",   // lighter green accent
  beigeLight: "#FAF8F4",  // card background
  beige: "#F0EBE1",       // page background
  beigeDark: "#E4DBCC",   // borders and dividers
  ink: "#1A2018",         // primary text
  inkMuted: "#6B7266",    // secondary text
};

const FONT_SERIF = "Georgia, 'Times New Roman', serif";
const FONT_SANS = "Arial, Helvetica, sans-serif";

/**
 * CONTACT_MAILTO — the contact address as a ready-made mailto link in the
 * house style, for use anywhere an e-mail template mentions the address.
 */
export const CONTACT_MAILTO = `<a href="mailto:${CONTACT_EMAIL}" style="color:${COLOR.greenSoft};">${CONTACT_EMAIL}</a>`;

/**
 * escapeHtml — makes user-supplied text safe to embed in e-mail HTML.
 * Form values (name, message, …) must always pass through this before they
 * are placed in a template, otherwise a submitted value like
 * "<script>…</script>" would end up as live markup in the e-mail.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * textToHtml — escapes a plain-text value and converts its line breaks to
 * <br /> so multi-line form input (such as a contact message) keeps its
 * paragraph structure in the e-mail.
 */
export function textToHtml(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />");
}

/**
 * paragraph — one body paragraph in the house style.
 * Accepts an HTML string (escape user input first!).
 */
export function paragraph(html: string): string {
  return `<p style="margin:0 0 16px 0;font-family:${FONT_SANS};font-size:15px;line-height:24px;color:${COLOR.ink};">${html}</p>`;
}

/**
 * EmailContent — what a template builder returns: the subject line and the
 * rendered HTML, ready to hand to sendMail(). Shared by the emails.ts files
 * of the register and contact routes.
 */
export interface EmailContent {
  subject: string;
  html: string;
}

export interface EmailDetail {
  label: string;
  value: string; // HTML — escape user input before passing it in
}

/**
 * detailsTable — renders a bordered "submitted details" block, used to play
 * back the details someone submitted (name, postcode, message, …).
 */
export function detailsTable(details: EmailDetail[]): string {
  const rows = details
    .map(
      ({ label, value }) => `
              <tr>
                <td style="padding:10px 16px;border-bottom:1px solid ${COLOR.beigeDark};font-family:${FONT_SANS};font-size:12px;text-transform:uppercase;letter-spacing:1px;color:${COLOR.inkMuted};vertical-align:top;white-space:nowrap;">${label}</td>
                <td style="padding:10px 16px;border-bottom:1px solid ${COLOR.beigeDark};font-family:${FONT_SANS};font-size:14px;line-height:22px;color:${COLOR.ink};width:100%;">${value}</td>
              </tr>`
    )
    .join("");

  return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px 0;border:1px solid ${COLOR.beigeDark};background-color:${COLOR.beigeLight};border-collapse:collapse;">
        ${rows}
      </table>`;
}

export interface BrandedEmailOptions {
  /** Heading shown at the top of the card, e.g. "Bedankt voor je aanmelding" */
  title: string;
  /** Hidden preview line shown in inbox listings next to the subject */
  preheader: string;
  /** Main content — compose with paragraph() and detailsTable() */
  bodyHtml: string;
  /** Optional small print above the footer, e.g. a reply instruction */
  footnote?: string;
}

/**
 * renderBrandedEmail — wraps content in the shared Thuismeester e-mail shell:
 * beige page, white card, green wordmark header and a muted footer.
 * Returns a complete HTML document ready to hand to a mail provider.
 */
export function renderBrandedEmail({ title, preheader, bodyHtml, footnote }: BrandedEmailOptions): string {
  const footnoteHtml = footnote
    ? `<p style="margin:24px 0 0 0;padding-top:16px;border-top:1px solid ${COLOR.beigeDark};font-family:${FONT_SANS};font-size:12px;line-height:19px;color:${COLOR.inkMuted};">${footnote}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLOR.beige};">
  <!-- Preheader: invisible in the mail body, visible as preview text in the inbox -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLOR.beige};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">

          <!-- Header: green band with the wordmark -->
          <tr>
            <td style="background-color:${COLOR.green};padding:28px 40px;">
              <span style="font-family:${FONT_SERIF};font-size:24px;font-weight:600;color:#ffffff;letter-spacing:-0.5px;">Thuismeester</span><br />
              <span style="font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.6);">${REGION_NOTE}</span>
            </td>
          </tr>

          <!-- Card body -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 40px;border:1px solid ${COLOR.beigeDark};border-top:none;">
              <h1 style="margin:0 0 20px 0;font-family:${FONT_SERIF};font-size:24px;line-height:32px;font-weight:600;color:${COLOR.ink};">${escapeHtml(title)}</h1>
              ${bodyHtml}
              ${footnoteHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;">
              <p style="margin:0;font-family:${FONT_SANS};font-size:12px;line-height:19px;color:${COLOR.inkMuted};">
                Thuismeester &middot; Jouw vaste aanspreekpunt voor praktische hulp rondom je woning<br />
                ${REGIONS.join(" &middot; ")}
              </p>
              <p style="margin:12px 0 0 0;font-family:${FONT_SANS};font-size:12px;line-height:19px;color:${COLOR.inkMuted};">
                Vragen? Mail naar ${CONTACT_MAILTO}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
