# Security review — 2026-09-26

Scope: `site/` (Next.js app), `studio-dagenhamupdates/` (Sanity Studio),
`listmonk/` (Docker Compose), and the repo root. Manual review of every
public-facing code path (API routes, forms, env/secret handling, GROQ
queries) plus `npm audit` across all three Node projects.

No secrets were found committed to git at any point in the repo's history
— `.env.local` and `listmonk/.env` are both correctly gitignored and were
never tracked.

## Fixed in this pass

| # | Issue | File(s) | Fix |
|---|---|---|---|
| 1 | **Unrestricted file upload** on `/api/tip` — the form's `accept="image/*,.pdf"` is a client-side hint only; the route itself accepted any file, any size, and uploaded it straight to Sanity's asset store. | `src/app/api/tip/route.ts` | Server-side MIME allowlist (images + PDF) and an 8MB size cap, checked before the Sanity upload call. |
| 2 | **No rate limiting** on either public write endpoint — `/api/tip` and `/api/newsletter` could be flooded, running up Sanity writes, Resend email sends, and listmonk subscription attempts for free. | `src/lib/rate-limit.ts` (new), both routes | Per-IP sliding-window limit (5 requests / 10 min) before any other work happens. **Caveat**: in-memory, so it only works correctly on a single-instance deployment — see the file's own comment for what to swap in before a multi-instance/serverless deploy. |
| 3 | **No input length caps** — `subject`/`message` on a tip had no upper bound. | `src/app/api/tip/route.ts` | 8,000-character cap on both fields. |
| 4 | **No email format validation** on `/api/newsletter` — anything non-empty was forwarded to listmonk. | `src/app/api/newsletter/route.ts` | Basic format check + 320-char length cap before proxying. |
| 5 | **Unescaped JSON-LD** — `JSON.stringify(jsonLd)` fed straight into `dangerouslySetInnerHTML` doesn't escape `<`, so a field containing `</script><script>…` would break out of the tag and inject markup. Currently only trusted-editor content reaches this (post title/standfirst/category), so not exploitable today, but it's a free fix for a well-known class of bug. | `src/app/(site)/articles/[slug]/page.tsx` | Escape `<` to `<` before injecting. |
| 6 | **Timing-unsafe secret comparison** on `/api/revalidate` (`provided !== secret`), plus no length check before comparing. | `src/app/api/revalidate/route.ts` | `crypto.timingSafeEqual` with an explicit length check first. |
| 7 | **No security response headers anywhere** — no clickjacking protection, no MIME-sniffing protection, no HSTS, no Permissions-Policy. Because Sanity's Presentation tool deliberately iframes this site cross-origin for live preview, a blanket `X-Frame-Options: DENY` would have broken Visual Editing — this needed `frame-ancestors` naming the Studio's origin specifically, not a blunt deny-all. | `site/next.config.ts`, new `SANITY_STUDIO_ORIGIN` env var | Added `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, and a scoped `Content-Security-Policy: frame-ancestors`. Verified Visual Editing's iframe embed still works (frame-ancestors allows the Studio's origin) and confirmed via `curl` that all five headers are present on live responses. |
| 8 | **Unused stray root-level `package.json`/`package-lock.json`/`node_modules`** at the repo root — leftover from an early misplaced `npm install`, confirmed (via full-repo grep) that nothing in `site/` or `studio-dagenhamupdates/` imports from it. Not a vulnerability by itself, but it's dead attack surface (its own `npm audit` findings, no one maintaining it) for zero benefit. | repo root | Removed (`git rm`). |

All of the above are covered by the new test suite where it makes sense to
(`site/TESTING.md`) — the rate limit, file-type/size checks, and the
revalidate secret comparison all have passing Vitest tests exercising the
exact edge cases above.

## Flagged, not changed — needs your call

| # | Issue | Why it wasn't just fixed |
|---|---|---|
| 9 | **`npm audit`: 14 known vulnerabilities (3 high)** in `site/`, `studio-dagenhamupdates/`, and the (now-removed) root project — all transitive, via `next-sanity` → `sanity`'s CLI/build tooling (`@sanity/cli`, `@sanity/workbench-cli`, `@module-federation/vite`) pulling in old `js-yaml` (prototype pollution, DoS), `smol-toml` (DoS), and `adm-zip` (symlink-following zip extraction). These are dev/build-time tooling dependencies, not code that runs in the deployed app, so the practical exposure is low — but `npm audit fix --force` upgrades `next-sanity` to a new major version, which is a breaking change worth its own testing pass rather than folding into a security cleanup. |
| 10 | **listmonk's admin app binds `0.0.0.0:9000`** (all interfaces) rather than `127.0.0.1`, unlike its own Postgres service in the same compose file (correctly bound to `127.0.0.1:5432`). Low risk for local dev behind a firewall, but worth tightening to `127.0.0.1:9000` for local use, and to a real reverse-proxy+TLS setup before it's ever reachable from outside this machine — `listmonk/README.md`'s "Deploying for real" section already covers the production path; this is about the local dev binding specifically. |
| 11 | **`site/package.json`'s `lint` script (`eslint .`) has no ESLint installed** — not a security issue, but worth knowing before relying on `npm run lint` for anything: it currently fails with `eslint: command not found`. Unrelated to this review's scope, surfaced here because it directly affects how much you can trust "no lint errors" as a signal going forward. |

## Reviewed and found sound (no change needed)

- **GROQ injection**: every dynamic query value (`$slug`, etc.) goes through
  `defineQuery`'s parameterized queries — nothing string-interpolates user
  input into a query.
- **Sanity token scoping**: write token (Editor) is server-only, never sent
  to the browser; read token (Viewer) is the one exposed via `defineLive`'s
  `browserToken`, which is the correct, least-privilege split.
- **Draft Mode / Visual Editing auth**: `/api/draft-mode/enable` uses
  `next-sanity`'s `defineEnableDraftMode`, which validates a signed preview
  secret (`@sanity/preview-url-secret`) before enabling anything — not an
  open door.
- **`src/sanity/writeClient.ts` deliberately omits the `server-only` import
  guard** that `queries.ts` has. This is intentional and already documented
  in the file itself (scripts import it as plain Node code, where that
  guard would throw) — not an oversight, just worth knowing it's a
  conscious tradeoff if you're auditing for guard-rail gaps.
- **PortableText rendering** (`ArticleBody.tsx`) goes through
  `@portabletext/react`'s component tree, not raw HTML — no injection
  surface there.
