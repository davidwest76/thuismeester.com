/**
 * emails.ts (contact) — email templates for the contact route.
 *
 * Two templates:
 *   1. buildContactNotificatieEmail — internal mail to the Thuismeester inbox
 *      with the message and the sender's details, meant to be replied to
 *      directly (route.ts sets the Reply-To to the sender for that).
 *   2. buildContactBevestigingEmail — confirmation to the person themselves,
 *      including the question they asked.
 *
 * Only composing the email happens here; the actual sending is done in
 * route.ts via sendMail().
 */

import { CONTACT_MAILTO, detailsTable, escapeHtml, paragraph, renderBrandedEmail, textToHtml, type EmailContent } from "@/lib/email-util";

interface ContactEmailData {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

/**
 * buildContactNotificatieEmail — internal notification for Thuismeester itself.
 * Contains the name, email address, subject and the full message, so it can
 * be answered straight from the inbox.
 */
export function buildContactNotificatieEmail(data: ContactEmailData): EmailContent {
    const details = [
        { label: "Naam", value: escapeHtml(data.name) },
        { label: "E-mailadres", value: `<a href="mailto:${escapeHtml(data.email)}" style="color:#3D6B5C;">${escapeHtml(data.email)}</a>` },
        ...(data.subject ? [{ label: "Onderwerp", value: escapeHtml(data.subject) }] : []),
        { label: "Bericht", value: textToHtml(data.message) },
    ];

    const bodyHtml = [
        paragraph(
            `Er is een nieuw bericht binnengekomen via het contactformulier op thuismeester.com, verstuurd door <strong>${escapeHtml(data.name)}</strong>.`
        ),
        detailsTable(details),
        paragraph(
            `Beantwoord deze e-mail om ${escapeHtml(data.name)} direct te antwoorden op ${escapeHtml(data.email)}.`
        ),
    ].join("");

    return {
        subject: data.subject
            ? `Contactformulier: ${data.subject} — ${data.name}`
            : `Contactformulier: nieuw bericht van ${data.name}`,
        html: renderBrandedEmail({
            title: "Nieuw bericht via het contactformulier",
            preheader: `Nieuw bericht van ${data.name} via thuismeester.com.`,
            bodyHtml,
            footnote:
                `Interne notificatie voor ${CONTACT_MAILTO} — automatisch verstuurd door het contactformulier op thuismeester.com.`,
        }),
    };
}

/**
 * buildContactBevestigingEmail — confirmation to the person who got in touch:
 * your question was received, this is what you sent, we'll respond soon.
 */
export function buildContactBevestigingEmail(data: ContactEmailData): EmailContent {
    const details = [
        ...(data.subject ? [{ label: "Onderwerp", value: escapeHtml(data.subject) }] : []),
        { label: "Je bericht", value: textToHtml(data.message) },
    ];

    const bodyHtml = [
        paragraph(`Beste ${escapeHtml(data.name)},`),
        paragraph(
            "Bedankt voor je bericht aan Thuismeester. We hebben je vraag in goede orde ontvangen en reageren doorgaans binnen één werkdag."
        ),
        paragraph("Dit is het bericht dat je hebt verstuurd:"),
        detailsTable(details),
        paragraph(
            `Wil je in de tussentijd nog iets toevoegen of aanvullen? Dat kan door simpelweg te antwoorden op deze e-mail of te mailen naar ${CONTACT_MAILTO}.`
        ),
        paragraph("Met vriendelijke groet,<br />Thuismeester"),
    ].join("");

    return {
        subject: "We hebben je bericht ontvangen — Thuismeester",
        html: renderBrandedEmail({
            title: "Je bericht is ontvangen",
            preheader: "Bedankt voor je bericht — we reageren doorgaans binnen één werkdag.",
            bodyHtml,
            footnote:
                `Je ontvangt deze e-mail omdat dit adres is gebruikt bij het contactformulier op thuismeester.com. Klopt dat niet? Laat het ons weten via ${CONTACT_MAILTO}.`,
        }),
    };
}
