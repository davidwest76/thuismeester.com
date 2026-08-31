import { ImageResponse } from "next/og";
import { REGION_NOTE, REGIONS } from "@/lib/site";

/**
 * opengraph-image.tsx — the preview card shown when thuismeester.com is
 * shared on WhatsApp, LinkedIn, Facebook, etc.
 *
 * Next.js picks this file up by convention: it renders the JSX below to a
 * 1200x630 PNG at build time and adds the og:image / twitter:image tags on
 * every page automatically. Styling is inline because the renderer (Satori)
 * supports a subset of CSS, not the site's Tailwind classes; colours are
 * the brand tokens from tailwind.config.js.
 */

export const alt = `Thuismeester — Jouw onafhankelijke thuisadviseur voor ${REGION_NOTE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLOR = {
    green: "#2C4A3E",
    beigeLight: "#FAF8F4",
    beige: "#F0EBE1",
};

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLOR.green,
                    color: COLOR.beigeLight,
                    textAlign: "center",
                }}
            >
                {/* The gable-house mark, same shapes as src/app/icon.svg */}
                <svg width="120" height="120" viewBox="0 0 100 100">
                    <path
                        d="M50 20 L86 52 L76 52 L76 82 L24 82 L24 52 L14 52 Z"
                        fill={COLOR.beigeLight}
                    />
                    <rect x="43" y="60" width="14" height="22" fill={COLOR.green} />
                </svg>
                <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 24, letterSpacing: "-2px" }}>
                    Thuismeester
                </div>
                <div style={{ display: "flex", fontSize: 40, marginTop: 20, color: COLOR.beige }}>
                    Jouw onafhankelijke thuisadviseur
                </div>
                <div
                    style={{
                        display: "flex",
                        fontSize: 28,
                        marginTop: 44,
                        padding: "12px 32px",
                        border: `2px solid ${COLOR.beige}`,
                        borderRadius: 999,
                        color: COLOR.beige,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                    }}
                >
                    {REGIONS.join("  ·  ")}
                </div>
            </div>
        ),
        { ...size }
    );
}
