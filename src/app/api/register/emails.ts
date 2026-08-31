/**
 * emails.ts (aanmelden) — email templates for the signup route.
 *
 * Only composing the email happens here; the actual sending is done in
 * route.ts via sendMail().
 */

import { CONTACT_MAILTO, detailsTable, escapeHtml, paragraph, renderBrandedEmail, textToHtml, type EmailContent } from "@/lib/email-util";
import { REGION_NOTE } from "@/lib/site";

interface AanmeldingEmailData {
    name: string;
    email: string;
    postcode: string;
    area: string;
    remark?: string;
}

/**
 * buildAanmeldBevestigingEmail — confirmation email to the person who signed
 * up: thank you, these are your details, and this is what happens next.
 */
export function buildAanmeldBevestigingEmail(data: AanmeldingEmailData): EmailContent {
    const details = [
        { label: "Naam", value: escapeHtml(data.name) },
        { label: "E-mailadres", value: escapeHtml(data.email) },
        { label: "Postcode", value: escapeHtml(data.postcode) },
        { label: "Woonplaats", value: escapeHtml(data.area) },
        ...(data.remark ? [{ label: "Opmerking", value: textToHtml(data.remark) }] : []),
    ];

    const bodyHtml = [
        paragraph(`Beste ${escapeHtml(data.name)},`),
        paragraph(
            "Bedankt voor je aanmelding bij Thuismeester. Je inschrijving is goed ontvangen en geregistreerd voor de start in jouw regio."
        ),
        paragraph("Dit zijn de gegevens die je hebt ingevuld:"),
        detailsTable(details),
        paragraph(
            `<strong>Hoe nu verder?</strong> Thuismeester gaat van start in januari 2027, zodra er voldoende aanmeldingen zijn in ${REGION_NOTE}. Je hoeft verder niets te doen: zodra we de startdatum bevestigen, ontvang je bericht op dit e-mailadres.`
        ),
        paragraph(
            "Je aanmelding is volledig vrijblijvend en kosteloos. Je zit nergens aan vast en kunt je op elk moment weer afmelden."
        ),
        paragraph("Met vriendelijke groet,<br />Thuismeester"),
    ].join("");

    return {
        subject: "Bevestiging van je aanmelding bij Thuismeester",
        html: renderBrandedEmail({
            title: "Bedankt voor je aanmelding",
            preheader: "Je aanmelding bij Thuismeester is goed ontvangen.",
            bodyHtml,
            footnote:
                `Je ontvangt deze e-mail omdat dit adres is gebruikt bij een aanmelding op thuismeester.com. Klopt dat niet? Laat het ons weten via ${CONTACT_MAILTO}.`,
        }),
    };
}

/**
 * buildDubbeleAanmeldingEmail — sent to an address that was *already*
 * registered when someone submits the signup form with it again. The site
 * itself deliberately responds with the normal success message in that case
 * (a "this address is already registered" error would let anyone probe which
 * addresses are subscribed); this email tells the real owner what happened
 * and that no action is needed.
 *
 * Deliberately takes no data and uses no greeting: the stored registration
 * isn't fetched, and the resubmitted fields may not even come from the real
 * owner — so nothing from the new attempt is played back.
 */
export function buildDubbeleAanmeldingEmail(): EmailContent {
    const bodyHtml = [
        paragraph(
            "Zojuist is via thuismeester.com geprobeerd een aanmelding te doen met dit e-mailadres, maar je stond al bij ons ingeschreven. Er is niets veranderd: je bestaande aanmelding blijft gewoon staan."
        ),
        paragraph(
            "<strong>Je hoeft niets te doen.</strong> Zodra we de startdatum in jouw regio bevestigen, ontvang je bericht op dit e-mailadres."
        ),
        paragraph(
            "Was jij dit niet? Dan kun je deze e-mail veilig negeren. Vragen? Mail ons via contact@thuismeester.com."
        ),
        paragraph("Met vriendelijke groet,<br />Thuismeester"),
    ].join("");

    return {
        subject: "Je was al aangemeld bij Thuismeester",
        html: renderBrandedEmail({
            title: "Je was al aangemeld",
            preheader: "Er is opnieuw een aanmelding gedaan met dit e-mailadres — je hoeft niets te doen.",
            bodyHtml,
            footnote:
                "Je ontvangt deze e-mail omdat dit adres is gebruikt bij een aanmelding op thuismeester.com. Klopt dat niet? Laat het ons weten via contact@thuismeester.com.",
        }),
    };
}
