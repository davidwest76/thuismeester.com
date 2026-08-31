import type { Metadata } from "next";
import Button from "@/components/Button";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import { JSX } from "react";

export const metadata: Metadata = {
    title: "Hoe werkt het",
    description:
        "Zo werkt Thuismeester in de praktijk: van een berichtje over een losse dakgoot tot een afgeronde klus. Voor bewoners in Amersfoort en omstreken.",
};

// The practical case is the heart of this page; the sign-up steps are
// summarised in a few sentences below it, with a link to the homepage.
const exampleScenario = [
    "Na een storm hangt de dakgoot los. Je stuurt me een berichtje — meer hoef je niet te doen.",
    "Ik ken de situatie van je woning, schat in wat er nodig is en benader een betrouwbare vakman uit mijn netwerk. Jij ontvangt één helder voorstel met prijs.",
    "Na jouw akkoord wordt de afspraak ingepland. Ik houd in de gaten dat het werk goed en op tijd gebeurt, en check achteraf of alles naar wens is.",
];

/**
 * Section containing the practical example — the main moment of this page.
 */
function PracticalExampleSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl text-center">
                <SectionLabel>In de praktijk</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    In de praktijk: de losse dakgoot
                </h2>
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
                {exampleScenario.map((body, i) => (
                    <div key={i} className="border-l-2 border-purple pl-5 text-left">
                        <p className="font-serif text-3xl font-semibold text-purple/50">
                            {i + 1}
                        </p>
                        <p className="mt-3 text-base leading-relaxed text-ink-muted">
                            {body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </>);
}

/**
 * Section summarising how to join, with the single page CTA.
 */
function HowToJoinSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl">
                <SectionLabel>Aanmelden</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    Zo kom je erbij
                </h2>
                <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted">
                    Je meldt je in twee minuten vrijblijvend aan. Zodra er genoeg
                    bewoners in jouw regio zijn aangemeld, starten we — in januari
                    2027. Daarna krijg je jouw eigen vaste Thuismeester, voor €10
                    per maand. Meer over de aanmelding staat op de{" "}
                    <Link href="/" className="font-medium text-green underline underline-offset-2 hover:text-green-light">
                        homepage
                    </Link>.
                </p>
                <div className="mt-8">
                    <Button href="/aanmelden" size="lg">
                        Wil je erbij zijn zodra we starten in jouw regio?
                    </Button>
                </div>
            </div>
        </div>
    </>);
}

/**
 * @returns the 'how does it work' page
 */
export default function HoeWerktHetPage() {
    return (
        <>
            <PageHeader
                label="Werkwijze"
                title="Hoe werkt het?"
                intro="Geen abstract stappenplan, maar een alledaags voorbeeld: zo
                    voelt het straks als Thuismeester actief is."
                silhouetteVariant="stepped"
            />

            <Section background="beige" scene="court" sceneWidth="w-96">
                <PracticalExampleSection />
            </Section>

            <Section background="mint" scene="orchard" sceneWidth="w-[26rem]">
                <HowToJoinSection />
            </Section>
        </>
    );
}
