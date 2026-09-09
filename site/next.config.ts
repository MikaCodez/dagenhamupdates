import type { NextConfig } from "next";
import path from "node:path";

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
};

export default nextConfig;
