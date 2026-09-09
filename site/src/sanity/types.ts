import type { CategorySlug } from "@/lib/content/categories";

export interface PortableTextBlock {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

export interface SourceLogEntry {
  at: string;
  note: string;
}

export type Severity = "severe" | "minor" | "clear";

/** The shape used everywhere a post is shown as a card (feed rows, rail,
 * related, community spotlight). */
export interface PostSummary {
  slug: string;
  title: string;
  category: CategorySlug;
  publishedAt: string;
  /** Carried on the summary too (not just the detail) so sitemap.ts can use
   * it for `lastModified` without a separate query. */
  updatedAt?: string;
  standfirst: string;
  developing: boolean;
  severity?: Severity;
  imageUrl?: string;
  imageAlt?: string;
  /** Optional so the lightweight summary projection can carry it for the
   * homepage lead card (FeaturedCard) without a full detail fetch. */
  sourceAttribution?: string;
}

/** The full article — everything a summary has, plus what only the article
 * template needs. */
export interface PostDetail extends PostSummary {
  body: PortableTextBlock[];
  sourceAttribution: string;
  sourcesLog: SourceLogEntry[];
  relatedPosts: PostSummary[];
  imageCredit?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface CalendarEvent {
  title: string;
  date: string; // ISO
  location?: string;
  detail?: string;
  link?: string;
}

export interface TravelAlertView {
  severity: Severity;
  title: string;
  detail?: string;
  relatedPostSlug?: string;
}

export interface CategoryView {
  slug: CategorySlug;
  name: string;
  description: string;
}

/** Wraps plain paragraph strings (the local sample content's shape) as
 * minimal Portable Text blocks, so the article template only ever renders
 * one shape regardless of whether content came from Sanity or the fallback
 * data — see queries.ts. */
export function paragraphsToPortableText(paragraphs: string[]): PortableTextBlock[] {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `fallback-${i}`,
    style: "normal",
    children: [{ _type: "span", _key: `fallback-${i}-span`, text }],
  }));
}
