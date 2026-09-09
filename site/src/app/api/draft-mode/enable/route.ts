import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";
import { readToken } from "@/sanity/env";

// Studio's Presentation tool calls this (previewUrl.previewMode.enable in
// studio-dagenhamupdates/sanity.config.ts) to turn on Draft Mode before
// loading the site in its preview iframe.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
