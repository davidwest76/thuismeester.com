import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Over Thuismeester",
  description:
    "Lees wie er achter Thuismeester zit en waarom we dit initiatief zijn gestart voor bewoners in Amersfoort en omstreken.",
};

// -------------------------------------------------------
// Core values — edit text and order as needed
// -------------------------------------------------------
const values = [
  {
    title: "Lokaal",
    body:
      "We beginnen klein en bewust. Thuismeester richt zich in de eerste fase uitsluitend op Amersfoort en omliggende plaatsen, zodat we bewoners echt persoonlijk kunnen helpen.",
  },
  {
    title: "Betrouwbaar",
    body:
      "Een vertrouwensband opbouwen kost tijd. Thuismeester investeert daar actief in — door consistent te zijn, afspraken na te komen en eerlijk te communiceren.",
  },
  {
    title: "Persoonlijk",
    body:
      "Geen callcenter, geen ticketsysteem. Jij hebt één vast aanspreekpunt dat jou en jouw woning echt kent.",
  },
  {
    title: "Praktisch",
    body:
      "Thuismeester richt zich op wat werkt. Geen ingewikkelde processen, maar heldere afspraken en daadkrachtige hulp bij zaken die er toe doen.",
  },
];

export default function OverThuismeesterPage() {
  return (
    <>
      {/* Page header
          Image: /images/over-header.jpg
          Replace with a warm, calm portrait of the founder or
          a team photo — professional but approachable. */}
      <section className="relative overflow-hidden bg-green py-28 text-white">
        <Image
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1800&q=80"
          alt="Over Thuismeester — lokaal, betrouwbaar en persoonlijk"
          fill
          priority
          className="object-cover object-center opacity-20"
          sizes="100vw"
          // TODO: replace src with /images/over-header.jpg
        />
        <div className="section-wrapper relative z-10">
          <SectionLabel>
            <span className="text-white/60">Over ons</span>
          </SectionLabel>
          <h1 className="font-serif text-display-lg font-semibold">
            Over Thuismeester
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
            Lokaal, betrouwbaar en persoonlijk. Dat is de kern van
            Thuismeester.
          </p>
        </div>
      </section>

      {/* Main story section
          Image: /images/about-story.jpg
          Replace with a lifestyle photo — homeowner in a neat, calm
          home environment. Warm natural light. */}
      <section className="bg-beige-light py-section">
        <div className="section-wrapper">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel>Het verhaal</SectionLabel>
              <h2 className="font-serif text-display-md font-semibold text-ink">
                Waarom Thuismeester?
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted">
                <p>
                  Veel huiseigenaren zijn druk. Ze hebben een fijn huis, een
                  volle agenda en weinig tijd voor de praktische zaken die bij
                  een woning komen kijken. Onderhoud, kleine regelzaken, het
                  vinden van de juiste vakman — het kost aandacht die er
                  simpelweg niet altijd is.
                </p>
                <p>
                  Thuismeester is ontstaan vanuit de overtuiging dat bewoners
                  recht hebben op een betrouwbaar aanspreekpunt dichtbij huis.
                  Niet een onpersoonlijk platform, maar een vertrouwde persoon
                  die helpt, meedenkt en coördineert.
                </p>
                <p>
                  We starten bewust klein — in Amersfoort en omstreken — zodat
                  we onze beloftes waar kunnen maken. Persoonlijk, lokaal en
                  met aandacht voor wie jij bent en wat jouw woning nodig heeft.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden shadow-sm">
              {/* TODO: replace src with /images/about-story.jpg */}
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80"
                alt="Thuismeester — rust en overzicht in huis"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-beige py-section">
        <div className="section-wrapper">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Kernwaarden</SectionLabel>
            <h2 className="font-serif text-display-md font-semibold text-ink">
              Waar Thuismeester voor staat
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="border-t-2 border-green pt-6">
                <h3 className="font-serif text-xl font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image gallery / atmosphere section
          Images: /images/about-home-1.jpg, /images/about-home-2.jpg
          Replace with premium lifestyle photography:
            - Left: neat Dutch front door or welcoming entrance
            - Right: calm, tidy living space with natural light */}
      <section className="bg-beige-light py-section">
        <div className="section-wrapper">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="relative aspect-square overflow-hidden">
              {/* TODO: replace src with /images/about-home-1.jpg */}
              <Image
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80"
                alt="Nette voordeur van een gewone Nederlandse woning"
                fill
                className="object-cover object-center"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="relative aspect-square overflow-hidden">
              {/* TODO: replace src with /images/about-home-2.jpg */}
              <Image
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80"
                alt="Rustige, nette woonruimte met warme sfeer"
                fill
                className="object-cover object-center"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Caption */}
          <p className="mt-6 text-center text-xs text-ink-muted">
            Thuismeester — voor bewoners die het beste willen voor hun woning
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-green py-section text-white">
        <div className="section-wrapper">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>
              <span className="text-white/60">Onze aanpak</span>
            </SectionLabel>
            <h2 className="font-serif text-display-md font-semibold text-white">
              Geen goedkope klusdienst, maar een betrouwbaar aanspreekpunt
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/75">
              Thuismeester positioneert zich bewust niet als een generieke
              klus- of onderhoudsdienst. De focus ligt op organisatie, advies
              en vertrouwen — aangeboden aan huiseigenaren die prijs stellen op
              kwaliteit en persoonlijk contact.
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              We werken met vakmensen die we kennen en vertrouwen. We maken
              heldere afspraken. En we leren jou en jouw woning kennen, zodat
              we je op de lange termijn goed kunnen begeleiden.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
          BROCHURE PLACEHOLDER SECTION
          This block is prepared for toekomstige brochure/direct mail
          campagnes. Replace copy and add download link when ready.
          ------------------------------------------------------- */}
      <section className="bg-beige py-section">
        <div className="section-wrapper">
          <div className="mx-auto max-w-2xl border border-dashed border-beige-dark bg-white p-10 text-center">
            <SectionLabel>Binnenkort</SectionLabel>
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Binnenkort beschikbaar: brochure
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              We werken aan een informatieve brochure over Thuismeester — voor
              wie meer wil weten of de informatie wil delen met anderen. Houd
              deze pagina in de gaten of meld je aan voor updates.
            </p>
            {/* TODO: Add PDF download link here once brochure is ready
                Example: <a href="/downloads/thuismeester-brochure.pdf">Download brochure</a> */}
            <div className="mt-6">
              <Button href="/aanmelden" variant="outline">
                Aanmelden voor updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-beige-light py-section-sm">
        <div className="section-wrapper text-center">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            Interesse in Thuismeester?
          </h2>
          <p className="mt-3 text-ink-muted">
            Schrijf je vrijblijvend in voor de start in jouw regio.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/aanmelden" size="lg">Aanmelden</Button>
            <Button href="/contact" variant="outline" size="lg">Contact</Button>
          </div>
        </div>
      </section>
    </>
  );
}
