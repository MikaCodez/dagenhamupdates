// Central place for anything that changes per environment or isn't decided
// yet (docs/design-decisions.md → "Open questions"). Real values go in
// environment variables at deploy time; the fallbacks below are what render
// until then.

export const siteConfig = {
  name: "Dagenham Updates",
  tagline: "Independent local updates",
  description:
    "Local news and updates for Barking & Dagenham and surrounding parts of East London and Essex — news, travel, community notices, events and public-interest stories.",
  // Falls back to localhost so metadata/sitemap generation works in dev;
  // set NEXT_PUBLIC_SITE_URL to the real domain at deploy time.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_GB",

  // Social handles aren't decided yet (design-decisions.md, open questions).
  // Leave the env vars unset and these render as inert "#" links rather than
  // guessing a handle.
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#",
    x: process.env.NEXT_PUBLIC_X_URL ?? "#",
  },

  // Analytics: unset by default. Set NEXT_PUBLIC_GA_ID to a real GA4
  // measurement ID (G-XXXXXXX) to turn on pageview tracking — see
  // src/components/Analytics.tsx.
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
