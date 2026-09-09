import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { readToken, apiVersion } from "./env";

// The Live Content API: real-time updates to published content, plus the
// draft-aware perspective/stega Visual Editing needs. Constructed
// unconditionally (harmless even when Sanity isn't configured — see
// client.ts) but only actually used where callers already check
// isSanityConfigured (queries.ts) or draft mode (layout.tsx).
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion }),
  serverToken: readToken,
  browserToken: readToken,
});
