// The five categories from PRD §8.3 and the approved nav (design/canvas/Main.dc.html).
// "Council" and "Alerts" appear as extra filter chips in the Feed mockup, but the PRD
// only calls for five category pages — council notices are filed under News here.

export type CategorySlug =
  | "news"
  | "travel"
  | "community"
  | "events"
  | "business";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Shown on the homepage tile and as the category page's standfirst. Written to
   * target the local search intent PRD §12.2 calls out. */
  description: string;
}

export const categories: Category[] = [
  {
    slug: "news",
    name: "News",
    description:
      "Dagenham news and Barking & Dagenham updates — council decisions, safety notices and the stories affecting the borough.",
  },
  {
    slug: "travel",
    name: "Travel",
    description:
      "Road closures in Barking & Dagenham, roadworks, bus and rail disruption — checked against official transport sources.",
  },
  {
    slug: "community",
    name: "Community",
    description:
      "Community notices for Dagenham — volunteering, local groups, appeals and neighbourhood wins.",
  },
  {
    slug: "events",
    name: "Events",
    description:
      "Local events in Dagenham — markets, fetes, school and charity events, and council surgeries.",
  },
  {
    slug: "business",
    name: "Business",
    description:
      "Openings, closures and changes on the borough's parades and high streets.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
