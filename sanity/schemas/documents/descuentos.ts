import { defineType, defineField } from "sanity";

export const descuentosSchema = defineType({
  name: "descuentos",
  title: "Descuentos",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
    }),
  ],
});
