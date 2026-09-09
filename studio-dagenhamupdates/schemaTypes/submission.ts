import { defineField, defineType } from "sanity";

// The tip-form inbox (PRD §15's "submission inbox or form responses").
// Written by src/app/api/tip/route.ts — editors triage from here in Studio.
export const submission = defineType({
  name: "submission",
  title: "Tip submission",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Reviewed", value: "reviewed" },
          { title: "Actioned", value: "actioned" },
          { title: "Declined", value: "declined" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["News tip", "Event listing", "Community notice", "Business update", "Correction"],
      },
    }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4 }),
    defineField({ name: "anonymous", title: "Sent anonymously", type: "boolean" }),
    defineField({ name: "name", title: "Name", type: "string", hidden: ({ document }) => Boolean(document?.anonymous) }),
    defineField({ name: "email", title: "Email", type: "string", hidden: ({ document }) => Boolean(document?.anonymous) }),
    defineField({ name: "attachment", title: "Attachment", type: "file" }),
    defineField({ name: "receivedAt", title: "Received at", type: "datetime" }),
  ],
  orderings: [{ title: "Received, newest first", name: "receivedAtDesc", by: [{ field: "receivedAt", direction: "desc" }] }],
  preview: {
    select: { title: "subject", subtitle: "status", type: "type" },
    prepare({ title, subtitle, type }) {
      return { title: title || "(no subject)", subtitle: `${type ?? ""} · ${subtitle ?? ""}` };
    },
  },
});
