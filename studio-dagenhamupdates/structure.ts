import type { StructureResolver } from "sanity/structure";

// Groups the sidebar into what an editor actually does day to day — post
// management, the tip inbox, and the smaller supporting lists — and pins
// Site settings as a single editable document rather than a list of one.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Posts")
        .child(S.documentTypeList("post").title("Posts").defaultOrdering([{ field: "publishedAt", direction: "desc" }])),
      S.listItem()
        .title("Tip submissions")
        .child(
          S.documentTypeList("submission")
            .title("Tip submissions")
            .defaultOrdering([{ field: "receivedAt", direction: "desc" }])
        ),
      S.divider(),
      S.listItem().title("Categories").child(S.documentTypeList("category").title("Categories")),
      S.listItem().title("Events").child(S.documentTypeList("event").title("Events")),
      S.listItem().title("Travel alerts").child(S.documentTypeList("travelAlert").title("Travel alerts")),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
