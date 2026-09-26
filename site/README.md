# Dagenham Updates — site

Next.js (App Router, TypeScript) build of the MVP screens from
`dagenham-updates-files/design/canvas/`, following the PRD's build order
(`dagenham-updates-files/docs/PRD.md` §21).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build` produces a static-first production build with 60s ISR on
content pages (instant with the revalidate webhook below).

## What's here

| Route | Covers |
| --- | --- |
| `/` | Homepage — breaking strip, lead story, latest updates, categories, community spotlight, events & travel, about + tip CTA, social/newsletter |
| `/latest-updates` | Full archive with client-side category chips + search (PRD §8.2) |
| `/category/[news\|travel\|community\|events\|business]` | Category pages (PRD §8.3) |
| `/articles/[slug]` | Article template — sources & updates log, share, related, JSON-LD `NewsArticle` (PRD §8.4) |
| `/about` | PRD §8.5 |
| `/contact` | Submit-a-tip form — type selector, anonymous toggle, optional attachment (PRD §8.6) |
| `/privacy-policy`, `/terms` | Draft legal copy — **not legal advice, have it reviewed** |
| `/sitemap.xml`, `/robots.txt` | PRD §12 |

The CMS admin UI (Studio) is a separate sibling project, not a route in this
app — see below.

## Design tokens

`src/app/globals.css` imports `dagenham-updates-files/design/tokens/tokens.css`
directly — that file is the single source of truth (per
`dagenham-updates-files/design/README.md`), not copied in. `next.config.ts`
widens Turbopack's project root to the repo root so that cross-directory
import resolves; if you move `site/` relative to `dagenham-updates-files/`,
update both that import path and the `turbopack.root` in `next.config.ts`.

Fonts (Newsreader, Archivo) are self-hosted via `next/font/google` in
`src/app/layout.tsx` instead of the mockups' Google Fonts `<link>` — same
faces and fallback stacks, no runtime request.

## Content: Sanity CMS

The site's content — posts, categories, events, travel alerts, tip
submissions, site settings — is backed by [Sanity](https://sanity.io).
**Nothing here is required to run the site**: every content query in
`src/sanity/queries.ts` falls back to the sample data in `src/lib/content/*.ts`
when Sanity isn't configured, so `npm run dev`/`npm run build` work on their
own before you've touched any of this.

The admin UI (Studio) is a **separate sibling project**, `studio-dagenhamupdates/`
next to this one (not a route in this app) — that's Sanity's own recommended
layout, and keeps the Studio's fairly heavy dependency tree out of the
Next.js app entirely. It shares this project's schema conceptually but is an
independent codebase: edit schema in `studio-dagenhamupdates/schemaTypes/`,
not here.

### Current status in this repo

A real project already exists (**project ID `y30qsdcf`**, dataset
`production`, org member: malcolm.wiredu@gmail.com) and is seeded with the
same sample content the fallback data has. Locally, `site/.env.local` (not
committed — see `.gitignore`) already points at it with a scoped Editor
token (writes) and a scoped Viewer token (reads/live/preview — see "Live
Content API" below), so `npm run dev` here is reading live from that project
right now, not the fallback. To edit content: `cd ../studio-dagenhamupdates
&& npm run dev` (http://localhost:3333) and log in with the same account.

### Setting up a fresh environment (a new clone, a deploy target, CI)

Anywhere that doesn't already have `site/.env.local` — a teammate's machine,
a hosting provider's env vars — needs these set (see `.env.example`):

1. `NEXT_PUBLIC_SANITY_PROJECT_ID=y30qsdcf`, `NEXT_PUBLIC_SANITY_DATASET=production`
   — the project above already exists, no need to create another one.
2. An API token with **Editor** access: sanity.io/manage → dagenhamupdates →
   API → Tokens → Add API token. Set it as `SANITY_API_WRITE_TOKEN`.
3. A **separate** token with **Viewer** (read-only) access, set as
   `SANITY_API_READ_TOKEN`. Powers `src/sanity/live.ts` — and unlike the
   write token, this one is sent to the browser (`defineLive`'s
   `browserToken`), which is exactly why it must be Viewer-scoped, never the
   Editor one.
4. `npm run migrate:sanity` is safe to re-run from anywhere with a write
   token — it re-syncs the same documents rather than duplicating them, so
   it's there if the dataset ever needs re-seeding, not just for first setup.

(Creating an entirely new project from scratch is only relevant if you
deliberately want a second, separate dataset — e.g. a staging environment.
That needs `npx sanity@latest init` from a terminal with its own browser
login, inside a new sibling folder matching the `studio-dagenhamupdates/`
pattern.)

From here, editing in Studio and hitting **Publish** updates the live site
within 60 seconds (the `revalidate = 60` on each content page) — or instantly
if you also set up the webhook below.

### CORS

The Next.js dev origin (`http://localhost:3210`) is already added to the
project's CORS origins (`npx sanity cors list` from `studio-dagenhamupdates/`
to check). Add your production URL the same way before deploying:
`npx sanity cors add https://your-domain.com --credentials`.

### TypeGen

`npm run typegen` in `studio-dagenhamupdates/` (schema extract +
`sanity typegen generate`) generates `site/sanity.types.ts` from the schema
and every `defineQuery(...)` in `src/sanity/queries.ts` — that's why each
query there is a standalone, fully inline string rather than composed from a
shared fragment: the extractor needs a statically-analyzable literal per
query. `queries.ts` imports the generated `*_QUERY_RESULT` types directly
(no hand-maintained "raw row" interfaces) and maps them into the app's view
types (`src/sanity/types.ts`). **Re-run `npm run typegen` after editing a
query or a schema field** — nothing regenerates it automatically outside of
`sanity dev`/`sanity build`'s own watch mode in the Studio. `sanity.types.ts`
is committed (not gitignored) — see `typegen.md` in the `sanity-best-practices`
skill for the commit-vs-CI-generate tradeoff if that changes.

### Instant updates (optional)

Set `SANITY_REVALIDATE_SECRET` in `.env.local`/your host's env vars to any
random string, then in sanity.io/manage → your project → API → Webhooks, add
one pointing at `https://<your-domain>/api/revalidate?secret=<that string>`,
triggered on Create/Update/Delete for all document types. See
`src/app/api/revalidate/route.ts`. (Largely superseded by the Live Content
API below for reads, but still the mechanism behind `sitemap.xml`, `robots.txt`
and anything else that isn't a `sanityFetch` call.)

### Live Content API & Visual Editing

`src/sanity/live.ts` sets up `defineLive` (`next-sanity/live`) — every read in
`queries.ts` goes through the `sanityFetch` it returns rather than a plain
`client.fetch`, which gets real-time updates to published content for free
(no polling, no webhook needed for that part) and is what Visual Editing
builds on. `<SanityLive />` renders in the root layout (`src/app/layout.tsx`).

**Visual Editing** (click-to-edit from Studio): `studio-dagenhamupdates/`'s
Presentation tool (`sanity.config.ts` + `presentation/resolve.ts`, which maps
`post`/`category` documents to their live URLs) loads the site in an iframe;
clicking a hero, headline or standfirst jumps straight to that field in
Studio. It works by turning on Next.js Draft Mode
(`src/app/api/draft-mode/enable/route.ts`), which renders
`<VisualEditing />` and a `<DisableDraftMode />` "Exit preview" link
(bottom-right, only outside the Presentation iframe) in the root layout.
`SANITY_STUDIO_PREVIEW_ORIGIN` in the Studio's env overrides the preview
target for a deployed app (defaults to `http://localhost:3210`).

**Stega (content source maps)** is how Presentation knows which field a bit
of text came from: invisible characters get embedded in string values while
in draft mode. The **golden rule**, applied throughout `queries.ts`: fields
used for *logic* — `slug` (routing), `category` (lookups, `Post/Category`
comparisons), `severity` (the `Record<Severity, number>` sort) — are run
through `stegaClean()` before leaving the mapping layer; fields that are only
ever *displayed* (title, standfirst, body, sourceAttribution) are left alone,
because cleaning them would silently break click-to-edit on exactly the text
someone would want to click. `generateMetadata` in the article and category
pages explicitly pass `stega: false` — the one place invisible characters
must never appear, since they'd land in `<head>` and corrupt SEO. See the
`sanity-best-practices` skill's `visual-editing.md` for the full model.

**Testing note**: `<SanityLive />` holds an open SSE connection, so anything
scripted against this app (Playwright, etc.) must not wait on
`networkidle` — it never resolves. Use `waitUntil: "load"` plus an explicit
`waitForSelector`/`waitForURL` instead.

### Editorial model, briefly

- **Posts** carry `featured` (the homepage lead story — exactly one at a
  time), `breaking` (the thin urgent strip — exactly one at a time) and
  `spotlight` (up to 3, for the Community spotlight row) as booleans editors
  toggle directly — this is PRD §15's "featured post control."
- **Category** pages/nav are structurally fixed (the five from PRD §8.3) —
  editing a category's name/description in Studio updates its page copy, but
  the five routes and the nav themselves aren't CMS-driven (adding a sixth
  category needs a code change, not just a new Studio document).
- **Submission inbox** (PRD §15): `/contact`'s tip form writes a `submission`
  document per send (`src/app/api/tip/route.ts`) — triage them from Studio's
  "Tip submissions" list. Optionally set `RESEND_API_KEY` /
  `TIP_NOTIFICATION_EMAIL` / `TIP_FROM_EMAIL` too, for an email the moment one
  arrives, from [resend.com](https://resend.com).
- **Images**: `featuredImage` on a post renders via Sanity's image CDN
  (`next/image` + `@sanity/image-url`) wherever the design has an image slot
  (lead story, article hero, community spotlight); posts without one keep the
  existing placeholder box.
- **Body** is Sanity's block content (rich text) rendered via
  `src/components/ArticleBody.tsx` (`@portabletext/react`) — the local
  fallback data's plain paragraph strings are wrapped into the same shape
  (`paragraphsToPortableText` in `src/sanity/types.ts`) so the article
  template only has one rendering path.
- **Scheduling** (PRD §14): not wired — `publishedAt` can be set to a future
  date in Studio, but nothing currently hides a not-yet-due post from the
  site. Add a `publishedAt <= now()` filter to the relevant GROQ queries in
  `src/sanity/queries.ts` if you want real schedule-ahead behaviour, or use
  Sanity's official [Scheduled Publishing](https://www.sanity.io/docs/scheduling)
  plugin.

## Stubbed — needs wiring before launch

- **Tip form** email/CMS delivery is real once the env vars above are set;
  without them it still validates and logs server-side only (same as before).
  The optional attachment uploads to Sanity's asset store when configured.
- **Newsletter** — live against a self-hosted [listmonk](https://listmonk.app)
  (`../listmonk/`, see its README) via `/api/newsletter`, double opt-in.
  Sends real confirmation emails once `../listmonk`'s SMTP points at a real
  provider instead of the bundled Mailpit dev-catcher — see
  `../listmonk/README.md`'s "SMTP" section before launch.
- **Social links** fall back to `#` until `NEXT_PUBLIC_INSTAGRAM_URL` and
  `NEXT_PUBLIC_X_URL` are set — handles aren't decided yet either.
- **Analytics**: GA4 wiring in `src/components/Analytics.tsx` is inert until
  `NEXT_PUBLIC_GA_ID` is set to a real measurement ID.
- **`NEXT_PUBLIC_SITE_URL`**: falls back to `http://localhost:3000`; set it to
  the real domain before relying on `sitemap.xml`/canonical URLs/Open Graph
  tags in production.
- **Linting**: `npm run lint` is wired to a script but ESLint itself was never
  installed — pre-existing gap, not introduced by the CMS work. Add
  `eslint`/`eslint-config-next` when you want it enforced.

## Not built yet

Analytics reporting itself (beyond the GA4 script tag), post scheduling (see
above), and anything from PRD §17 (Phase 2 growth features). User accounts /
roles beyond Sanity's own project-member permissions are out of scope per PRD
§6.2.

Presentation queries (`usePresentationQuery`, block-level re-fetching for
faster editing) and drag-and-drop reordering aren't wired up — not needed at
this content model's size (no page-builder arrays), but worth knowing if the
schema grows one. See the `sanity-best-practices` skill's `nextjs.md` §8–9.
