import { defineType, defineField } from "sanity";
import bannersSchema from "../objects/bannersSchema";

export const marcasSchema = defineType({
  name: "marca",
  title: "Marcas",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logotipo",
      title: "Logotipo",
      type: "object",
      // validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
        }),
      ],
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
    bannersSchema,
  ],
  preview: {
    select: {
      title: "titulo",
      media: "logotipo.imagen",
    },
    prepare(selection) {
      const { title, media } = selection;
      if (!title) return { title: "Sin título" };
      if (!media) return { title };
      return {
        title,
        media,
      };
    },
  },
});
