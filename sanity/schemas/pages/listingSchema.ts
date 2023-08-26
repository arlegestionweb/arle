import { defineType } from "sanity";
import bannersSchema from "../objects/bannersSchema";

export const listingSchema = defineType({
  name: "listing",
  title: "Listing",
  type: "document",
  fields: [
    bannersSchema
  ],
});
