import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { Resend } from "resend";

// -------------------------------------------------------
// Vereiste variabelen in .env.local:
//   RESEND_API_KEY  — api key van resend.com
//   DIGEST_TO_EMAIL — jouw e-mailadres (ontvangt de melding)
//   DIGEST_FROM     — geverifieerd afzenderadres in Resend
// -------------------------------------------------------

const DATA_DIR  = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "aanmeldingen.json");

interface AanmeldingPayload {
  naam: string;
  email: string;
  telefoon?: string;
  postcode: string;
  woonplaats: string;
  opmerkingen?: string;
}

function validatePayload(body: unknown): { valid: true; data: AanmeldingPayload } | { valid: false; message: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Ongeldig verzoek." };
  }
  const b = body as Record<string, unknown>;

  if (!b.naam || typeof b.naam !== "string" || b.naam.trim().length < 2)
    return { valid: false, message: "Vul een geldige naam in." };
  if (!b.email || typeof b.email !== "string" || !b.email.includes("@"))
    return { valid: false, message: "Vul een geldig e-mailadres in." };
  if (!b.postcode || typeof b.postcode !== "string" || b.postcode.trim().length < 4)
    return { valid: false, message: "Vul een geldige postcode in." };
  if (!b.woonplaats || typeof b.woonplaats !== "string")
    return { valid: false, message: "Selecteer een woonplaats." };

  return {
    valid: true,
    data: {
      naam:        (b.naam as string).trim(),
      email:       (b.email as string).toLowerCase().trim(),
      telefoon:    b.telefoon ? (b.telefoon as string).trim() : undefined,
      postcode:    (b.postcode as string).toUpperCase().replace(/\s/g, " ").trim(),
      woonplaats:  (b.woonplaats as string).trim(),
      opmerkingen: b.opmerkingen ? (b.opmerkingen as string).trim() : undefined,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validatePayload(body);

    if (!result.valid) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    const record = {
      ...result.data,
      timestamp: new Date().toISOString(),
    };

    // Opslaan in bestand
    if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(record) + "\n", { flag: "a", encoding: "utf-8" });

    // E-mail versturen via Resend
    const apiKey  = process.env.RESEND_API_KEY;
    const toEmail = process.env.DIGEST_TO_EMAIL;
    const from    = process.env.DIGEST_FROM ?? "Thuismeester <noreply@thuismeester.nl>";

    if (apiKey && toEmail) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to: toEmail,
        subject: `Nieuwe aanmelding — ${record.naam} (${record.woonplaats})`,
        html: `
          <p style="font-family:sans-serif;font-size:15px;">Nieuwe aanmelding via thuismeester.nl:</p>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:4px 16px 4px 0;color:#6b7266;">Naam</td><td><strong>${record.naam}</strong></td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#6b7266;">E-mail</td><td>${record.email}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#6b7266;">Telefoon</td><td>${record.telefoon ?? "—"}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#6b7266;">Postcode</td><td>${record.postcode}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#6b7266;">Woonplaats</td><td>${record.woonplaats}</td></tr>
            ${record.opmerkingen ? `<tr><td style="padding:4px 16px 4px 0;color:#6b7266;">Opmerkingen</td><td>${record.opmerkingen}</td></tr>` : ""}
          </table>
        `,
      });
    } else {
      console.warn("[Thuismeester] RESEND_API_KEY of DIGEST_TO_EMAIL niet ingesteld — e-mail overgeslagen.");
    }

    console.log("[Thuismeester] Aanmelding:", record.naam, record.woonplaats);
    return NextResponse.json({ message: "Aanmelding ontvangen." }, { status: 200 });
  } catch (err) {
    console.error("[Thuismeester] Fout:", err);
    return NextResponse.json({ message: "Er is een fout opgetreden. Probeer het later opnieuw." }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "Methode niet toegestaan." }, { status: 405 });
}
