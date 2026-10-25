# Dagenham Updates

**Independent local news and useful updates for Barking & Dagenham, with relevant coverage from surrounding East London and Essex.**

Dagenham Updates is a local information platform designed to help residents stay informed about what is happening in their area. It brings news, travel disruption, community notices, events and other public-interest updates together in one accessible place.

The website is intended to be the home base and searchable archive for the brand’s social presence: a place to find fuller context, revisit earlier updates and understand where information came from.

> Dagenham Updates is an independent local information service. Where possible, we verify content before publishing. For urgent situations, always check official sources. We are not affiliated with the London Borough of Barking & Dagenham.

---

## Why it exists

Local information is often scattered across social media posts, public notices and official websites. Dagenham Updates aims to make useful local information easier to find and understand by bringing it together in a clear, consistent format.

The platform is intended to help:

- **Residents** keep up with local developments and practical updates.
- **Commuters** find relevant travel and disruption information.
- **Community groups and local organisations** share notices and events.
- **Readers arriving from social media** find context, sources and an archive of updates.

Dagenham Updates is an independent publisher, not an emergency service or a substitute for official announcements.

---

## What the site covers

- Local news and public-interest stories
- Travel disruption and transport updates
- Community notices and local events
- Useful information affecting Barking & Dagenham and nearby areas

Coverage is focused on the borough, with relevant stories from surrounding parts of East London and Essex where appropriate.

---

## Project status

The project is in the **build phase**. The MVP screens and design direction are documented, and the Next.js site is being built against a live Sanity CMS project.

| Area | Status | Details |
| --- | --- | --- |
| Product requirements | Complete | [`docs/PRD.md`](docs/PRD.md) |
| Design direction | Complete | [`docs/design-decisions.md`](docs/design-decisions.md) |
| MVP screens | Complete | [`design/canvas/`](design/canvas/) |
| Design tokens | Complete | [`design/tokens/tokens.css`](design/tokens/tokens.css) |
| Website | In progress | Next.js app in `../site/` |
| Content management | Live | Sanity Studio in `../studio-dagenhamupdates/` |

---

## How it works

The project is split into three main parts:

- **Website:** The Next.js application in `../site/` presents the publication to readers.
- **Content management:** The Sanity Studio in `../studio-dagenhamupdates/` is used to manage editorial content.
- **Design documentation:** This folder contains product requirements, design decisions and visual references for the build.

For implementation details, local setup and available scripts, see [`../site/README.md`](../site/README.md).

---

## Trust, sourcing and corrections

Trust is a core part of the product, not an afterthought. The design and editorial approach aim to make it easier for readers to assess information and find context.

The site is designed to support:

- Clear labels for developing or unconfirmed information
- Source information alongside stories where available
- Visible timestamps and update history
- A correction prompt so readers can flag potential errors
- A clear statement that Dagenham Updates is not affiliated with the borough council

Information can change. For urgent or safety-critical situations, readers should consult the relevant official service directly.

---

## Design direction

The visual direction is **Borough Broadsheet**: editorial typography, warm paper tones, restrained use of colour and clear rules. It is intended to feel like a credible local publication rather than a generic blog.

Key design principles:

- The red accent is reserved for urgency and primary actions.
- Status is conveyed with words, not colour alone.
- Text remains readable on mobile, with touch-friendly controls.
- Layouts prioritise clarity, context and a consistent reading experience.

The design decisions are documented in [`docs/design-decisions.md`](docs/design-decisions.md), and the tokens are in [`design/tokens/tokens.css`](design/tokens/tokens.css).

---

## Repository contents

```text
docs/
  PRD.md                  Product requirements and homepage wireframe
  design-decisions.md     Design directions and decisions

design/
  canvas/                 Self-contained HTML design artboards
  tokens/
    tokens.css            Design system tokens
```

The `.dc.html` files in `design/canvas/` are visual references for the product. Some are interactive and respond to clicks. They are not production components and should not be copied wholesale into the website.

### Important note about mockup content

Headlines, stories and images in the design artboards are sample content used to show layouts. They are not proof of real events or current reporting. Placeholder tokens such as `[DATE]`, `[SOURCE]`, `[TIME]`, `[STATUS]`, `[ATTRIBUTION]` and `[PHOTO CREDIT]` must not appear in published content.

---

## Running and deploying the website

The production application lives in `../site/`. Follow its README for the current prerequisites, environment variables, development commands and build scripts:

- [Website setup and implementation notes](../site/README.md)

The site uses Sanity for content management. Configure the required Sanity values in the deployment environment according to the website documentation; do not commit secrets or API tokens to the repository.

---

## Planned MVP build order

The product requirements define this implementation order:

1. Homepage
2. Category structure
3. Latest updates page
4. Article template
5. About page
6. Contact and submit-a-tip flow
7. Privacy policy and terms
8. Social links
9. SEO setup
10. Analytics

---

## Safety note

Dagenham Updates is an independent local information service. It is not an emergency response channel. In an emergency, contact the appropriate emergency services first. For urgent travel, safety or service information, check the relevant official source.

---

## Further information

- [Product requirements](docs/PRD.md)
- [Design decisions](docs/design-decisions.md)
- [Design artboards](design/canvas/)
- [Website README](../site/README.md)
