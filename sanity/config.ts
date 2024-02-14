// sanity/config.ts
export const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID || "",
  dataset: "production",
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2023-05-03",
};
