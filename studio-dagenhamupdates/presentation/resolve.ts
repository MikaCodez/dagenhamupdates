import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

// Tells Presentation where each document type appears on the live site, so
// Structure <-> Presentation navigation and the preview iframe's URL bar work.
export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled post", href: `/articles/${doc?.slug}` },
          { title: "Latest updates", href: "/latest-updates" },
        ],
      }),
    }),
    category: defineLocations({
      select: { name: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || "Untitled category", href: `/category/${doc?.slug}` }],
      }),
    }),
  },
};
