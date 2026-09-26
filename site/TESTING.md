# Testing

Two suites, two different jobs:

| | Vitest (`npm test`) | Playwright (`npm run test:e2e`) |
|---|---|---|
| Tests | pure functions, content helpers, API route handlers, one component | real pages in a real browser |
| Speed | ~1s, no server needed | ~5-10s, starts `next dev` for you |
| Where | `src/**/*.test.{ts,tsx}`, next to the file it tests | `e2e/*.spec.ts` |
| Config | `vitest.config.mts` | `playwright.config.ts` |

## Running

```bash
npm test              # unit + route tests, once
npm run test:watch    # same, re-runs on file change
npm run test:e2e      # e2e, headless
npm run test:e2e:ui   # e2e, with Playwright's interactive UI/trace viewer
```

First time running e2e on a machine: `npx playwright install chromium`
(downloads a real browser build; not an npm dependency).

`test:e2e` starts its own `next dev -p 3210` if nothing is already listening
there, and reuses one that's already running otherwise (`playwright.config.ts`'s
`webServer.reuseExistingServer`) — so it's safe to run while you already have
the dev server up.

## What's covered, and why these particular things

**Unit (`src/lib/format.test.ts`, `src/lib/content/posts.test.ts`,
`src/sanity/types.test.ts`)** — the fallback content module
(`src/lib/content/*.ts`) is what the whole site renders from whenever
`NEXT_PUBLIC_SANITY_PROJECT_ID` isn't set (see `src/sanity/queries.ts`'s
`isSanityConfigured` branches), so it's tested directly rather than only
indirectly through pages. `format.ts` is tested because it's the one place
date/time bugs would be easy to introduce silently — see its own comment on
why this project treats timestamps as a trust feature, not decoration.

**API routes (`src/app/api/*/route.test.ts`)** — a Next.js Route Handler is
just an async function taking a `Request` and returning a `Response`, so
these call `POST()` directly with a constructed `Request` rather than going
through a running server. External services (Sanity's `writeClient`,
listmonk via `fetch`, Resend) are mocked with `vi.mock`/`vi.stubGlobal` —
nothing here ever makes a real network call, so it's safe to run repeatedly
without polluting real data (real Sanity submissions, real listmonk
subscribers, real emails).

If you add a mock keyed to a shared module-level variable (see
`src/lib/rate-limit.ts`'s per-IP counters), give each test its own fake IP
via `x-forwarded-for` unless you're deliberately testing the limiter itself
— otherwise unrelated tests silently exhaust each other's budget. See the
comment above `tipRequest()`/`newsletterRequest()` in those test files.

**One component test (`NewsletterForm.test.tsx`)** — as a template for
adding more: put `// @vitest-environment jsdom` as the first line of a
`.test.tsx` file that needs to render something, `vi.stubGlobal("fetch",
...)` instead of a real network call, and `vi.unstubAllGlobals()` after
(or move it into an `afterEach`). `TipForm.tsx`'s status transitions and
attachment field are reasonable next candidates if this gets extended.

**E2E (`e2e/*.spec.ts`)** — deliberately asserts on structure ("a heading
exists and links to `/articles/*`"), not on specific post titles/content —
the CMS content changes as real posts get published, and a suite that
breaks every time someone edits a headline in Sanity Studio stops getting
maintained. Two things worth knowing:

- `e2e/homepage.spec.ts` and `e2e/contact.spec.ts` use
  `page.route(...)` to intercept `/api/newsletter` and `/api/tip` rather
  than letting the form actually submit — `.env.local` points at real
  Sanity and listmonk instances, and a submission that actually went
  through would create a real "submission" document and a real (if
  Mailpit-caught) subscription attempt on every test run. Follow the same
  pattern for any new test that exercises a form — don't let it hit the
  real backend.
- The homepage test opens the mobile "Menu" drawer before asserting on nav
  links, since under 900px the nav is collapsed behind it
  (`src/app/globals.css`'s `.du-nav-toggle` breakpoint) — see its comment
  if you add a test that touches nav on both viewports.

## What isn't covered (and is a reasonable next step, not an oversight)

- **Sanity-backed queries** (`src/sanity/queries.ts`'s `sanityFetch` path) —
  only the local-fallback branches are unit-tested. Exercising the real
  GROQ queries would need either a live test dataset or mocking
  `next-sanity`'s client, and neither is set up yet.
- **Visual Editing / Draft Mode** — `src/components/DisableDraftMode.tsx`,
  the `/api/draft-mode/*` routes. These need an actual Sanity Studio
  session to test meaningfully; not worth faking.
- **Visual regression** — nothing screenshots pages and diffs them against
  a baseline. Worth adding (`expect(page).toHaveScreenshot()`) if the design
  starts drifting from `dagenham-updates-files/design/tokens/tokens.css`
  without anyone noticing.
- **listmonk / Mailpit themselves** — treated as external services and
  mocked at the boundary (`/api/newsletter`'s `fetch` call), not tested
  directly. `listmonk/README.md` covers running and verifying that stack
  on its own.
