import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { JSX, ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
	title: "Privacybeleid",
	description:
		"Hoe Thuismeester omgaat met jouw gegevens: wat we verzamelen, waarvoor we het gebruiken, hoe lang we het bewaren en welke rechten je hebt.",
};

const LAST_UPDATED = "18 juli 2026";

/**
 * MailLink — the contact address as a clickable mailto link,
 * used inside the policy answers below.
 */
function MailLink(): JSX.Element {
	return (
		<a
			href={`mailto:${CONTACT_EMAIL}`}
			className="font-medium text-green underline underline-offset-2 hover:text-green-light"
		>
			{CONTACT_EMAIL}
		</a>
	);
}

// -------------------------------------------------------
// Policy content — one question-and-answer per topic.
// Add or edit entries here; the page renders each one as
// its own heading with the answer below it.
// -------------------------------------------------------
const policySections: { q: string; a: ReactNode }[] = [
	{
		q: "Wie is verantwoordelijk voor jouw gegevens?",
		a: (<>
			Thuismeester is de verwerkingsverantwoordelijke voor de persoonsgegevens die je via deze website achterlaat. Heb je vragen over privacy? Mail naar <MailLink />.
		</>),
	},
	{
		q: "Welke gegevens verzamelen we?",
		a: "Alleen wat je zelf invult. Bij aanmelding zijn dat je naam, e-mailadres, postcode, woonplaats en eventueel een opmerking. Via het contactformulier je naam, e-mailadres en je bericht. Daarnaast registreren we of de e-mails die we je sturen zijn afgeleverd. Verder verzamelen we niets over jou of je bezoek aan deze website.",
	},
	{
		q: "Waarvoor gebruiken we jouw gegevens?",
		a: "Voor twee dingen: om je te laten weten wanneer — en of — Thuismeester van start gaat, en om aan de hand van postcodes te zien in welke gebieden er interesse is. Gegevens uit het contactformulier gebruiken we alleen om je bericht te beantwoorden. De grondslag hiervoor is jouw toestemming (art. 6 lid 1 sub a AVG), die je op elk moment kunt intrekken.",
	},
	{
		q: "Gebruiken we cookies?",
		a: "Nee. Deze website plaatst geen cookies en gebruikt geen analyse- of trackingdiensten.",
	},
	{
		q: "Met wie delen we jouw gegevens?",
		a: "We verkopen of delen je gegevens nooit voor commerciële doeleinden. Om de website te laten werken gebruiken we drie diensten: Vercel (hosting van de website), Supabase (opslag van aanmeldingen) en Resend (versturen van e-mail). Zij verwerken gegevens uitsluitend in onze opdracht. Voor zover daarbij gegevens buiten de EER worden verwerkt, gebeurt dat op basis van door de EU goedgekeurde waarborgen, zoals het EU-VS Data Privacy Framework of standaardcontractbepalingen.",
	},
	{
		q: "Hoe lang bewaren we jouw gegevens?",
		a: "Niet langer dan nodig voor het doel waarvoor je ze achterliet. Aanmeldingen bewaren we tot Thuismeester van start is gegaan en je daarover bent geïnformeerd, of tot je je aanmelding intrekt. Berichten via het contactformulier bewaren we tot je vraag is afgehandeld.",
	},
	{
		q: "Wat zijn jouw rechten?",
		a: (<>
			Je hebt het recht om je gegevens in te zien, te laten corrigeren of verwijderen, de verwerking te laten beperken, bezwaar te maken en je toestemming in te trekken. Mail daarvoor naar <MailLink />; we reageren binnen een maand. Ben je niet tevreden over hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.
		</>),
	},
]

/**
 * Section containing the policy itself.
 */
function PolicySection(): JSX.Element {
	return (<>
		<div className="section-wrapper">
			<div className="mx-auto max-w-3xl divide-y divide-beige-dark border-y border-beige-dark">
				{policySections.map(({ q, a }) => (
					<div key={q} className="py-8">
						<h2 className="font-serif text-lg font-semibold text-ink">
							{q}
						</h2>
						<p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
							{a}
						</p>
					</div>
				))}
			</div>
		</div>
	</>);
}


export default function PrivacybeleidPage() {
	return (
		<>
			<PageHeader
				label="Jouw gegevens"
				title="Privacybeleid"
				intro="We verzamelen zo min mogelijk gegevens en gebruiken ze alleen
					waarvoor je ze achterliet. Hieronder lees je precies wat we
					bewaren, waarom, en welke rechten je hebt."
				silhouetteVariant="gable"
			>
				<p className="mt-4 text-xs uppercase tracking-widest text-white/70">
					Laatst bijgewerkt: {LAST_UPDATED}
				</p>
			</PageHeader>
			<Section background="beige-light" scene="row" sceneWidth="w-[32rem]">
				<PolicySection />
			</Section>
		</>
	);
}
