import { defineType, defineField } from "sanity";
import bannersSchema from "../objects/bannersSchema";
import { imageObjectSchema } from "../objects/image";

export const marcasSchema = defineType({
  name: "marca",
  title: "Marca",
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
      fields: [
        imageObjectSchema
      ]
    }),
    defineField({
      name: "slogan",
      title: "Slogan",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "string",
    }),
    bannersSchema,
  ],
});
