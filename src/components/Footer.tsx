import Link from "next/link";

const REGION_NOTE = "Amersfoort en omstreken";

const footerLinks = [
  { label: "Hoe werkt het",     href: "/hoe-werkt-het" },
  { label: "Diensten",          href: "/diensten" },
  { label: "Over Thuismeester", href: "/over-thuismeester" },
  { label: "Aanmelden",         href: "/aanmelden" },
  { label: "Contact",           href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green text-white">
      <div className="section-wrapper py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <p className="font-serif text-xl font-semibold tracking-tight">
              Thuismeester
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Jouw vaste aanspreekpunt voor praktische hulp en organisatie
              rondom je woning.
            </p>
            {/* -------------------------------------------------------
                Region label — edit REGION_NOTE at top of this file
                ------------------------------------------------------- */}
            <p className="mt-4 text-xs uppercase tracking-widest text-white/50">
              {REGION_NOTE}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Navigatie
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              Contact
            </p>
            {/* Pre-launch note */}
            <div className="rounded-sm border border-white/20 p-4">
              <p className="text-xs leading-relaxed text-white/60">
                Thuismeester start in januari 2027 bij voldoende aanmeldingen
                in {REGION_NOTE}.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/15 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {year} Thuismeester. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-white/40">
            {REGION_NOTE}
          </p>
        </div>
      </div>
    </footer>
  );
}
