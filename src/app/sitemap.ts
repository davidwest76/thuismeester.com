import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * sitemap.ts — served as /sitemap.xml by Next.js.
 * One entry per public page. The homepage and signup page carry the highest
 * priority: getting found and getting signups is what this phase is about.
 * Add a line here whenever a new page is added under src/app/.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const pages: { path: string; priority: number }[] = [
        { path: "", priority: 1.0 },
        { path: "/aanmelden", priority: 0.9 },
        { path: "/diensten", priority: 0.8 },
        { path: "/hoe-werkt-het", priority: 0.8 },
        { path: "/over-thuismeester", priority: 0.7 },
        { path: "/veelgestelde-vragen", priority: 0.7 },
        { path: "/contact", priority: 0.6 },
        { path: "/privacybeleid", priority: 0.3 },
    ];

    return pages.map(({ path, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority,
    }));
}
