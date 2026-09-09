import { defineField, defineType } from "sanity";

// The homepage "Coming up" widget (PRD wireframe §8) — a calendar listing,
// not an article, so it's a separate document type from `post`.
export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "date", title: "Date & time", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "detail",
      title: "Time / price detail",
      description: 'e.g. "10:00–16:00 · Free" — shown after the location.',
      type: "string",
    }),
    defineField({ name: "link", title: "Link (optional)", type: "url" }),
  ],
  orderings: [{ title: "Date, soonest first", name: "dateAsc", by: [{ field: "date", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
