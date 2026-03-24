import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import AanmeldenForm from "@/components/AanmeldenForm";

export const metadata: Metadata = {
  title: "Aanmelden",
  description:
    "Schrijf je vrijblijvend in voor Thuismeester in Amersfoort en omstreken. Start in januari 2027 bij voldoende aanmeldingen.",
};

const regions = ["Amersfoort", "Leusden", "Hoevelaken", "Nijkerk", "Soest"];

export default function AanmeldenPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-green py-20 text-white">
        <div className="section-wrapper">
          <SectionLabel>
            <span className="text-white/60">Inschrijven</span>
          </SectionLabel>
          <h1 className="font-serif text-display-lg font-semibold">
            Aanmelden
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
            Schrijf je vrijblijvend in en laat weten dat er in jouw regio
            behoefte is aan Thuismeester. Geen verplichtingen, geen kosten bij
            aanmelding.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-beige-light py-section">
        <div className="section-wrapper">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <div className="bg-white p-8 shadow-sm sm:p-12">
              <h2 className="font-serif text-2xl font-semibold text-ink">
                Inschrijfformulier
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Vul je gegevens in. We nemen contact op zodra Thuismeester
                start in jouw regio.
              </p>

              <div className="mt-8">
                {/* AanmeldenForm is a client component to handle state & submission */}
                <AanmeldenForm />
              </div>

              <p className="mt-6 text-xs leading-relaxed text-ink-muted">
                Wij starten zodra er voldoende aanmeldingen zijn in Amersfoort
                en omstreken. Je gegevens worden vertrouwelijk behandeld en
                alleen gebruikt voor communicatie over de start van
                Thuismeester.
              </p>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Trust block
                  Image: /images/contact-trust.jpg
                  Replace with a calm, trustworthy image — front door,
                  welcoming entrance, or professional conversation. */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* TODO: replace src with /images/contact-trust.jpg */}
                <Image
                  src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=700&q=80"
                  alt="Gewone gezinswoning in Amersfoort en omstreken"
                  fill
                  className="object-cover object-center"
                  sizes="380px"
                />
              </div>

              {/* Region list */}
              <div className="border border-beige-dark bg-beige p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4">
                  Beschikbaar in
                </p>
                <ul className="space-y-2">
                  {regions.map((r) => (
                    <li
                      key={r}
                      className="flex items-center gap-2 text-sm text-ink-soft"
                    >
                      <span className="text-green text-xs">✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-ink-muted">
                  Woon je ergens anders? Meld je toch aan — we kijken mee
                  naar uitbreiding.
                </p>
              </div>

              {/* Pre-launch note */}
              <div className="border-l-4 border-green pl-5">
                <p className="font-serif text-base font-semibold text-ink">
                  Start: januari 2027
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  De dienstverlening gaat van start zodra er voldoende
                  aanmeldingen zijn in de regio.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
