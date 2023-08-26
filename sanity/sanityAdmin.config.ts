import { defineConfig } from "sanity";
// import {visionTool} from "@sanity/vision"
import {deskTool} from "sanity/desk"
import structure from "./structure"
import { schemaTypes } from "./schemas/schemaTypes";


export const sanityAdminConfig = {
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: "production",
  useCdn: process.env.NODE_ENV === "production",
  title: "Arle CMS",
  apiVersion: "2021-10-21",
  basePath: "/admin",
  plugins: [
    deskTool({
      structure
    }),
  ],
  schema: {
    types: schemaTypes,
  },
};

export const studioConfig = defineConfig(sanityAdminConfig);
