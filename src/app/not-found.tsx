import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Button from "@/components/Button";

export const metadata: Metadata = {
    title: "Pagina niet gevonden",
};

/**
 * not-found.tsx — the site's 404 page, shown for any URL that doesn't exist.
 * Without this file Next.js falls back to its own English "This page could
 * not be found" screen, which would be jarring on an otherwise Dutch site.
 */
export default function NotFound() {
    return (
        <>
            <PageHeader
                label="Foutmelding 404"
                title="Deze pagina bestaat niet"
                intro="De pagina die je zocht is verplaatst of heeft nooit
                    bestaan. Geen zorgen — via onderstaande knoppen kom je
                    weer op het goede spoor."
                silhouetteVariant="gable"
            />
            <Section background="beige-light" scene="row" sceneWidth="w-[32rem]">
                <div className="section-wrapper">
                    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
                        <Button href="/" variant="primary">
                            Terug naar de homepage
                        </Button>
                        <Button href="/contact" variant="outline">
                            Stel een vraag
                        </Button>
                    </div>
                </div>
            </Section>
        </>
    );
}
