import { defineField, defineType } from "sanity";

// Singleton — see sanity/structure.ts, which pins this to one editable
// document instead of a list. Covers the bits of PRD §15 ("page editing")
// that are global rather than per-post: social links, for now.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "xUrl", title: "X URL", type: "url" }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
