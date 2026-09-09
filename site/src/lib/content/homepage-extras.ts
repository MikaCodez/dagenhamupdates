// Two homepage widgets that are shaped differently from an article (a
// calendar listing, a one-line travel status) and so don't fit the Post
// model in posts.ts. Same sample-content caveat applies: this is the
// fallback used when Sanity isn't configured (src/sanity/queries.ts) — the
// shapes here match the `event`/`travelAlert` Sanity schemas.

export interface CalendarEvent {
  title: string;
  date: string; // ISO datetime — day/date labels are derived from this, not stored separately
  location: string;
  detail: string; // time · price, shown after the location
}

export const upcomingEvents: CalendarEvent[] = [
  {
    title: "Autumn community market",
    date: "2026-09-12T10:00:00+01:00",
    location: "Dagenham Heathway",
    detail: "10:00–16:00 · Free",
  },
  {
    title: "Family sports session in the park",
    date: "2026-09-13T11:00:00+01:00",
    location: "Central Park",
    detail: "11:00–14:00 · Free",
  },
  {
    title: "Ward councillor drop-in surgery",
    date: "2026-09-16T18:00:00+01:00",
    location: "Library meeting room",
    detail: "18:00–19:30",
  },
];

export interface TravelAlert {
  severity: "severe" | "minor" | "clear";
  title: string;
  detail: string;
  /** Set when the alert corresponds to a full article. */
  articleSlug?: string;
}

export const travelAlerts: TravelAlert[] = [
  {
    severity: "severe",
    title: "A13 westbound closed near Goresbrook",
    detail: "Diversions via Ripple Road",
    articleSlug: "a13-westbound-closed-goresbrook",
  },
  {
    severity: "minor",
    title: "Minor delays on services towards Fenchurch Street",
    detail: "Earlier signalling fault",
  },
  {
    severity: "minor",
    title: "Overnight roadworks on Rainham Road South",
    detail: "Lane closures until [DATE]",
    articleSlug: "overnight-roadworks-rainham-road-south",
  },
  {
    severity: "clear",
    title: "Underground services running normally",
    detail: "No reported disruption",
  },
];
