import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { resolve } from "./presentation/resolve";

export default defineConfig({
  name: "default",
  title: "Dagenham Updates",

  projectId: "y30qsdcf",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        // SANITY_STUDIO_PREVIEW_ORIGIN overrides this for a deployed app —
        // set it in this project's env before deploying the Studio.
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || "http://localhost:3210",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
