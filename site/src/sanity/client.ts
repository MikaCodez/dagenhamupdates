import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, readToken } from "./env";

// Only ever called from query functions that already checked
// isSanityConfigured (see queries.ts) — the "not-configured" fallback id
// just keeps this constructible (and Studio bootable) before a real project
// exists.
export const client = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  token: readToken,
  useCdn: !readToken,
  perspective: "published",
});
