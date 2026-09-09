import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** Returns undefined for a missing/empty image field so callers can fall
 * back to the existing placeholder box (FeaturedCard, ArticleCard, etc.). */
export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!source) return undefined;
  return builder.image(source).auto("format").fit("max");
}
