"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "Hoe werkt het", href: "/hoe-werkt-het" },
    { label: "Diensten", href: "/diensten" },
    { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
    { label: "Over Thuismeester", href: "/over-thuismeester" },
];

const ctaLinks = [
    { label: "Contact", href: "/contact" },
    { label: "Aanmelden", href: "/aanmelden" },
];


export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header
            className={`sticky top-0 z-50 bg-beige-light transition-shadow duration-300 ${scrolled ? "shadow-sm" : ""
                }`}
        >
            <nav className="section-wrapper flex h-16 items-center justify-between lg:h-20">

                <Link
                    href="/"
                    onClick={closeMenu}
                    className={`relative font-serif text-xl font-semibold text-green tracking-tight
                      after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:bg-purple
                      after:origin-left after:transition-transform after:duration-200 ${pathname === "/" ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-50"
                        }`}
                >
                    Thuismeester
                </Link>

                <ul className="hidden items-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`relative py-1 text-sm transition-colors duration-150 hover:text-green
                            after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:bg-purple
                            after:origin-left after:scale-x-0 after:transition-transform after:duration-200 ${pathname === link.href
                                        ? "font-medium text-green after:scale-x-100"  // active page: green + full purple bar
                                        : "text-ink-soft hover:after:scale-x-50"      // inactive: muted, half bar on hover
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 lg:flex">
                    {ctaLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="inline-block bg-green px-5 py-2.5 text-sm font-medium text-white shadow-accent-b
                         transition-all duration-150 hover:bg-green-light
                         hover:translate-y-[3px] active:bg-purple"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>


                <button
                    aria-label="Menu openen"   // accessibility: screen reader label
                    className="flex flex-col gap-1.5 p-2 lg:hidden"
                    onClick={() => setMenuOpen((v) => !v)}  // toggle: flip current boolean
                >
                    <span
                        className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""
                            }`}
                    />
                </button>
            </nav>

            {menuOpen && (
                <div className="border-t border-beige-dark bg-beige-light lg:hidden">
                    <ul className="section-wrapper flex flex-col gap-4 py-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`block text-base transition-colors hover:text-green ${pathname === link.href
                                        ? "border-l-[3px] border-purple pl-3 font-medium text-green"
                                        : "text-ink-soft"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li className="flex flex-col gap-3 pt-2">
                            {ctaLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="inline-block w-full bg-green px-5 py-3 text-center text-sm
                             font-medium text-white transition-colors hover:bg-green-light"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
