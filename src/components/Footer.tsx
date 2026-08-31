import { REGION_NOTE } from "@/lib/site";
import Link from "next/link";

const footerLinks = [
    { label: "Hoe werkt het", href: "/hoe-werkt-het" },
    { label: "Diensten", href: "/diensten" },
    { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
    { label: "Over Thuismeester", href: "/over-thuismeester" },
    { label: "Aanmelden", href: "/aanmelden" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-green text-white">
            <div className="section-wrapper py-16">
                <div className="grid gap-12 md:grid-cols-3">
                    <div>
                        <p className="font-serif text-xl font-semibold tracking-tight">
                            Thuismeester
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-white/85">
                            Jouw onafhankelijke thuisadviseur — voor onderhoud,
                            reparaties en betrouwbare vakmensen.
                        </p>
                        <p className="mt-4 text-xs uppercase tracking-widest text-white/70">
                            {REGION_NOTE}
                        </p>
                    </div>

                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                            Navigatie
                        </p>
                        <ul className="space-y-2.5">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/90 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                            Contact
                        </p>
                        <div className="rounded-sm border border-white/20 p-4">
                            <p className="text-sm leading-relaxed text-white/85">
                                Thuismeester start in januari 2027 bij voldoende aanmeldingen
                                in {REGION_NOTE}.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/15 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-white/70">
                        © {year} Thuismeester. Alle rechten voorbehouden.
                        {" · "}
                        <Link
                            href="/privacybeleid"
                            className="underline transition-colors hover:text-white"
                        >
                            Privacybeleid
                        </Link>
                    </p>
                    <p className="text-sm text-white/70">
                        {REGION_NOTE}
                    </p>
                </div>
            </div>
        </footer>
    );
}
