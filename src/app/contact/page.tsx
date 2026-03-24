import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Thuismeester. Actief in voorbereiding voor Amersfoort en omstreken.",
};

// -------------------------------------------------------
// Contact details — edit before launch
// -------------------------------------------------------
const CONTACT_EMAIL = "info@thuismeester.nl"; // TODO: replace with real address
const CONTACT_PHONE = "+31 6 00 00 00 00";    // TODO: replace with real number

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-green py-20 text-white">
        <div className="section-wrapper">
          <SectionLabel>
            <span className="text-white/60">Bereikbaarheid</span>
          </SectionLabel>
          <h1 className="font-serif text-display-lg font-semibold">
            Contact
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
            Heb je een vraag over Thuismeester, de aanmelding of de dienst?
            Neem gerust contact op.
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="bg-beige-light py-section">
        <div className="section-wrapper">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_340px]">
            {/* Form */}
            <div className="bg-white p-8 shadow-sm sm:p-12">
              <h2 className="font-serif text-2xl font-semibold text-ink">
                Stuur een bericht
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                We reageren zo snel mogelijk, doorgaans binnen één werkdag.
              </p>
              <div className="mt-8">
                {/* ContactForm is a client component */}
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Image
                  Image: /images/contact-trust.jpg
                  Replace with a warm, professional image — welcoming
                  front door, tidy hallway or calm living space. */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* TODO: replace src with /images/contact-trust.jpg */}
                <Image
                  src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=700&q=80"
                  alt="Thuismeester — betrouwbaar aanspreekpunt in Amersfoort"
                  fill
                  className="object-cover object-center"
                  sizes="340px"
                />
              </div>

              {/* Contact details */}
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                    E-mail
                  </p>
                  {/* TODO: update with real email address */}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 block text-sm text-green transition-colors hover:text-green-light"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                    Telefoon
                  </p>
                  {/* TODO: update with real phone number */}
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="mt-1 block text-sm text-green transition-colors hover:text-green-light"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                    Regio
                  </p>
                  {/* -------------------------------------------------------
                      Region note — this is intentionally prominent on contact
                      page to confirm the local nature of the service
                      ------------------------------------------------------- */}
                  <p className="mt-1 text-sm text-ink-soft">
                    Actief in voorbereiding voor{" "}
                    <strong>Amersfoort en omstreken</strong>
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    Amersfoort · Leusden · Hoevelaken · Nijkerk · Soest
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
                    Start
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Januari 2027, bij voldoende aanmeldingen
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
