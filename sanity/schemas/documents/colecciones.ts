import { defineType, defineField } from "sanity";

export const coleccionesSchema = defineType({
  name: "colecciones",
  title: "Colecciones",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
    }),
  ],
});
