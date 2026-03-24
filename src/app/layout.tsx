import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// -------------------------------------------------------
// Fonts
// Using Next.js built-in Google Font optimisation.
// Playfair Display → headings (elegant, premium serif)
// Inter             → body text (clean, legible sans-serif)
// -------------------------------------------------------
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// -------------------------------------------------------
// Global SEO metadata
// Customise per-page via generateMetadata() in each page file.
// -------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: "Thuismeester — Rust in huis voor Amersfoort en omstreken",
    template: "%s | Thuismeester",
  },
  description:
    "Thuismeester is jouw vaste aanspreekpunt voor praktische hulp en organisatie rondom je woning. Voor bewoners in Amersfoort, Leusden, Hoevelaken, Nijkerk en Soest. Vanaf €10 per maand.",
  keywords: [
    "thuismeester",
    "Amersfoort",
    "woning hulp",
    "huisbeheer",
    "praktische hulp thuis",
    "woningonderhoud",
    "Leusden",
    "Hoevelaken",
    "Nijkerk",
    "Soest",
  ],
  authors: [{ name: "Thuismeester" }],
  openGraph: {
    title: "Thuismeester — Rust in huis voor Amersfoort en omstreken",
    description:
      "Jouw vaste aanspreekpunt voor praktische hulp en organisatie rondom je woning.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
