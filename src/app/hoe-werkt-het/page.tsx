import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Hoe werkt het",
  description:
    "Ontdek hoe Thuismeester werkt: van inschrijving tot jouw vaste aanspreekpunt in Amersfoort en omstreken.",
};

const steps = [
  {
    number: "01",
    title: "Schrijf je in",
    body: "Meld je vrijblijvend aan via het aanmeldformulier. Je vult je naam, e-mail, telefoonnummer en postcode in. Er zijn geen kosten verbonden aan de aanmelding.",
    // Image: /images/step-aanmelden.jpg
    // Replace with a clean photo of someone filling in a form on a tablet or laptop
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80",
    imageAlt: "Aanmelden bij Thuismeester via het formulier",
  },
  {
    number: "02",
    title: "We starten bij voldoende aanmeldingen",
    body: "Thuismeester start in januari 2027 als er genoeg bewoners in Amersfoort en omstreken geregistreerd zijn. Jouw aanmelding helpt ons bepalen of er voldoende vraag is in jouw regio. Je ontvangt een bericht zodra we de startdatum bevestigen.",
    // Image: /images/step-regio.jpg
    // Replace with a calm regional street or neighbourhood photo (Amersfoort / omstreken)
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900&q=80",
    imageAlt: "Rustige woonstraat in Amersfoort en omstreken",
  },
  {
    number: "03",
    title: "Jouw Thuismeester helpt je verder",
    body: "Na de start word je gekoppeld aan een vast aanspreekpunt — jouw Thuismeester. Die leert jou en jouw woning kennen en helpt bij praktische zaken op een betrouwbare, persoonlijke manier.",
    // Image: /images/step-thuismeester.jpg
    // Replace with a warm photo of a Thuismeester in conversation with a homeowner
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
    imageAlt: "Jouw Thuismeester helpt bij praktische woningzaken",
  },
];

const faqs = [
  {
    q: "Wanneer gaat Thuismeester van start?",
    a: "De dienstverlening start in januari 2027, zodra er voldoende aanmeldingen zijn in Amersfoort en omstreken.",
  },
  {
    q: "Wat kost Thuismeester?",
    a: "Het vaste abonnement kost €10 per maand. Extra hulp en werkzaamheden worden uitgevoerd tegen uurtarief of op offertebasis.",
  },
  {
    q: "In welke gebieden is Thuismeester actief?",
    a: "In de eerste fase richt Thuismeester zich op Amersfoort, Leusden, Hoevelaken, Nijkerk en Soest.",
  },
  {
    q: "Zit ik vast aan een contract bij aanmelding?",
    a: "Nee. De aanmelding is volledig vrijblijvend en gratis. Je geeft alleen aan dat je geïnteresseerd bent.",
  },
  {
    q: "Wat voor soort hulp kan ik verwachten?",
    a: "Thuismeester helpt bij praktische zaken rondom je woning: van organisatievragen en onderhoud tot het vinden van betrouwbare vakmensen en coördinatie van klussen.",
  },
];

export default function HoeWerktHetPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-green py-20 text-white">
        <div className="section-wrapper">
          <SectionLabel>
            <span className="text-white/60">Werkwijze</span>
          </SectionLabel>
          <h1 className="font-serif text-display-lg font-semibold text-white">
            Hoe werkt het?
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
            Van aanmelding tot jouw vaste aanspreekpunt — in drie heldere
            stappen.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-beige-light py-section">
        <div className="section-wrapper">
          <div className="space-y-28">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`grid items-center gap-16 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
                }`}
              >
                {/* Text */}
                <div>
                  <p className="font-serif text-6xl font-semibold leading-none text-green/15">
                    {step.number}
                  </p>
                  <h2 className="mt-4 font-serif text-display-md font-semibold text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden shadow-sm">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-beige py-section">
        <div className="section-wrapper">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>Veelgestelde vragen</SectionLabel>
            <h2 className="font-serif text-display-md font-semibold text-ink">
              Veel gestelde vragen
            </h2>

            <div className="mt-12 divide-y divide-beige-dark">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between
                                      gap-4 font-serif text-base font-semibold text-ink">
                    {q}
                    <span className="shrink-0 text-green transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green py-section-sm text-white">
        <div className="section-wrapper text-center">
          <h2 className="font-serif text-2xl font-semibold">
            Klaar om je in te schrijven?
          </h2>
          <p className="mt-3 text-white/70">Vrijblijvend en gratis.</p>
          <div className="mt-6">
            <Button href="/aanmelden" size="lg"
              className="bg-white text-green hover:bg-beige">
              Aanmelden
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
