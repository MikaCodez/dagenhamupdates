import { defineField, defineType } from "sanity";

// The five categories from PRD §8.3 — see site/src/lib/content/categories.ts
// for the matching fallback shape and the note on why "Council"/"Alerts"
// aren't full categories here.
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Shown on the homepage tile and as the category page's standfirst.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
