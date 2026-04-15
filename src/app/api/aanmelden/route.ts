import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

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

    const { error } = await supabase
      .from("aanmeldingen")
      .insert([result.data]);

    if (error) {
      console.error("[Thuismeester] Supabase fout:", error.message);
      return NextResponse.json(
        { message: "Er is een fout opgetreden. Probeer het later opnieuw." },
        { status: 500 }
      );
    }

    console.log("[Thuismeester] Aanmelding opgeslagen:", result.data.naam, result.data.woonplaats);
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
