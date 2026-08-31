import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import RegisterForm from "@/components/RegisterForm";
import Section from "@/components/Section";
import { JSX } from "react";
import { REGIONS } from "@/lib/site";

export const metadata: Metadata = {
    title: "Aanmelden",
    description:
        "Schrijf je vrijblijvend in voor Thuismeester in Amersfoort en omstreken. Start in januari 2027 bij voldoende aanmeldingen.",
};

/**
 * Form component.
 */
function Form(): JSX.Element {
    return (<>
        <div className="bg-white p-8 shadow-accent-l-lg sm:p-12">
            <h2 className="font-serif text-2xl font-semibold text-ink">
                Inschrijfformulier
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
                Vul je gegevens in. We nemen contact op zodra Thuismeester
                start in jouw regio.
            </p>

            <div className="mt-8">
                {/* RegisterForm is a client component to handle state & submission */}
                <RegisterForm />
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                Wij starten zodra er voldoende aanmeldingen zijn in Amersfoort
                en omstreken. Je gegevens worden vertrouwelijk behandeld en
                alleen gebruikt voor communicatie over de start van
                Thuismeester. Lees meer in ons{" "}
                <Link href="/privacybeleid" className="underline hover:text-ink">
                    privacybeleid
                </Link>.
            </p>
        </div>
    </>);
}

/**
 * Sidebar component.
 */
function Sidebar(): JSX.Element {
    return (<>
        <aside className="space-y-8">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src="/images/jaren-30-woning.jpg"
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
                    {REGIONS.map((r) => (
                        <li
                            key={r}
                            className="flex items-center gap-2 text-sm text-ink-soft"
                        >
                            <span className="text-green text-xs">✓</span>
                            {r}
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-sm text-ink-muted">
                    Woon je ergens anders? Meld je toch aan — we kijken mee
                    naar uitbreiding.
                </p>
            </div>

            {/* Pre-launch note — purple accent border */}
            <div className="border-l-4 border-purple pl-5">
                <p className="font-serif text-base font-semibold text-ink">
                    Start: januari 2027
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    De dienstverlening gaat van start zodra er voldoende
                    aanmeldingen zijn in de regio.
                </p>
            </div>
        </aside>
    </>);
}
export default function AanmeldenPage() {
    return (
        <>
            <PageHeader
                label="Inschrijven"
                title="Aanmelden"
                intro="Schrijf je vrijblijvend in en laat weten dat er in jouw regio
                    behoefte is aan Thuismeester. Geen verplichtingen, geen kosten bij
                    aanmelding."
                silhouetteVariant="lane"
                silhouetteWidth="w-[30rem]"
            />

            <Section background="beige-light" scene="stepped" sceneWidth="w-80">
                <div className="section-wrapper">
                    <div className="grid items-start gap-16 lg:grid-cols-[1fr_380px]">
                        <Form />
                        <Sidebar />
                    </div>
                </div>
            </Section>
        </>
    );
}
