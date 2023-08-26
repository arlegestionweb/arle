import { defineType, defineField } from "sanity";

export const sobreNosotrosSchema = defineType({
  name: "sobreNosotros",
  title: "Sobre Nosotros",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
    }),
  ],
});
