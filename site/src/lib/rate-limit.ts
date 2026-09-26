// No "server-only" guard here (same reasoning as src/sanity/writeClient.ts):
// it would also throw when this module is loaded outside Next's server
// compilation — e.g. by the route-handler tests, which import route.ts
// directly. This only ever holds an in-memory counter, not a secret, so
// nothing leaks if it were ever accidentally imported into a Client
// Component — it just wouldn't do anything useful there.

// A minimal in-memory, per-key sliding-window limiter for the public write
// endpoints (/api/tip, /api/newsletter). This is deliberately simple —
// good enough to blunt casual spam/bot abuse on a single-instance deployment
// (a plain Node/VPS process, which is how this project runs today — see
// listmonk/README.md's "Deploying for real"). It is NOT sufficient once the
// site runs as multiple serverless instances (Vercel, etc.): each instance
// would keep its own counters, so the effective limit multiplies by however
// many instances handle a burst. If/when this deploys to a multi-instance
// platform, replace the Map below with a shared store (Upstash Redis is the
// usual choice — @upstash/ratelimit is a drop-in) rather than assuming this
// keeps working as-is.
const hits = new Map<string, number[]>();

// Sweep old entries occasionally so this doesn't grow unbounded under
// sustained traffic. Not time-critical — just keeps memory bounded.
let lastSweep = Date.now();
function sweep(windowMs: number) {
  const now = Date.now();
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  for (const [key, timestamps] of hits) {
    const kept = timestamps.filter((t) => now - t < windowMs);
    if (kept.length === 0) hits.delete(key);
    else hits.set(key, kept);
  }
}

/** Returns true if `key` is still within `limit` requests per `windowMs`,
 * and records this call as one of them. Call once per incoming request. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  sweep(windowMs);
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) {
    hits.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  hits.set(key, timestamps);
  return true;
}

/** Best-effort client identifier from proxy headers. Falls back to a
 * constant key (a single shared bucket) when nothing is present — e.g.
 * local dev with no reverse proxy — rather than throwing or skipping the
 * limit entirely. */
export function clientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
