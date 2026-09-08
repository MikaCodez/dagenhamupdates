# Dagenham Updates

An independent local news and updates platform for **Barking & Dagenham**, reaching into
surrounding parts of East London and Essex where relevant. The site covers local news,
travel disruption, community notices, events and public-interest stories — and acts as the
home base, archive and trust layer for the brand's social presence.

> Dagenham Updates is an independent local information service. Where possible, we verify
> content before publishing. For urgent situations, always check official sources.
> Not affiliated with the London Borough of Barking & Dagenham.

---

## Status

Design phase. The MVP screens are drawn and the direction is agreed; no application code yet.

| Stage | State |
| --- | --- |
| PRD | ✅ `docs/PRD.md` |
| Design direction | ✅ Borough Broadsheet — see `docs/design-decisions.md` |
| MVP screens | ✅ `design/canvas/` |
| Design tokens | ✅ `design/tokens/tokens.css` |
| Build | ⬜ not started |
| CMS | ⬜ not started |

---

## What's in here

```
docs/
  PRD.md                  Full v1.0 product requirements + homepage wireframe
  design-decisions.md     The three directions explored, why A won, what's still open
design/
  canvas/                 The design source — one .dc.html file per artboard
    Main.dc.html          Homepage, desktop (1440)
    HomeMobile.dc.html    Homepage, mobile (390) — working nav drawer
    Article.dc.html       Article page — share row, sources log, related
    Feed.dc.html          Latest Updates — working category filters
    Tip.dc.html           Submit a Tip — working type selector, anonymous toggle, submit
    Direction*.dc.html    The three style directions, kept for reference
    canvas.json           Artboard layout, pages and annotations
  tokens/
    tokens.css            Colour, type, space and component tokens — the handoff contract
```

The `.dc.html` files are Design Component artboards: self-contained HTML that renders on a
pan-and-zoom canvas. They open in any browser on their own, and the interactive ones
(`Feed`, `Tip`, `HomeMobile`, `Article`) respond to clicks. Treat them as the visual spec —
not as production markup to lift wholesale.

---

## Design system at a glance

**Direction: Borough Broadsheet.** Editorial serif on warm paper, thin rules, red held back
for urgency only. The point is credibility: this should read as local journalism, not as a
blog with a news category.

| | |
| --- | --- |
| Display | Newsreader, weight 500, tight leading |
| UI | Archivo, 600–800 for labels |
| Paper | `#FAF7F1` · Panel `#F2EBDF` |
| Ink | `#16130F` · Muted `#6B6357` |
| Accent | `#B3121D` — breaking, primary CTAs, active nav. Nothing else. |
| Corners | Square. Nothing in this system is rounded. |

Rules that matter:

- **The accent is for urgency.** If everything is red, nothing is.
- **One section-head pattern:** 3px ink rule, 13px/800/0.14em uppercase label, optional link right.
- **Three button sizes**, listed in `tokens.css`. No fourth.
- **12px is the floor** for anything read as a sentence. Uppercase labels may go to 11px.
- **44px minimum touch target** on mobile.
- **Status is never colour alone** — the travel dots always carry a word.

---

## Trust and safety

Section 13 of the PRD is not decoration; it is designed into the screens:

- A **"How we source"** box on the homepage rail and the article rail — the trust statement
  is visible where people read, not buried on About.
- **Unconfirmed / Developing** labels, text-led so they read without colour.
- A **timestamped sources log** on the article page, so corrections are visible rather
  than silent, plus a standing correction prompt.
- A **non-affiliation line** in every footer.
- On the tip form: what happens next, what not to send, and "in an emergency, contact the
  emergency services first — not us."

---

## Content in the mockups

Everything in the artboards is **sample copy for layout**. Hard facts are deliberately left
as `[DATE]`, `[SOURCE]`, `[TIME]`, `[STATUS]`, `[ATTRIBUTION]`, `[PHOTO CREDIT]` tokens.

Do not ship a screen with a bracket still in it, and do not treat any headline in these
files as a real story.

---

## Build order

From PRD §21, unchanged:

1. Homepage
2. Category structure
3. Latest updates page
4. Article template
5. About page
6. Contact / submit a tip
7. Privacy policy and terms
8. Social links
9. SEO setup
10. Analytics

---

## Licence

See `LICENSE`.
