import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import { JSX } from "react";
import { REGION_NOTE, REGIONS } from "@/lib/site";
import woonkamerInterieur from "@/media/woonkamer-interieur.jpg";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Neem contact op met Thuismeester. Actief in voorbereiding voor Amersfoort en omstreken.",
};

/**
 * The form component.
 */
function Form(): JSX.Element {
    return (<>
        <div className="bg-white p-8 shadow-accent-l-lg sm:p-12">
            <h2 className="font-serif text-2xl font-semibold text-ink">
                Stuur een bericht
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
                Ik reageer meestal binnen één werkdag.
            </p>
            <div className="mt-8">
                <ContactForm />
            </div>
        </div>
    </>);
}

/**
 * The sidebar element.
 */
function Sidebar(): JSX.Element {
    return (<>
        <aside className="space-y-8">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={woonkamerInterieur}
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
                        Regio
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                        Actief in voorbereiding voor{" "}
                        <strong>{REGION_NOTE}</strong>
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">
                        {REGIONS.join(" · ")}
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
    </>);
}

export default function ContactPage() {
    return (
        <>
            <PageHeader
                label="Bereikbaarheid"
                title="Nog een vraag voor je je aanmeldt?"
                intro={<>
                    Heb je een vraag over Thuismeester, de aanmelding of jouw
                    regio? Stuur een bericht — ik reageer meestal binnen één
                    werkdag. Weet je het al zeker? Ga direct naar{" "}
                    <Link href="/aanmelden" className="font-medium text-white underline underline-offset-2 hover:text-beige">
                        aanmelden
                    </Link>.
                </>}
                silhouetteVariant="court"
                silhouetteWidth="w-80"
            />

            <Section background="beige-light" scene="play" sceneWidth="w-80">
                <div className="section-wrapper">
                    <div className="grid items-start gap-16 lg:grid-cols-[1fr_340px]">
                        <Form />
                        <Sidebar />
                    </div>
                </div>
            </Section>
        </>
    );
}
