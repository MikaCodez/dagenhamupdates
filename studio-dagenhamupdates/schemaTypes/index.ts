import type { SchemaTypeDefinition } from "sanity";
import { category } from "./category";
import { post } from "./post";
import { event } from "./event";
import { travelAlert } from "./travelAlert";
import { submission } from "./submission";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  category,
  event,
  travelAlert,
  submission,
  siteSettings,
];
