import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

interface AanmeldingPayload {
  naam: string;
  email: string;
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

  if (!b.email || typeof b.email !== "string") {
    return { valid: false, message: "Vul een geldig e-mailadres in." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(b.email)) {
    return { valid: false, message: "Vul een geldig e-mailadres in." };
  }

  if (!b.postcode || typeof b.postcode !== "string" || b.postcode.trim().length < 4)
    return { valid: false, message: "Vul een geldige postcode in." };

  if (!b.woonplaats || typeof b.woonplaats !== "string" || b.woonplaats.trim().length < 1)
    return { valid: false, message: "Selecteer een woonplaats." };

  return {
    valid: true,
    data: {
      naam:        (b.naam as string).trim(),
      email:       (b.email as string).toLowerCase().trim(),
      postcode:    (b.postcode as string).toUpperCase().replace(/\s/g, " ").trim(),
      woonplaats:  (b.woonplaats as string).trim(),
      opmerkingen: b.opmerkingen ? (b.opmerkingen as string).trim() : undefined,
    },
  };
}

function getVoornaam(naam: string): string {
  return naam.split(" ")[0];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: als het verborgen veld ingevuld is, is het spam
    if (body._hp && (body._hp as string).length > 0) {
      return NextResponse.json({ message: "Aanmelding ontvangen." }, { status: 200 });
    }

    const result = validatePayload(body);
    if (!result.valid) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    const { data } = result;

    // Opslaan in Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    const { error: dbError } = await supabase
      .from("aanmeldingen")
      .insert([data]);

    if (dbError) {
      console.error("[Thuismeester] Supabase fout:", dbError.message);
      return NextResponse.json(
        { message: "Er is een fout opgetreden. Probeer het later opnieuw." },
        { status: 500 }
      );
    }

    // E-mails versturen via Resend
    const apiKey     = process.env.RESEND_API_KEY;
    const notifyTo   = process.env.NOTIFY_EMAIL;
    const from       = process.env.MAIL_FROM ?? "Thuismeester <noreply@thuismeester.nl>";
    const voornaam   = getVoornaam(data.naam);

    if (apiKey) {
      const resend = new Resend(apiKey);

      // 1. Bevestigingsmail naar aanmelder
      await resend.emails.send({
        from,
        to: data.email,
        subject: "Welkom bij Thuismeester – aanmelding ontvangen",
        html: `
          <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
            <div style="background:#2d4a3e;padding:32px 40px;">
              <p style="color:#fff;font-size:20px;font-weight:600;margin:0;">Thuismeester</p>
            </div>
            <div style="padding:40px;background:#fff;">
              <p style="font-size:16px;margin-top:0;">Beste ${voornaam},</p>
              <p style="font-size:15px;line-height:1.7;color:#444;">
                Bedankt voor je aanmelding bij Thuismeester.
              </p>
              <p style="font-size:15px;line-height:1.7;color:#444;">
                Leuk dat je interesse hebt. We hebben je aanmelding goed ontvangen en nemen binnenkort contact met je op om de volgende stap met je door te nemen.
              </p>
              <div style="background:#f5f2ed;padding:24px;margin:24px 0;">
                <p style="font-size:14px;font-weight:600;margin:0 0 12px;">Wat je van ons kunt verwachten:</p>
                <ul style="font-size:14px;line-height:1.8;color:#555;margin:0;padding-left:20px;">
                  <li>we bekijken je aanmelding</li>
                  <li>we nemen contact met je op zodra we starten in jouw buurt of met een passende vervolgstap</li>
                  <li>je zit nergens direct aan vast</li>
                </ul>
              </div>
              <p style="font-size:14px;line-height:1.7;color:#444;">
                Heb je in de tussentijd een vraag? Reageer dan gerust op deze e-mail.
              </p>
              <p style="font-size:14px;color:#444;margin-top:32px;">
                Met vriendelijke groet,<br/><br/>
                <strong>David</strong><br/>
                Thuismeester<br/>
                <a href="https://www.thuismeester.com" style="color:#2d4a3e;">www.thuismeester.com</a>
              </p>
            </div>
            <div style="padding:20px 40px;background:#f5f2ed;text-align:center;">
              <p style="font-size:12px;color:#888;margin:0;">© ${new Date().getFullYear()} Thuismeester · Amersfoort en omstreken</p>
            </div>
          </div>
        `,
      });

      // 2. Interne notificatie
      if (notifyTo) {
        await resend.emails.send({
          from,
          to: notifyTo,
          subject: `Nieuwe aanmelding — ${data.naam} (${data.woonplaats})`,
          html: `
            <div style="font-family:sans-serif;max-width:480px;color:#1a1a1a;">
              <p style="font-size:16px;font-weight:600;">Nieuwe aanmelding via thuismeester.com</p>
              <table style="font-size:14px;border-collapse:collapse;width:100%;">
                <tr><td style="padding:6px 16px 6px 0;color:#666;width:120px;">Naam</td><td><strong>${data.naam}</strong></td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666;">E-mail</td><td>${data.email}</td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666;">Postcode</td><td>${data.postcode}</td></tr>
                <tr><td style="padding:6px 16px 6px 0;color:#666;">Woonplaats</td><td>${data.woonplaats}</td></tr>
                ${data.opmerkingen ? `<tr><td style="padding:6px 16px 6px 0;color:#666;">Opmerkingen</td><td>${data.opmerkingen}</td></tr>` : ""}
              </table>
            </div>
          `,
        });
      }
    } else {
      console.warn("[Thuismeester] RESEND_API_KEY niet ingesteld — e-mails overgeslagen.");
    }

    console.log("[Thuismeester] Aanmelding:", data.naam, data.woonplaats);
    return NextResponse.json({ message: "Aanmelding ontvangen." }, { status: 200 });
  } catch (err) {
    console.error("[Thuismeester] Fout:", err);
    return NextResponse.json(
      { message: "Er is een fout opgetreden. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ message: "Methode niet toegestaan." }, { status: 405 });
}
