// Central place for Sanity's environment configuration. Deliberately
// tolerant of missing env vars: nothing here throws, so `npm run dev` /
// `npm run build` keep working with the sample content in
// src/lib/content/*.ts until a real Sanity project is wired up (see
// site/README.md's "Content: Sanity CMS" section for the setup steps).

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

// Read token — only needed for previewing drafts or a private dataset.
// Server-side only; never expose this with a NEXT_PUBLIC_ prefix.
export const readToken = process.env.SANITY_API_READ_TOKEN;

// Write token — only needed by scripts/migrate-to-sanity.ts and the tip
// submission handler. Server-side only.
export const writeToken = process.env.SANITY_API_WRITE_TOKEN;

export const isSanityConfigured = Boolean(projectId);
