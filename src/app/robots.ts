import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.ts — served as /robots.txt by Next.js.
 * Everything is crawlable except the API routes (forms and webhooks have
 * no business being indexed or crawled), and the sitemap is announced so
 * search engines find all pages without guessing.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/api/",
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
