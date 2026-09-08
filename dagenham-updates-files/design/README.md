# Design source

The screens live here as **Design Component artboards** — one `.dc.html` file per screen,
laid out on a single pan-and-zoom canvas by `canvas/canvas.json`.

## Opening them

Each `.dc.html` file is a standalone HTML document. Open one directly in a browser to see
that screen on its own. Fonts load from Google Fonts, so you need a connection.

`canvas.json` is only meaningful to the canvas host — it holds artboard positions, frame
sizes, the two pages (`Screens` and `Directions (archive)`) and the annotation notes. It
does not affect how an individual file renders.

## The screens

| File | Frame | Interactive |
| --- | --- | --- |
| `Main.dc.html` | 1440 × 3100 | Accent colour control |
| `HomeMobile.dc.html` | 390 × 3480 | Nav drawer toggle |
| `Article.dc.html` | 1440 × 3000 | Copy link |
| `Feed.dc.html` | 1440 × 3050 | Category filters, empty state |
| `Tip.dc.html` | 1440 × 2000 | Type selector, anonymous toggle, submit → confirmation |
| `DirectionBroadsheet.dc.html` | 520 × 1220 | — chosen direction, kept for reference |
| `DirectionCivic.dc.html` | 520 × 1220 | — not taken |
| `DirectionSignal.dc.html` | 520 × 1220 | — not taken |

Frame heights matter: content taller than its frame is clipped on the canvas. If you add a
section, raise the height in `canvas.json` and in that file's `$preview` to match.

## Format notes, for anyone editing these

- Keep `<script src="./support.js"></script>` in the head exactly as it is. The canvas host
  replaces it with an inline runtime; removing or inlining it breaks the file.
- `{{ hole }}` is a **dotted lookup only** — never an expression, a ternary or a call.
  Anything conditional is precomputed in `renderVals()` and bound as a plain value.
- `<sc-for list="{{ xs }}" as="x">` repeats; `<sc-if value="{{ flag }}">` branches. Always
  set the `hint-placeholder-*` attributes, and make them describe the *default* state —
  a hint that contradicts the initial state renders an incoherent static preview.
- Styling is inline on purpose, so every element stays directly editable on the canvas.
  `tokens/tokens.css` is the source of truth for the values; the artboards are where they
  are applied.
- `box-sizing: border-box` is set on each file's outer wrapper and **does not inherit** — a
  fixed-width child that also has padding or a border renders wider than its stated width.

## Handing this to a build

Use `tokens/tokens.css` as the contract, not the artboard markup. The artboards are a visual
specification: they show hierarchy, spacing, states and copy tone. They are not accessible
production markup — interactive elements are styled `<div>`s with click handlers, and only
the article page carries a real heading element.

The build should add, at minimum: real semantic elements and heading hierarchy, `<button>`
for anything clickable, labelled form controls, visible focus states, and `alt` text on
every image.
