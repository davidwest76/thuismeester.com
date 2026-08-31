import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /**
     * headers — security headers sent with every response.
     *
     * These are browser-side hardening for the whole site (pages and API
     * routes alike). Each one closes a specific, well-known attack avenue;
     * none of them affect how the site looks or works for normal visitors.
     * A full Content-Security-Policy is deliberately NOT set here: a wrong
     * CSP silently breaks Next.js scripts and inline styles, so introducing
     * one needs dedicated testing rather than a drive-by addition.
     */
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        // Stops browsers from "sniffing" a response into a
                        // different content type than declared — e.g. treating
                        // an uploaded/linked file as executable JavaScript.
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        // Prevents the site from being loaded inside an iframe
                        // on another domain, which is the basis of clickjacking
                        // (overlaying our real forms with invisible decoys).
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        // Sends only the origin (not full URLs, which can leak
                        // internal paths) when a visitor follows an external link.
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        // The site uses none of these browser features; declaring
                        // that means even injected third-party script can't
                        // silently request camera/microphone/location access.
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;