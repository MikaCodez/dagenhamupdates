# Dagenham Updates — Studio

The Sanity Studio (CMS admin UI) for [../site](../site) — a separate project
by design (Sanity's recommended layout for pairing a Studio with a Next.js
app), not a route inside the Next.js app itself.

Project ID `y30qsdcf`, dataset `production` (see `sanity.config.ts` /
`sanity.cli.ts`) — the same project `../site` reads from.

## Run it

```bash
npm install
npm run dev      # http://localhost:3333
```

Log in with the account that's a member of the `dagenhamupdates` project
(sanity.io/manage → dagenhamupdates → Members to check/invite others).

## Schema

`schemaTypes/` — `post`, `category`, `event`, `travelAlert`, `submission`
(the tip inbox), `siteSettings`. `structure.ts` groups the sidebar into
Posts / Tip submissions / Categories / Events / Travel alerts / Site settings
rather than the default alphabetical document-type list.

See `../site/README.md`'s "Content: Sanity CMS" section for the editorial
model (what `featured`/`breaking`/`spotlight` do, how the tip inbox and
images work, etc.) — that's documented from the app's side since that's
where it's consumed, but it applies here too.

## After changing the schema

Run `npm run typegen` — extracts the schema and regenerates
`../site/sanity.types.ts` from it plus every query in
`../site/src/sanity/queries.ts`. `../site`'s type-check will catch anything
that no longer matches (a field renamed here but not remapped there, etc.).

## CORS

`../site`'s dev origin is registered already (`npx sanity cors list`). Add a
production URL before deploying the app: `npx sanity cors add
https://your-domain.com --credentials`.

## Presentation (Visual Editing)

`sanity.config.ts` wires `presentationTool`, using `presentation/resolve.ts`
to map `post`/`category` documents to their live URLs so Structure <->
Presentation navigation and the preview iframe work. `previewUrl.origin`
points at `../site` — `http://localhost:3210` by default, overridden by
`SANITY_STUDIO_PREVIEW_ORIGIN` for a deployed app (set it before deploying
this Studio if `../site` isn't on localhost). Opening a document here and
clicking "Open in Presentation" (or the Presentation tab in the sidebar)
loads the live site in-place and turns on Draft Mode there via
`../site`'s `/api/draft-mode/enable` route — see `../site/README.md`'s
"Live Content API & Visual Editing" section for how that's wired on the app
side.

## Deploying

`npm run deploy` publishes this Studio to `https://dagenhamupdates.sanity.studio`
(or whatever hostname you choose on first deploy) — a hosted URL editors can
use without running anything locally. Requires being logged in
(`npx sanity login` if needed) and a member of the project with deploy
permission.
