import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// -------------------------------------------------------
// Contact form API endpoint
//
// Current implementation:
//   Saves messages to /data/contactberichten.json on the
//   local filesystem.
//
// TODO for production:
//   Replace with email notification (Resend, Nodemailer)
//   or a helpdesk integration (Freshdesk, Intercom, etc.)
// -------------------------------------------------------

const DATA_DIR  = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "contactberichten.json");

interface ContactPayload {
  naam: string;
  email: string;
  onderwerp?: string;
  bericht: string;
}

function validatePayload(body: unknown): { valid: true; data: ContactPayload } | { valid: false; message: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Ongeldig verzoek." };
  }
  const b = body as Record<string, unknown>;

  if (!b.naam || typeof b.naam !== "string" || b.naam.trim().length < 2) {
    return { valid: false, message: "Vul een geldige naam in." };
  }
  if (!b.email || typeof b.email !== "string" || !b.email.includes("@")) {
    return { valid: false, message: "Vul een geldig e-mailadres in." };
  }
  if (!b.bericht || typeof b.bericht !== "string" || b.bericht.trim().length < 10) {
    return { valid: false, message: "Schrijf een bericht van minimaal 10 tekens." };
  }

  return {
    valid: true,
    data: {
      naam:      (b.naam as string).trim(),
      email:     (b.email as string).toLowerCase().trim(),
      onderwerp: b.onderwerp ? (b.onderwerp as string).trim() : undefined,
      bericht:   (b.bericht as string).trim(),
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

    const { data } = result;

    const record = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true });
    }

    const line = JSON.stringify(record) + "\n";
    await writeFile(DATA_FILE, line, { flag: "a", encoding: "utf-8" });

    console.log("[Thuismeester] Nieuw contactbericht:", record.naam, record.email);

    return NextResponse.json({ message: "Bericht ontvangen." }, { status: 200 });
  } catch (err) {
    console.error("[Thuismeester] Fout bij contact:", err);
    return NextResponse.json(
      { message: "Er is een fout opgetreden. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ message: "Methode niet toegestaan." }, { status: 405 });
}
