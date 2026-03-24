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
        // --- Brand color palette ---
        // Primary: dark forest green — trust, calm, premium
        green: {
          50:  "#f2f6f4",
          100: "#d9e8e1",
          200: "#b3d0c4",
          300: "#8cb9a6",
          400: "#5e9a80",
          500: "#3d7a60",
          600: "#2c5a47",
          700: "#1e3d30",
          800: "#152c22",
          900: "#0d1a14",
          DEFAULT: "#2C4A3E",   // primary dark green
          light: "#3D6B5C",     // slightly lighter accent
        },
        // Warm beige tones — welcoming, premium, domestic
        beige: {
          50:  "#fdfcf9",
          light: "#FAF8F4",
          DEFAULT: "#F0EBE1",
          dark: "#E4DBCc",
        },
        // Neutral greys
        stone: {
          light: "#F5F4F1",
          DEFAULT: "#9B9E97",
          dark: "#5A5E57",
        },
        // Deep text colour
        ink: {
          DEFAULT: "#1A2018",
          soft: "#3D4438",
          muted: "#6B7266",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)",   { lineHeight: "1.1" }],
        "display-lg": ["clamp(2rem,  4vw, 3rem)",    { lineHeight: "1.15" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)",{ lineHeight: "1.2" }],
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        prose: "68ch",
        content: "1200px",
      },
    },
  },
  plugins: [],
};
