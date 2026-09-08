# Design decisions

A running record of what was decided, and why. Add to the bottom; don't rewrite history.

---

## 2026-09-07 — Visual direction: Borough Broadsheet

Three directions were drawn as side-by-side artboards showing the same homepage content at
the same scale, so the comparison was about aesthetics rather than layout. They are kept in
`design/canvas/Direction*.dc.html`.

### A — Borough Broadsheet · **chosen**

Editorial serif (Newsreader) on warm paper `#FAF7F1`, thin rules, a red accent reserved for
urgent items. Compact left-aligned masthead on interior pages, large centred masthead on the
homepage.

**Why.** The PRD's number-one risk is losing trust (§19), and its number-one product
principle after speed is trustworthiness (§5). Typography is the fastest, cheapest signal of
editorial credibility available — it does work that a disclaimer cannot. It also
differentiates: nothing else covering the borough looks like this.

**Cost accepted.** More traditional than the alternatives, and it has to work to stay quick
to scan on a phone. Mitigated by a mobile layout that leads with the breaking card rather
than the hero, and by keeping the serif for headlines only — all UI text is sans.

### B — Civic Modern · not taken

Navy `#10344F`, soft cards, geometric sans, amber CTA. Calm, legible, the easiest of the
three to extend, and the most forgiving of inconsistent content.

**Why not.** Closest to a stock news theme. It reads as "a borough service" rather than "an
independent voice", which is the wrong signal for a brand whose whole position is
independence.

### C — Street Signal · not taken

Condensed caps on near-black, hazard amber, timestamped live feed, travel alerts as hero.

**Why not.** Loudest of the three; risks reading tabloid, which cuts directly against the
trust goal. **Worth revisiting for social post templates** — it is the most Instagram-native
of the three, and the brand needs a visual language for the feed as well as the site.

---

## 2026-09-07 — Additions beyond the wireframe

Three things were added that the PRD implies but the wireframe did not list. Each is a
deliberate choice, not decoration:

1. **"How we source" box** on the homepage rail and the article rail. PRD §13.2 asks for
   editorial disclaimers; putting them only on About means the people who most need them
   never see them.
2. **Non-affiliation line** in every footer. The moment the site starts reposting council
   notices, some readers will assume it *is* the council. Say otherwise before that happens.
3. **Timestamped sources log** on the article page (PRD §8.4's optional "updated at",
   pushed further). Corrections that are visible are a trust asset; corrections that
   silently rewrite the page are a liability.

---

## 2026-09-07 — Interaction decisions

- **Feed filtering is client-side chips**, not separate URLs, on the Latest Updates page.
  Category *pages* still exist as their own routes for SEO (PRD §8.3, §12.2) — the chips are
  a browse convenience on the archive, not a replacement for them.
- **Empty state is a prompt, not a dead end.** Filtering to a category with nothing in it
  offers "send us something for this one". Early on, most categories will be thin; that is
  a recruitment opportunity rather than an embarrassment.
- **Anonymous submission removes the name and email fields** rather than greying them out,
  and says plainly what is lost (we cannot come back to you for more detail). PRD §8.6
  lists this as optional; it belongs in v1 given the kind of tips a local outlet gets.
- **Mobile nav is a push-down drawer**, not an overlay. Simpler, and it never traps a
  scroll position.

---

## Open questions

- **Brand assets.** No logo yet — the masthead is set type. If a mark is coming, it changes
  the header on every screen.
- **Social handles.** Not decided, so the artboards show "Instagram" / "X" as labels rather
  than handles.
- **Trending / Most read** (wireframe §6) is not built. It needs analytics that do not exist
  yet; the wireframe already says skip in v1. Revisit once there is traffic.
- **Newsletter** appears on the homepage as a capture field only. No provider chosen, and
  PRD §6.2 puts automation out of MVP scope.
- **Accent colour** is red by default. Blue, amber and green alternatives are available as a
  control on the homepage artboard — worth trying before this is locked into the build.
