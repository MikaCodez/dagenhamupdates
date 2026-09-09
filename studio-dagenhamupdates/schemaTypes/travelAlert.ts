import { defineField, defineType } from "sanity";

// Short status-line items in the homepage "Travel & alerts" panel — lighter
// weight than a full post, optionally pointing at one for more detail.
export const travelAlert = defineType({
  name: "travelAlert",
  title: "Travel alert",
  type: "document",
  fields: [
    defineField({
      name: "severity",
      title: "Severity",
      type: "string",
      options: {
        list: [
          { title: "Severe (closed)", value: "severe" },
          { title: "Minor (delays)", value: "minor" },
          { title: "Clear", value: "clear" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "detail", title: "Detail", type: "string" }),
    defineField({ name: "relatedPost", title: "Related post (optional)", type: "reference", to: [{ type: "post" }] }),
    defineField({
      name: "active",
      title: "Active",
      description: "Turn off rather than delete once resolved, so it drops off the homepage.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "updatedAt", title: "Updated at", type: "datetime", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "severity" },
  },
});
