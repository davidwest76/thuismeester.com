/**
 * SceneSilhouette component (src/components/SceneSilhouette.tsx)
 *
 * A decorative, low-opacity silhouette scene that sits on the bottom-right
 * edge of a section — a recurring visual motif across the site. Each scene
 * combines one or more Dutch houses with simple garden shapes (a tree, a
 * pine, a bush, a hedge), so it reads as a little streetscape rather than
 * a lone building. Every variant arranges different scenery, so sections
 * never feel copy-pasted.
 *
 * Normally you don't use this directly: the Section component renders it
 * with the site-wide position and tint, and pages just pick a `scene` and
 * `sceneWidth`. If you do use it standalone, the parent must be `relative`
 * (and ideally `overflow-hidden`), then:
 *
 *   <SceneSilhouette variant="stepped" className="right-8 w-80 text-green/[0.08]" />
 *
 * The SVG uses fill="currentColor", so the colour is controlled entirely by
 * a text-* class. It is aria-hidden (pure decoration) and pointer-events-none
 * (never blocks clicks or text selection).
 */

/**
 * The building blocks. Each path is drawn inside its own local coordinate
 * space with the shape "standing" on the bottom edge (y = 100), so anchoring
 * the SVG with `absolute bottom-0` makes the whole scene rest exactly on the
 * section's bottom border. `w` is the shape's width in viewBox units, used
 * when laying shapes out side by side in a scene.
 *
 * Houses:
 *   gable   → one house with a pitched roof and a chimney on the right slope
 *   stepped → a classic Dutch trapgevel (stepped gable) facade
 *   row     → a small skyline of three houses of different heights
 *   tall    → a tall narrow house with a flat-roofed annex beside it
 *
 * Garden scenery (kept deliberately simple so the scene stays readable):
 *   tree    → round canopy on a thin trunk
 *   pine    → a single triangular conifer
 *   bush    → a low rounded shrub
 *   hedge   → a long, low scalloped hedge
 *
 * Play equipment (a garden isn't complete without it):
 *   swing   → frame with top bar and two hanging swings
 *   hut     → a pitched-roof playhouse with an S-curved slide down its side
 */
const SHAPES = {
    // Houses
    gable: {
        w: 120,
        d: "M10 100 V55 L60 20 L74 29.8 V16 H86 V38.2 L110 55 V100 Z",
    },
    stepped: {
        w: 120,
        d: "M15 100 V58 H27 V44 H39 V32 H51 V22 H69 V32 H81 V44 H93 V58 H105 V100 Z",
    },
    row: {
        w: 190,
        d:
            "M0 100 V68 L24 50 L48 68 V100 Z " +
            "M58 100 V38 L68 30.5 V20 H76 V24.5 L86 17 L114 38 V100 Z " +
            "M124 100 V62 L148 45 L172 62 V100 Z",
    },
    tall: {
        w: 130,
        d:
            "M15 100 V38 L42 16 L69 38 V100 Z " +
            "M69 100 V66 H78 V56 H86 V66 H104 V100 Z",
    },

    // Garden scenery
    tree: {
        w: 34,
        d:
            "M15 66 H19 V100 H15 Z " +
            "M0 52 a17 17 0 1 0 34 0 a17 17 0 1 0 -34 0 Z",
    },
    pine: {
        w: 32,
        d: "M13 100 V88 H2 L16 46 L30 88 H19 V100 Z",
    },
    bush: {
        w: 40,
        d: "M0 100 C1 88 10 83 17 87 C21 79 33 80 36 88 C42 89 42 96 40 100 Z",
    },
    hedge: {
        w: 56,
        d: "M0 100 V92 Q7 85 14 92 Q21 85 28 92 Q35 85 42 92 Q49 85 56 92 V100 Z",
    },

    // Play equipment
    swing: {
        w: 48,
        d:
            "M0 58 H48 V61 H0 Z " + // top bar
            "M3 61 H6 V100 H3 Z M42 61 H45 V100 H42 Z " + // legs
            "M17 61 H19 V86 H17 Z M29 61 H31 V86 H29 Z " + // ropes
            "M13 86 H23 V89 H13 Z M25 86 H35 V89 H25 Z", // seats
    },
    hut: {
        w: 66,
        d:
            "M0 100 V70 L17 55 L34 70 V100 Z " + // playhouse with pitched roof
            // S-curved slide: flat exit off the hut, steep middle, flared run-out
            "M34 71 C50 73 44 90 66 96 L66 100 H61 C44 95 46 82 34 78 Z",
    },
};

type ShapeName = keyof typeof SHAPES;

/**
 * The scenes: each variant lays out a house with different scenery around
 * it (x = horizontal offset in viewBox units). The mixes are deliberately
 * uneven — a full garden here, just a tree there — so the repeated motif
 * feels organic across sections. `width` is the total scene width and
 * becomes the viewBox width.
 */
const SCENES: Record<
    string,
    { width: number; items: { shape: ShapeName; x: number }[] }
> = {
    gable: {
        width: 214,
        items: [
            { shape: "pine", x: 0 },
            { shape: "gable", x: 38 },
            { shape: "swing", x: 166 },
        ],
    },
    stepped: {
        width: 162,
        items: [
            { shape: "stepped", x: 0 },
            { shape: "tree", x: 128 },
        ],
    },
    row: {
        width: 300,
        items: [
            { shape: "bush", x: 0 },
            { shape: "row", x: 46 },
            { shape: "hedge", x: 244 },
        ],
    },
    tall: {
        width: 264,
        items: [
            { shape: "hedge", x: 0 },
            { shape: "tall", x: 62 },
            { shape: "hut", x: 198 },
        ],
    },
    // Scenery-first arrangements: the garden comes before the house, so the
    // motif never reads as "always a house, then a tree".
    orchard: {
        width: 212,
        items: [
            { shape: "tree", x: 0 },
            { shape: "gable", x: 42 },
            { shape: "bush", x: 172 },
        ],
    },
    play: {
        width: 218,
        items: [
            { shape: "swing", x: 0 },
            { shape: "stepped", x: 58 },
            { shape: "pine", x: 186 },
        ],
    },
    lane: {
        width: 284,
        items: [
            { shape: "tree", x: 0 },
            { shape: "row", x: 44 },
            { shape: "bush", x: 244 },
        ],
    },
    court: {
        width: 270,
        items: [
            { shape: "hut", x: 0 },
            { shape: "tall", x: 76 },
            { shape: "hedge", x: 214 },
        ],
    },
    hof: {
        width: 234,
        items: [
            { shape: "hedge", x: 0 },
            { shape: "stepped", x: 68 },
            { shape: "tree", x: 200 },
        ],
    },
};

interface SceneSilhouetteProps {
    /** Which scene to draw (default: "gable") */
    variant?: keyof typeof SCENES;
    /**
     * Position, size and colour classes — e.g. "right-8 w-[26rem]
     * text-green/[0.08]". The Section component supplies these site-wide;
     * vary the width and variant per section so it never feels copy-pasted.
     */
    className?: string;
}

export default function SceneSilhouette({
    variant = "gable",
    className = "right-8 w-96 text-green/[0.08]",
}: SceneSilhouetteProps) {
    const scene = SCENES[variant];

    return (
        <svg
            viewBox={`0 0 ${scene.width} 100`}
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-0 select-none ${className}`}
            fill="currentColor"
        >
            {scene.items.map(({ shape, x }, i) => (
                <path key={i} d={SHAPES[shape].d} transform={`translate(${x} 0)`} />
            ))}
        </svg>
    );
}
