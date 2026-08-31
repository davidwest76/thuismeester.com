import SceneSilhouette from "./SceneSilhouette";
import { ComponentProps, JSX, ReactNode } from "react";

/**
 * Section component (src/components/Section.tsx)
 *
 * The shared shell for every page section: the relative/overflow-hidden
 * wrapper, background colour, vertical padding and the decorative
 * SceneSilhouette scene resting on the bottom edge. Pages only choose the
 * background and which scene (and how wide) to show — the scene's position,
 * tint and opacity live here once, so sections look consistent across the
 * whole site while every scene stays different.
 *
 * Usage:
 *   <Section background="beige" scene="gable" sceneWidth="w-96">
 *       <div className="section-wrapper">…content…</div>
 *   </Section>
 *
 * Sections with a full-bleed photo pass it (plus any overlay) via
 * `backdrop`; it renders behind the scene and the content (the section is
 * its own stacking context and the backdrop sits at a negative z-index),
 * so content needs no z-index of its own.
 */

/**
 * The section background palettes; green flips the text to white.
 * "mint" (pale sage from the green ramp) is the cool counterpart to the warm
 * beiges — alternate between the families so adjacent sections never look
 * near-identical (beige next to beige-light reads as the same colour).
 */
const BACKGROUNDS = {
    beige: "bg-beige",
    "beige-light": "bg-beige-light",
    mint: "bg-green-100",
    green: "bg-green text-white",
} as const;

/**
 * Where every scene sits: on the bottom edge, nudged in a little from the
 * right so it doesn't hug the viewport edge. Tweak here to move all scenes
 * at once.
 */
const SCENE_POSITION = "right-8 sm:right-14";

/** Scene tint per background: faint green on light sections, faint white on green. */
const SCENE_TINTS: Record<keyof typeof BACKGROUNDS, string> = {
    beige: "text-green/[0.08]",
    "beige-light": "text-green/[0.08]",
    mint: "text-green/[0.10]",
    green: "text-white/[0.07]",
};

interface SectionProps {
    /** Background palette (default "beige-light"). */
    background?: keyof typeof BACKGROUNDS;
    /** Which SceneSilhouette scene to show — vary per section so the motif never feels copy-pasted. Omit for no scene. */
    scene?: ComponentProps<typeof SceneSilhouette>["variant"];
    /** Tailwind width class for the scene (default "w-96"). */
    sceneWidth?: string;
    /** Full-bleed photo (and overlay) rendered behind the scene and content. */
    backdrop?: ReactNode;
    /** Vertical padding classes (default "py-section"). */
    padding?: string;
    /** Extra classes for special layouts (e.g. the homepage hero). */
    className?: string;
    /** Optional anchor id. */
    id?: string;
    children: ReactNode;
}

export default function Section({
    background = "beige-light",
    scene,
    sceneWidth = "w-96",
    backdrop,
    padding = "py-section",
    className = "",
    id,
    children,
}: SectionProps): JSX.Element {
    return (
        <section
            id={id}
            className={`relative isolate overflow-hidden ${BACKGROUNDS[background]} ${padding} ${className}`}
        >
            {backdrop && <div className="absolute inset-0 -z-10">{backdrop}</div>}
            {scene && (
                <SceneSilhouette
                    variant={scene}
                    className={`${SCENE_POSITION} ${sceneWidth} ${SCENE_TINTS[background]}`}
                />
            )}
            {children}
        </section>
    );
}
