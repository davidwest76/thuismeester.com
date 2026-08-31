import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import SectionLabel from "@/components/SectionLabel";
import { JSX } from "react";

export const metadata: Metadata = {
	title: "Veelgestelde vragen",
	description:
		"Antwoorden op veelgestelde vragen over Thuismeester: wat het is, wat het kost, hoe de aanmelding werkt en wanneer we starten in Amersfoort en omstreken.",
};

// -------------------------------------------------------
// FAQ content — grouped by theme.
// Add or edit questions here; the page renders each group
// with its own heading and accordion list.
// -------------------------------------------------------
const faqGroups = [
	{
		group: "Algemeen",
		items: [
			{
				q: "Wat is Thuismeester precies?",
				a: "Eén vast, onafhankelijk aanspreekpunt voor alles rondom je woning. Je belt of appt één iemand — die denkt mee, regelt de rest en bewaakt dat het goed gebeurt.",
			},
			{
				q: "Is Thuismeester echt onafhankelijk?",
				a: "Ja. Ik verkoop geen producten, materialen of eigen uitvoerend personeel, en ontvang geen commissie van vakmensen voor doorverwijzingen. Mijn enige belang is dat jij een eerlijk advies en een goede vakman krijgt.",
			},
			{
				q: "Is Thuismeester een klusbedrijf?",
				a: "Nee. Ik organiseer, adviseer en coördineer. Het uitvoerende werk wordt gedaan door gescreende vakmensen uit mijn netwerk.",
			},
			{
				q: "Wat kost Thuismeester?",
				a: "€10 per maand voor je vaste aanspreekpunt, advies en toegang tot het vakmensennetwerk. Uitvoerend werk wordt apart afgesproken, tegen uurtarief of offertebasis.",
			},
			{
				q: "Zijn er verborgen kosten of lange contracten?",
				a: "Nee. Maandelijks opzegbaar, en extra werk wordt altijd vooraf besproken en akkoord bevonden.",
			},
			{
				q: "Hoe worden de vakmensen geselecteerd?",
				a: "Uitsluitend vakmensen uit de regio die ik zelf ken en vertrouw, op vakmanschap, betrouwbaarheid en communicatie. Ben je niet tevreden, dan is dat mijn probleem — niet het jouwe.",
			},
			{
				q: "Wanneer gaat Thuismeester van start?",
				a: "In januari 2027, zodra er voldoende aanmeldingen zijn in Amersfoort en omstreken.",
			},
			{
				q: "Is aanmelden vrijblijvend?",
				a: "Ja. Gratis, geen verplichtingen, op elk moment weer af te melden.",
			},
		],
	},
	/* different sections can be added by adding more items to this array */
]

/**
 * Section containing FAQs.
 */
function FAQSection(): JSX.Element {
	return (<>
		<div className="section-wrapper">
			<div className="mx-auto max-w-3xl space-y-16">
				{faqGroups.map(({ group, items }) => (
					<div key={group}>
						<SectionLabel>{group}</SectionLabel>
						<div className="mt-2 divide-y divide-beige-dark border-y border-beige-dark">
							{items.map(({ q, a }) => (
								<details key={q} className="group py-6">
									<summary className="flex cursor-pointer list-none items-center justify-between
                                          gap-4 font-serif text-lg font-semibold text-ink">
										{q}
										{/* Purple accent: the +/× toggle indicator */}
										<span className="shrink-0 text-purple transition-transform group-open:rotate-45">
											+
										</span>
									</summary>
									<p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
										{a}
									</p>
								</details>
							))}
						</div>
					</div>
				))}

				{/* Single contextual CTA of this page */}
				<div className="text-center">
					<Button href="/contact" variant="outline">
						Vraag niet beantwoord? Neem contact op
					</Button>
				</div>
			</div>
		</div>
	</>);
}


export default function FAQPage() {
	return (
		<>
			<PageHeader
				label="Vragen & antwoorden"
				title="Veelgestelde vragen"
				intro="Alles wat je wilt weten over Thuismeester: wat het is, wat het
					kost, hoe de aanmelding werkt en wanneer we starten. Staat je
					vraag er niet tussen? Stel hem gerust via de contactpagina."
				silhouetteVariant="gable"
			/>
			<Section background="beige-light" scene="lane" sceneWidth="w-[30rem]">
				<FAQSection />
			</Section>
		</>
	);
}
