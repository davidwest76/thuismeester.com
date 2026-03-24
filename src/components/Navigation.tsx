"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// -------------------------------------------------------
// Navigation links — edit text and hrefs here
// -------------------------------------------------------
const navLinks = [
  { label: "Hoe werkt het",       href: "/hoe-werkt-het" },
  { label: "Diensten",            href: "/diensten" },
  { label: "Over Thuismeester",   href: "/over-thuismeester" },
  { label: "Contact",             href: "/contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname = usePathname();

  // Add a subtle shadow once the user scrolls
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-beige-light transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="section-wrapper flex h-16 items-center justify-between md:h-20">
        {/* Logo / wordmark */}
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-green tracking-tight"
        >
          Thuismeester
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm transition-colors duration-150 hover:text-green ${
                  pathname === link.href
                    ? "font-medium text-green"
                    : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/aanmelden"
            className="inline-block bg-green px-5 py-2.5 text-sm font-medium text-white
                       transition-colors duration-150 hover:bg-green-light"
          >
            Aanmelden
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Menu openen"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="border-t border-beige-dark bg-beige-light md:hidden">
          <ul className="section-wrapper flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-base transition-colors hover:text-green ${
                    pathname === link.href ? "font-medium text-green" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/aanmelden"
                className="inline-block w-full bg-green px-5 py-3 text-center text-sm
                           font-medium text-white transition-colors hover:bg-green-light"
              >
                Aanmelden
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
