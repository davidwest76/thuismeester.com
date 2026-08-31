/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // -------------------------------------------------------
                // Brand color palette
                // Use these as Tailwind class suffixes, e.g.:
                //   bg-green        → background: #2C4A3E
                //   text-green-300  → color: #8cb9a6
                //   border-beige    → border-color: #F0EBE1
                // -------------------------------------------------------

                // Primary: dark forest green — trust, calm, premium
                green: {
                    50: "#f2f6f4",  // very pale mint — rarely used, good for backgrounds
                    100: "#d9e8e1",
                    200: "#b3d0c4",
                    300: "#8cb9a6",
                    400: "#5e9a80",
                    500: "#3d7a60",
                    600: "#2c5a47",
                    700: "#1e3d30",
                    800: "#152c22",
                    900: "#0d1a14",  // near-black green
                    DEFAULT: "#2C4A3E",   // used by "bg-green", "text-green", etc.
                    light: "#3D6B5C",     // used by "bg-green-light" on hover states
                },

                // Accent: dusty violet — the "pop of colour" next to the calm green.
                // Used sparingly: active-tab bar in the nav, button/box offset
                // shadows, section-label dashes and small decorative borders.
                // Usage: bg-purple, text-purple, border-purple, bg-purple-light
                purple: {
                    50: "#f6f4fa",
                    100: "#e8e3f3",
                    200: "#d2c8e6",
                    300: "#b5a5d4",
                    400: "#9781bf",
                    500: "#7f66ab",
                    600: "#6a5294",
                    700: "#554177",
                    800: "#3f3059",
                    900: "#2a203c",
                    DEFAULT: "#6E5A9E",   // used by "bg-purple", "text-purple", etc.
                    light: "#8B76B8",     // reads well on both beige and dark green
                },
                // Warm beige tones — welcoming, premium, domestic
                beige: {
                    50: "#fdfcf9",
                    light: "#FAF8F4",
                    DEFAULT: "#F0EBE1",
                    dark: "#E4DBCc",
                },

                // Neutral greys — used for subtle UI elements
                stone: {
                    light: "#F5F4F1",
                    DEFAULT: "#9B9E97",
                    dark: "#5A5E57",
                },
                // Deep text colour. `muted` is kept dark enough to stay
                // WCAG AA (≥4.5:1) on every section background, including
                // bg-green-100 ("mint" sections).
                ink: {
                    DEFAULT: "#1A2018",
                    soft: "#3D4438",
                    muted: "#575E52",
                },
            },
            fontFamily: {
                serif: ["Playfair Display", "Georgia", "serif"],
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            fontSize: {
                "display-xl": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1" }],
                "display-lg": ["clamp(2rem,  4vw, 3rem)", { lineHeight: "1.15" }],
                "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2" }],
            },
            spacing: {
                section: "6rem",
                "section-sm": "4rem",
            },

            /**
             * boxShadow — flat purple accent bars drawn with box-shadow.
             * Each token puts a crisp purple line on exactly ONE side of an
             * element (no blur, no diagonal offset), matching the accent
             * language of the nav tabs: a purple bar on one deliberate edge.
             *
             * Usage: shadow-accent-b    → underline below buttons / nav CTA
             *        shadow-accent-l    → thin left edge (card hover, left arrow)
             *        shadow-accent-r    → thin right edge (right carousel arrow)
             *        shadow-accent-l-lg → wide left slab (form + pricing cards)
             */
            boxShadow: {
                "accent-b": "0 3px 0 0 #6E5A9E",
                "accent-l": "-3px 0 0 0 #6E5A9E",
                "accent-r": "3px 0 0 0 #6E5A9E",
                "accent-l-lg": "-8px 0 0 0 #6E5A9E",
            },

            /**
             * maxWidth — named max-width values for layout containers.
             * Usage: max-w-prose  → limits line length to ~68 characters (readable)
             *        max-w-content → constrains the page to 1200px wide
             */
            maxWidth: {
                prose: "68ch",
                content: "1200px",
            },
        },
    },
    plugins: [],
};
