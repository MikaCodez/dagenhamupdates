import type { NextConfig } from "next";
import path from "node:path";

// Studio's Presentation tool (studio-dagenhamupdates/sanity.config.ts)
// deliberately iframes this site cross-origin for live preview — see
// next-sanity's draft-mode route checking `sec-fetch-site === "cross-site"`.
// That means a blanket "deny all framing" header would break Visual
// Editing, so `frame-ancestors` names the Studio's origin explicitly
// instead of using X-Frame-Options (which can't express "these origins,
// not others"). Override in production once the Studio has a real deployed
// URL — this default only covers local `sanity dev` (port 3333).
const studioOrigin = process.env.SANITY_STUDIO_ORIGIN || "http://localhost:3333";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Turbopack only resolves files inside its root (defaults to this
  // package's directory) — widen it to the repo root so globals.css can
  // import design/tokens/tokens.css directly as the single source of truth,
  // instead of copying or symlinking it in.
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      {
        // Everything except the Studio's own preview iframe route — that
        // one needs the relaxed frame-ancestors above and nothing else here
        // conflicts with it anyway.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Only takes effect over HTTPS — harmless to send in local http dev.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Content-Security-Policy", value: `frame-ancestors 'self' ${studioOrigin}` },
        ],
      },
    ];
  },
};

export default nextConfig;
