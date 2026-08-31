import Image, { StaticImageData } from "next/image";
import Section from "./Section";
import SectionLabel from "./SectionLabel";
import SceneSilhouette from "./SceneSilhouette";
import { ComponentProps, JSX, ReactNode } from "react";

/**
 * PageHeader component (src/components/PageHeader.tsx)
 *
 * The green hero section at the top of every subpage: a SectionLabel, the
 * page title, a short intro paragraph and a SceneSilhouette scene on the
 * bottom edge (rendered by Section, like everywhere else). Optionally a
 * faded full-bleed photo behind it all. Every page passes its own texts;
 * the structure and styling live here once.
 *
 * Usage:
 *   <PageHeader
 *       label="Werkwijze"
 *       title="Hoe werkt het?"
 *       intro="Van aanmelding tot jouw vaste aanspreekpunt."
 *       silhouetteVariant="tall"
 *   />
 *
 * Anything passed as children is rendered below the intro paragraph
 * (e.g. the "Laatst bijgewerkt" line on the privacy page).
 */
interface PageHeaderProps {
    /** Text for the SectionLabel above the title. */
    label: string;
    /** The page title (rendered as the h1). */
    title: string;
    /** The intro paragraph below the title. */
    intro: ReactNode;
    /** Which SceneSilhouette scene to show — vary per page so headers never feel copy-pasted. */
    silhouetteVariant?: ComponentProps<typeof SceneSilhouette>["variant"];
    /** Tailwind width class for the silhouette. */
    silhouetteWidth?: string;
    /** Optional full-bleed photo faded behind the header. */
    image?: { src: string | StaticImageData; alt: string };
    /** Optional extra content rendered below the intro paragraph. */
    children?: ReactNode;
}

export default function PageHeader({
    label,
    title,
    intro,
    silhouetteVariant = "gable",
    silhouetteWidth = "w-80",
    image,
    children,
}: PageHeaderProps): JSX.Element {
    return (
        // With a background photo the header gets a bit more breathing room
        <Section
            background="green"
            scene={silhouetteVariant}
            sceneWidth={silhouetteWidth}
            padding={image ? "py-28" : "py-20"}
            backdrop={image && (
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    className="object-cover object-center opacity-20"
                    sizes="100vw"
                />
            )}
        >
            <div className="section-wrapper">
                <SectionLabel>
                    <span className="text-white/80">{label}</span>
                </SectionLabel>
                <h1 className="font-serif text-display-lg font-semibold">
                    {title}
                </h1>
                <p className="mt-5 max-w-prose text-base leading-relaxed text-white/85">
                    {intro}
                </p>
                {children}
            </div>
        </Section>
    );
}
