import { homeSchema } from "./schemas/pages/homeSchema";
import { siteSettings } from "./schemas/siteSettings";

export const schemaTypes = [
  siteSettings,

  // pages
  homeSchema,
]