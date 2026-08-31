import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import { JSX } from "react";
import iconAdvice from "@/media/communication.png";
import iconOverview from "@/media/clipboard2.png";
import iconProfessionals from "@/media/trustworthy.png";
import iconCoordination from "@/media/tools.png";
import gezinswoningMetTuin from "@/media/gezinswoning-met-tuin.jpg";

export const metadata: Metadata = {
    title: "Diensten",
    description:
        "Met Thuismeester heb je iemand aan jouw kant bij onderhoud en werkzaamheden aan je woning: een onafhankelijk aanspreekpunt voor bewoners in Amersfoort en omstreken.",
};

const services = [
    {
        icon: iconAdvice,
        title: "Onafhankelijk advies",
        paragraphs: [
            "Twijfel je over een offerte, een klus of welk onderhoud " +
            "nodig is? Ik denk met je mee voordat je beslist. Ik help je " +
            "begrijpen wat er wordt voorgesteld, of dat logisch klinkt en " +
            "welke vragen je eventueel nog aan de vakman moet stellen.",
            "Thuismeester ontvangt geen commissie voor het aanbrengen van " +
            "een klus of het kiezen van een bepaalde vakman.",
        ],
    },
    {
        icon: iconOverview,
        title: "Onderhoud & overzicht",
        paragraphs: [
            "Een woning vraagt voortdurend onderhoud, maar niet alles " +
            "hoeft tegelijk. Ik help je overzicht te krijgen in wat " +
            "belangrijk is, wat kan wachten en wat er de komende jaren " +
            "waarschijnlijk aan zit te komen.",
            "Op verzoek kunnen we dit verder uitwerken tot een " +
            "onderhoudsoverzicht dat past bij jouw woning.",
        ],
    },
    {
        icon: iconProfessionals,
        title: "Betrouwbare vakmensen",
        paragraphs: [
            "Als er een vakman nodig is, hoef je niet zelf eindeloos te " +
            "zoeken. Ik help je iemand te vinden uit een zorgvuldig " +
            "geselecteerd netwerk van vakmensen met wie ik goede " +
            "ervaringen heb.",
            "De keuze blijft altijd bij jou. Thuismeester heeft geen " +
            "financieel belang bij welke vakman je kiest.",
        ],
    },
    {
        icon: iconCoordination,
        title: "Coördinatie & opvolging",
        paragraphs: [
            "Wil je meer uit handen geven? Dan kan ik ook helpen bij het " +
            "opvragen of vergelijken van offertes, het maken van " +
            "afspraken, een bezoek aan huis en het volgen van de " +
            "werkzaamheden.",
            "Omdat dit per situatie sterk verschilt, spreken we vooraf af " +
            "wat je wilt dat Thuismeester overneemt en welke eventuele " +
            "extra kosten daarbij horen.",
        ],
    },
];

/**
 * Section describing the four services, with the same icons as on the
 * home page.
 */
function ServicesSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl">
                <SectionLabel>Diensten</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    Wat Thuismeester voor je doet
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">
                    Met Thuismeester heb je iemand aan jouw kant bij onderhoud en
                    werkzaamheden aan je woning. Geen klusbedrijf en geen
                    verkoper van vakmensen, maar een onafhankelijk aanspreekpunt
                    dat vanuit jouw belang met je meedenkt.
                </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-12 md:grid-cols-2">
                {services.map((service) => (
                    <div key={service.title} className="flex items-start gap-5">
                        <Image
                            src={service.icon}
                            alt=""
                            aria-hidden="true"
                            className="h-12 w-12 shrink-0"
                        />
                        <div>
                            <h3 className="font-serif text-xl font-semibold text-ink">
                                {service.title}
                            </h3>
                            {service.paragraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-3 text-base leading-relaxed text-ink-muted">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-14 text-center">
                <Button href="/aanmelden" size="lg">
                    Meld je aan voor jouw regio
                </Button>
            </div>
        </div>
    </>);
}

/**
 * Section describing what thuismeester does not do.
 */
function WhatDoesThuismeesterNotDoSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl">
                <SectionLabel>Afbakening</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    Wat doet Thuismeester niet?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-muted">
                    Duidelijkheid werkt twee kanten op. Thuismeester is geen
                    vakman, aannemer, schoonmaakdienst of boodschappenservice — en
                    doet dus zelf geen uitvoerend werk dat specifieke vakkennis
                    vereist. Dat werk laat ik bewust over aan de gescreende
                    vakmensen uit mijn netwerk, die er hun vak van hebben gemaakt.
                    Mijn meerwaarde zit in alles eromheen: weten wie je moet
                    hebben, afspraken maken en bewaken, meedenken en het overzicht
                    houden.
                </p>
            </div>
        </div>
    </>);
}

/**
 * Section with a short price reference and the single page CTA.
 */
function PricingSection(): JSX.Element {
    return (<>
        <div className="section-wrapper">
            <div className="mx-auto max-w-3xl text-center">
                <SectionLabel>Prijs</SectionLabel>
                <h2 className="font-serif text-display-md font-semibold text-ink">
                    €10 per maand
                </h2>
                <p className="mx-auto mt-5 max-w-prose text-base leading-relaxed text-ink-muted">
                    €10 per maand voor advies, aanspreekpunt en toegang tot het
                    vakmensennetwerk. Bekijk de volledige prijsopbouw op de{" "}
                    <Link href="/" className="font-medium text-green underline underline-offset-2 hover:text-purple">
                        homepage
                    </Link>.
                </p>
                <div className="mt-8">
                    <Button href="/aanmelden" size="lg">
                        Nieuwsgierig? Meld je vrijblijvend aan
                    </Button>
                </div>
            </div>
        </div>
    </>);
}

/**
 * @returns the services page
 */
export default function ServicesPage() {
    return (
        <>
            <PageHeader
                label="Wat we doen"
                title="Diensten"
                intro="Met Thuismeester heb je iemand aan jouw kant bij onderhoud
                    en werkzaamheden aan je woning. Geen zes losse diensten,
                    maar één duidelijke belofte."
                silhouetteVariant="tall"
                image={{
                    src: gezinswoningMetTuin,
                    alt: "Gewone gezinswoning in Amersfoort — praktische hulp bij woningzaken",
                }}
            />

            <Section background="beige-light" scene="orchard" sceneWidth="w-[26rem]">
                <ServicesSection />
            </Section>

            <Section background="mint" scene="gable" sceneWidth="w-[30rem]">
                <WhatDoesThuismeesterNotDoSection />
            </Section>

            <Section background="beige" scene="row" sceneWidth="w-[36rem]">
                <PricingSection />
            </Section>
        </>
    );
}
