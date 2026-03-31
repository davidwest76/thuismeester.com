import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Thuismeester — Rust in huis voor Amersfoort en omstreken",
};

// -------------------------------------------------------
// Regio's — edit this list to add/remove locations
// -------------------------------------------------------
const regio = ["Amersfoort", "Leusden", "Hoevelaken", "Nijkerk", "Soest"];

// -------------------------------------------------------
// Services listed on homepage — keep broad and professional
// -------------------------------------------------------
const diensten = [
  {
    icon: "💬",
    title: "Vast aanspreekpunt",
    body:
      "Één vertrouwde persoon die meedenkt bij praktische vragen rondom je woning.",
  },
  {
    icon: "🔧",
    title: "Onderhoud & organisatie",
    body:
      "Hulp bij onderhoud, kleine organisatievragen en zaken die aandacht vragen.",
  },
  {
    icon: "🤝",
    title: "Betrouwbare vakmensen",
    body:
      "Doorverwijzing naar goed gescreende vakmensen en begeleiding bij het traject.",
  },
  {
    icon: "📋",
    title: "Coördinatie",
    body:
      "Coordinatie bij terugkerende of losse woningzaken, zodat jij er niet aan hoeft te denken.",
  },
];

// -------------------------------------------------------
// How-it-works steps
// -------------------------------------------------------
const steps = [
  {
    number: "01",
    title: "Schrijf je in",
    body:
      "Meld je vrijblijvend aan via het aanmeldformulier. Geen verplichtingen, geen kosten.",
  },
  {
    number: "02",
    title: "We starten bij voldoende aanmeldingen",
    body:
      "Zodra er genoeg bewoners in de regio geregistreerd zijn, gaan we officieel van start in januari 2027.",
  },
  {
    number: "03",
    title: "Jouw Thuismeester helpt je verder",
    body:
      "Je wordt gekoppeld aan een vast aanspreekpunt dat jou en jouw woning echt leert kennen.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* =====================================================
          HERO SECTION
          Image: /images/hero-home.jpg
          Replace placeholder URL with a premium photo of a
          beautiful, well-kept Dutch home exterior or calm
          interior — horizontal format, high resolution.
          ===================================================== */}
      <section className="relative flex min-h-[90vh] items-end bg-green">
        {/* Background photo */}
    <Image
  src="/images/jaren-30-woning.jpg"
  alt="Een nette Nederlandse gezinswoning in Amersfoort en omstreken"
  fill
  priority
  className="object-cover object-[center_30%]"
  sizes="100vw"
/>    
 

          // TODO: replace src with /images/hero-home.jpg (final photography)
        
        {/* Gradient overlay — darkens bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-green/90 via-green/40 to-transparent" />

        {/* Hero content */}
        <div className="section-wrapper relative z-10 pb-20 pt-32">
          <div className="max-w-2xl">
            <span className="badge mb-6 border border-white/30 bg-white/10 text-white">
              Amersfoort en omstreken · Start januari 2027
            </span>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Rust in huis.<br />
              <span className="italic">Regel het met jouw Thuismeester.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Voor bewoners in Amersfoort en omstreken. Voor €10 per maand heb
              je een vast aanspreekpunt voor praktische hulp en organisatie
              rondom je woning.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/aanmelden" size="lg">
                Schrijf je in
              </Button>
              <Button href="/hoe-werkt-het" variant="outline" size="lg"
                className="border-white/60 text-white hover:bg-white hover:text-green">
                Hoe werkt het?
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LOCAL REGION SECTION
          ===================================================== */}
      <section className="bg-beige py-section">
        <div className="section-wrapper">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Lokaal</SectionLabel>
            <h2 className="font-serif text-display-lg font-semibold text-ink">
              Voor Amersfoort en omstreken
            </h2>
            <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-ink-muted">
              Thuismeester richt zich in de eerste fase op Amersfoort en
              omliggende plaatsen. We bouwen eerst lokaal op, zodat we bewoners
              persoonlijk en betrouwbaar kunnen helpen.
            </p>

            {/* Region pills */}
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {regio.map((plaats) => (
                <li key={plaats}>
                  <span className="inline-block rounded-full border border-green/30 bg-beige-light
                                   px-5 py-2 font-serif text-sm font-medium text-ink">
                    {plaats}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROBLEM SECTION
          Image: /images/homeowner-busy.jpg
          Replace placeholder with image of a homeowner
          looking at a to-do list, phone, or household task.
          ===================================================== */}
      <section className="bg-beige-light py-section">
        <div className="section-wrapper">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div>
              <SectionLabel>De uitdaging</SectionLabel>
              <h2 className="font-serif text-display-md font-semibold text-ink">
                Alles rondom huis kost tijd en aandacht
              </h2>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted">
                Van onderhoud en kleine regelzaken tot het vinden van de juiste
                vakmensen: veel huiseigenaren missen tijd, overzicht of een
                betrouwbaar aanspreekpunt. De kleinste zaken blijven liggen,
                terwijl grotere vraagstukken meer aandacht verdienen.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Drukke agenda — weinig tijd voor woningzaken",
                  "Geen betrouwbaar netwerk van vakmensen",
                  "Verlies van overzicht bij meerdere klussen",
                  "Onduidelijkheid over wat nodig is en wanneer",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-beige-dark
                                     flex items-center justify-center text-green text-xs">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image block */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-sm lg:aspect-square">
              {/* TODO: replace src with /images/homeowner-busy.jpg */}
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
                alt="Drukke huiseigenaar met weinig tijd voor woningbeheer"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOLUTION SECTION
          Image: /images/service-homeowner.jpg
          Replace with a warm photo of a Thuismeester in
          conversation with a homeowner, or someone helping
          with a household task — professional and personal.
          ===================================================== */}
      <section className="bg-green py-section text-white">
        <div className="section-wrapper">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Image block — left on desktop */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-lg order-last lg:order-first">
              {/* TODO: replace src with /images/service-homeowner.jpg */}
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80"
                alt="Thuismeester in gesprek met een bewoner — betrouwbaar en persoonlijk"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            {/* Text */}
            <div>
              <SectionLabel>
                <span className="text-white/60">De oplossing</span>
              </SectionLabel>
              <h2 className="font-serif text-display-md font-semibold text-white">
                De Thuismeester helpt
              </h2>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-white/75">
                Met Thuismeester krijg je toegang tot een vast aanspreekpunt
                dat met je meedenkt en helpt bij praktische zaken in en rondom
                je huis. Niet als onderhoudsdienst, maar als een betrouwbare
                organisator die jou en jouw woning echt kent.
              </p>
              <div className="mt-8">
                <Button href="/diensten" variant="outline"
                  className="border-white/60 text-white hover:bg-white hover:text-green">
                  Bekijk de diensten
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS SECTION
          ===================================================== */}
      <section className="bg-beige py-section" id="hoe-werkt-het">
        <div className="section-wrapper">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Werkwijze</SectionLabel>
            <h2 className="font-serif text-display-lg font-semibold text-ink">
              Hoe werkt het?
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative pl-0 text-left">
                <p className="font-serif text-5xl font-semibold text-green/20 leading-none">
                  {step.number}
                </p>
                <h3 className="mt-4 font-serif text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/hoe-werkt-het" variant="outline">
              Meer over de werkwijze
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES GRID
          ===================================================== */}
      <section className="bg-beige-light py-section">
        <div className="section-wrapper">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Diensten</SectionLabel>
            <h2 className="font-serif text-display-lg font-semibold text-ink">
              Wat doet de Thuismeester?
            </h2>
            <p className="mx-auto mt-4 max-w-prose text-base text-ink-muted">
              Thuismeester neemt praktische zaken rondom je woning uit handen —
              zodat jij je op de dingen kunt richten die er echt toe doen.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {diensten.map((d) => (
              <div
                key={d.title}
                className="flex flex-col gap-4 border border-beige-dark bg-white p-8
                           transition-shadow hover:shadow-sm"
              >
                <span className="text-2xl" aria-hidden="true">{d.icon}</span>
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">{d.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/diensten" variant="outline">
              Alle diensten bekijken
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING SECTION
          ===================================================== */}
      <section className="bg-beige py-section">
        <div className="section-wrapper">
          <div className="mx-auto max-w-4xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionLabel>Tarief</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                  Heldere basis
                </h2>
                <p className="mt-6 text-base leading-relaxed text-ink-muted">
                  Voor €10 per maand krijg je toegang tot Thuismeester. Extra
                  hulp en werkzaamheden worden uitgevoerd tegen uurtarief of op
                  offertebasis, afhankelijk van de vraag.
                </p>
                <p className="mt-4 text-sm text-ink-muted">
                  Geen verborgen kosten. Geen lange contracten. Transparant en
                  eerlijk.
                </p>
              </div>

              {/* Pricing card */}
              <div className="border border-beige-dark bg-white p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                  Maandelijks abonnement
                </p>
                <p className="mt-4 font-serif text-5xl font-semibold text-green">
                  €10
                  <span className="ml-2 text-lg font-normal text-ink-muted">/ maand</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Vast aanspreekpunt",
                    "Persoonlijk meedenken",
                    "Toegang tot netwerk van vakmensen",
                    "Extra hulp op uurtarief of offertebasis",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink-soft">
                      <span className="text-green">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/aanmelden" className="w-full justify-center">
                    Schrijf je in
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRE-LAUNCH SECTION
          Image: /images/launch-amersfoort.jpg
          Replace with a subtle regional image — cityscape of
          Amersfoort, a recognisable street, or a calm
          neighbourhood scene.
          ===================================================== */}
      <section className="relative py-section">
        <Image
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1800&q=80"
          alt="Rustige woonstraat in Amersfoort en omstreken"
          fill
          className="object-cover object-center"
          sizes="100vw"
          // TODO: replace src with /images/launch-amersfoort.jpg
        />
        <div className="absolute inset-0 bg-green/85" />

        <div className="section-wrapper relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <SectionLabel>
              <span className="text-white/60">Pre-launch</span>
            </SectionLabel>
            <h2 className="font-serif text-display-lg font-semibold">
              We starten in januari 2027
            </h2>
            <p className="mx-auto mt-6 max-w-prose text-base leading-relaxed text-white/75">
              De dienstverlening gaat van start zodra er voldoende aanmeldingen
              zijn in Amersfoort en omstreken. Met je inschrijving laat je
              weten dat er in jouw regio behoefte is aan Thuismeester.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA SECTION
          ===================================================== */}
      <section className="bg-beige-light py-section">
        <div className="section-wrapper">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-display-lg font-semibold text-ink">
              Interesse?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              Schrijf je vrijblijvend in en blijf op de hoogte van de start in
              jouw regio. Geen verplichtingen, geen kosten bij aanmelding.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/aanmelden" size="lg">
                Aanmelden
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Stel een vraag
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
