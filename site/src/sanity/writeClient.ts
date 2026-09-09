import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, writeToken } from "./env.ts";

// Separate from client.ts's read client — this one needs a write token and
// must never be imported into a Client Component. No "server-only" guard
// here (unlike queries.ts) because scripts/migrate-to-sanity.ts also imports
// this file as a plain Node script, outside Next's server compilation, where
// that guard would throw.
export const writeClient = createClient({
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  token: writeToken,
  useCdn: false,
});
