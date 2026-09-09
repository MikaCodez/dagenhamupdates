import type { CategorySlug } from "./categories";

// Sample content only — per dagenham-updates-files/README.md's convention, hard
// facts that would need a real source are left bracketed ([DATE], [SOURCE],
// [TIME], [ATTRIBUTION]). Do not publish these posts as real stories; replace
// this file with the CMS/API layer once that stage starts (see repo root
// README's status table). Copy and categories are lifted from the approved
// mockup (design/canvas/Feed.dc.html) — "Council" items are filed under News,
// since the PRD's five categories (§8.3) don't include a separate Council page.

export interface SourceLogEntry {
  at: string; // ISO datetime
  note: string;
}

export interface Post {
  slug: string;
  title: string;
  category: CategorySlug;
  /** ISO datetime, always with a timezone offset. */
  publishedAt: string;
  /** Set only when the article has been corrected or materially updated. */
  updatedAt?: string;
  standfirst: string;
  /** Short paragraphs; rendered as the article body. */
  body: string[];
  /** True while a story is still being confirmed — renders the "Developing" label. */
  developing: boolean;
  sourceAttribution: string;
  sourcesLog: SourceLogEntry[];
  /** True for the single story leading the homepage (the big lead card). */
  featured?: boolean;
  /** True for the single story pinned in the thin breaking strip at the top
   * of the homepage — a different slot to `featured` (design/canvas/Main.dc.html
   * keeps "Breaking" and "Lead story" as two separate, independently-set spots). */
  breaking?: boolean;
  relatedSlugs: string[];
  /** Travel items only — status is never colour alone (tokens.css), so this
   * always renders next to a plain-word status, never as a bare dot. */
  severity?: "severe" | "minor" | "clear";
}

export const posts: Post[] = [
  {
    slug: "a13-westbound-closed-goresbrook",
    title: "A13 westbound closed near Goresbrook after collision",
    category: "travel",
    publishedAt: "2026-09-09T09:16:00+01:00",
    standfirst:
      "Diversions are in place via Ripple Road, with buses also diverted. Check before you travel.",
    developing: true,
    body: [
      "The A13 westbound is closed near the Goresbrook junction following a collision reported [TIME] this morning. Traffic officers are on scene and a diversion is signed via Ripple Road.",
      "Bus routes serving this stretch are running on diversion; check your operator's live departures before setting out. Eastbound traffic is unaffected but slow-moving as drivers rubberneck past the scene.",
      "There is no confirmed reopening time yet. We will update this page as soon as one is available — check the sources log below for the latest.",
    ],
    sourceAttribution: "[SOURCE] — Transport for London / National Highways",
    sourcesLog: [
      { at: "2026-09-09T09:16:00+01:00", note: "First reported, closure confirmed via [SOURCE]." },
      { at: "2026-09-09T09:32:00+01:00", note: "Added diversion route and bus disruption note." },
    ],
    breaking: true,
    relatedSlugs: ["overnight-roadworks-rainham-road-south", "weather-warning-heavy-rain-overnight"],
    severity: "severe",
  },
  {
    slug: "heathway-public-realm-consultation",
    title: "Consultation opens on Heathway public realm works",
    category: "news",
    publishedAt: "2026-09-09T08:42:00+01:00",
    standfirst:
      "Residents have until [DATE] to comment on proposed changes to paving, seating and loading bays along the parade.",
    developing: false,
    body: [
      "The council has opened a public consultation on proposed changes to the Heathway parade, covering wider paving, new seating and revised loading-bay hours for businesses along the row.",
      "The proposals follow feedback from a previous engagement round on footfall and accessibility. Full drawings and the response form are available via the consultation portal — see the source link below.",
      "Residents and business owners have until [DATE] to submit comments. The council says a summary of responses will be published before any works are scheduled.",
    ],
    sourceAttribution: "[SOURCE] — London Borough of Barking & Dagenham consultation portal",
    sourcesLog: [
      { at: "2026-09-09T08:42:00+01:00", note: "Consultation details confirmed via [SOURCE]." },
    ],
    featured: true,
    relatedSlugs: ["school-streets-scheme-extended", "two-new-units-chequers-corner"],
  },
  {
    slug: "central-library-reopens-refurbishment",
    title: "Central library reopens after refurbishment",
    category: "community",
    publishedAt: "2026-09-09T07:15:00+01:00",
    standfirst:
      "Opening hours return to normal from next week, with the children's section moved to the ground floor.",
    developing: false,
    body: [
      "The central library has reopened its doors after several months of refurbishment works. The most visible change is the children's section, now on the ground floor for easier pushchair access.",
      "Study spaces and the local history archive remain on the upper floor, alongside a new bank of self-service terminals. Staff say the reopening was brought forward from an earlier [DATE] estimate.",
      "Normal opening hours resume from next week; reduced hours apply in the meantime. Check the library service's page for this week's exact times.",
    ],
    sourceAttribution: "[SOURCE] — Barking & Dagenham library service",
    sourcesLog: [
      { at: "2026-09-09T07:15:00+01:00", note: "Confirmed with library service staff on site." },
    ],
    relatedSlugs: ["litter-pick-group-hundredth-saturday", "local-sixth-form-engineering-course"],
  },
  {
    slug: "two-new-units-chequers-corner",
    title: "Two new units let on Chequers Corner parade",
    category: "business",
    publishedAt: "2026-09-09T05:30:00+01:00",
    standfirst:
      "Both are expected to open before the end of the year. Details from the letting agent are limited so far.",
    developing: true,
    body: [
      "Two long-vacant units on the Chequers Corner parade have been let, according to signage that went up this week. Neither incoming tenant has been named publicly yet.",
      "The letting agent has not responded to a request for detail on opening dates or trading type. Both units are expected to open before the end of the year, based on the fit-out notices displayed in the windows.",
      "This is a developing story — we'll update it with confirmed tenant names and opening dates once the letting agent responds, or the businesses themselves confirm.",
    ],
    sourceAttribution: "[SOURCE] — on-site signage; letting agent unconfirmed",
    sourcesLog: [
      { at: "2026-09-09T05:30:00+01:00", note: "First reported from window signage; agent contacted, no reply yet." },
    ],
    relatedSlugs: ["family-bakery-reopens", "heathway-public-realm-consultation"],
  },
  {
    slug: "market-traders-weekend-lineup",
    title: "Market traders confirm weekend line-up",
    category: "events",
    publishedAt: "2026-09-08T17:00:00+01:00",
    standfirst:
      "Around thirty stalls are expected on the Heathway, including a food row along the north end.",
    developing: false,
    body: [
      "Organisers have confirmed around thirty stalls for this weekend's market on the Heathway, with a dedicated food row running along the north end near the clock tower.",
      "Expect the usual mix of produce, crafts and household stalls, plus a handful of first-time traders. Road closures for the market run from [TIME] to [TIME] on both days.",
      "Entry is free. Organisers ask that visitors avoid parking on the closed section from early morning to give traders room to set up.",
    ],
    sourceAttribution: "[SOURCE] — market organisers",
    sourcesLog: [
      { at: "2026-09-08T17:00:00+01:00", note: "Line-up confirmed directly with organisers." },
    ],
    relatedSlugs: ["ward-councillor-drop-in-surgery", "central-library-reopens-refurbishment"],
  },
  {
    slug: "school-streets-scheme-extended",
    title: "School streets scheme extended to two more roads",
    category: "news",
    publishedAt: "2026-09-08T12:00:00+01:00",
    standfirst:
      "Timed restrictions apply at drop-off and pick-up. Residents keep access throughout.",
    developing: false,
    body: [
      "The council's school streets scheme is being extended to two more roads from [DATE], adding to the existing restrictions introduced last year.",
      "Timed camera-enforced restrictions will apply during morning drop-off and afternoon pick-up only. Residents on the affected roads keep vehicle access throughout the day.",
      "The council says the extension follows requests from both schools' governing bodies, citing safety concerns at the school gates.",
    ],
    sourceAttribution: "[SOURCE] — London Borough of Barking & Dagenham",
    sourcesLog: [
      { at: "2026-09-08T12:00:00+01:00", note: "Confirmed via council announcement." },
    ],
    relatedSlugs: ["heathway-public-realm-consultation", "weather-warning-heavy-rain-overnight"],
  },
  {
    slug: "overnight-roadworks-rainham-road-south",
    title: "Overnight roadworks on Rainham Road South",
    category: "travel",
    publishedAt: "2026-09-07T22:00:00+01:00",
    standfirst:
      "Lane closures until [DATE], with a signed diversion for northbound traffic.",
    developing: false,
    body: [
      "Overnight lane closures are in place on Rainham Road South while utility works continue, with a signed diversion for northbound traffic between [TIME] and [TIME].",
      "Works are scheduled to run until [DATE], weather and access permitting. Daytime access is unaffected.",
      "Residents on side roads along the works section should allow extra time for deliveries and collections during the closure hours.",
    ],
    sourceAttribution: "[SOURCE] — utility works notice",
    sourcesLog: [
      { at: "2026-09-07T22:00:00+01:00", note: "Works notice confirmed via [SOURCE]." },
    ],
    relatedSlugs: ["a13-westbound-closed-goresbrook", "weather-warning-heavy-rain-overnight"],
    severity: "minor",
  },
  {
    slug: "litter-pick-group-hundredth-saturday",
    title: "Litter-pick group marks its hundredth Saturday",
    category: "community",
    publishedAt: "2026-09-07T10:00:00+01:00",
    standfirst:
      "The group has covered most of the ward since starting on the park perimeter.",
    developing: false,
    body: [
      "A local litter-picking group marked its hundredth consecutive Saturday session this weekend, having started on the park perimeter before expanding across most of the ward.",
      "Organisers say turnout has grown from a handful of volunteers to a regular group of over twenty, with donated equipment now stored at a local community centre.",
      "New volunteers are welcome — sessions run most Saturday mornings; check the group's social channels for the meeting point.",
    ],
    sourceAttribution: "[SOURCE] — group organisers",
    sourcesLog: [
      { at: "2026-09-07T10:00:00+01:00", note: "Confirmed directly with group organisers." },
    ],
    relatedSlugs: ["central-library-reopens-refurbishment", "local-sixth-form-engineering-course"],
  },
  {
    slug: "ward-councillor-drop-in-surgery",
    title: "Ward councillor drop-in surgery moved to the library",
    category: "events",
    publishedAt: "2026-09-06T09:00:00+01:00",
    standfirst: "The meeting room is on the first floor. No appointment needed.",
    developing: false,
    body: [
      "The ward's regular councillor drop-in surgery has moved venue, now taking place in the meeting room on the library's first floor rather than the previous community hall booking.",
      "The surgery remains no-appointment-needed and covers the same range of local issues — housing, planning queries, and general casework.",
      "Dates continue on the same monthly pattern; check the council's website for the next session.",
    ],
    sourceAttribution: "[SOURCE] — ward councillor's office",
    sourcesLog: [
      { at: "2026-09-06T09:00:00+01:00", note: "Venue change confirmed with councillor's office." },
    ],
    relatedSlugs: ["market-traders-weekend-lineup", "heathway-public-realm-consultation"],
  },
  {
    slug: "weather-warning-heavy-rain-overnight",
    title: "Weather warning issued for heavy rain overnight",
    category: "news",
    publishedAt: "2026-09-06T18:00:00+01:00",
    standfirst:
      "Surface water is likely on low-lying roads. Check official forecasts before travelling.",
    developing: false,
    body: [
      "A weather warning covering the borough has been issued for heavy rain overnight, with surface water likely on low-lying roads and possible disruption to the morning commute.",
      "This is a fast-changing situation — always check the official Met Office warning and your transport operator's live status before travelling, rather than relying on this page alone.",
      "We'll flag any local road or rail impact separately in Travel as it's confirmed.",
    ],
    sourceAttribution: "[SOURCE] — Met Office",
    sourcesLog: [
      { at: "2026-09-06T18:00:00+01:00", note: "Warning confirmed via Met Office." },
    ],
    relatedSlugs: ["a13-westbound-closed-goresbrook", "overnight-roadworks-rainham-road-south"],
  },
  {
    slug: "family-bakery-reopens",
    title: "Family bakery reopens after six months of works",
    category: "business",
    publishedAt: "2026-09-05T09:00:00+01:00",
    standfirst: "Trading hours are back to normal from next week.",
    developing: false,
    body: [
      "A long-running family bakery has reopened after six months of internal works, extending its seating area and adding a small counter for hot drinks.",
      "The owners say the closure ran longer than planned due to supply delays on fittings. Trading hours return to normal from next week; reduced hours apply until then.",
      "Regulars will recognise the original counter, kept from the shop's previous fit-out.",
    ],
    sourceAttribution: "[SOURCE] — business owners",
    sourcesLog: [
      { at: "2026-09-05T09:00:00+01:00", note: "Confirmed directly with the owners." },
    ],
    relatedSlugs: ["two-new-units-chequers-corner", "heathway-public-realm-consultation"],
  },
  {
    slug: "local-sixth-form-engineering-course",
    title: "Local sixth form opens applications for engineering course",
    category: "community",
    publishedAt: "2026-09-04T09:00:00+01:00",
    standfirst: "Places are open to residents across the borough from [DATE].",
    developing: false,
    body: [
      "A local sixth form has opened applications for a new engineering course, with places open to residents across the borough rather than restricted to the school's existing intake.",
      "The course is being run in partnership with a local employer, offering a placement element alongside the classroom syllabus. Applications open from [DATE], with a stated cap on places.",
      "Full entry requirements and the application form are available directly from the sixth form's admissions office.",
    ],
    sourceAttribution: "[SOURCE] — sixth form admissions office",
    sourcesLog: [
      { at: "2026-09-04T09:00:00+01:00", note: "Confirmed with the sixth form's admissions office." },
    ],
    relatedSlugs: ["central-library-reopens-refurbishment", "litter-pick-group-hundredth-saturday"],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return posts
    .filter((p) => p.category === category)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getLatestPosts(limit?: number): Post[] {
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getFeaturedPost(): Post {
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getBreakingPost(): Post | undefined {
  return posts.find((p) => p.breaking);
}

export function getRelatedPosts(post: Post): Post[] {
  return post.relatedSlugs
    .map((slug) => getPost(slug))
    .filter((p): p is Post => Boolean(p));
}
