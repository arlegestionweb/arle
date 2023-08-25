// sanity/studioConfig.ts
import { sanityConfig } from './config';
import { defineConfig } from "sanity";


export const sanityAdminConfig = {
  ...sanityConfig,
  title: "Manejador de Contenidos de Arlé",
  basePath: "/admin",
};

export const studioConfig = defineConfig(sanityAdminConfig);