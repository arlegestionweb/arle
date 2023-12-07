import { defineField } from "sanity";

export const contentSchema = defineField({
  name: "content",
  title: "Sección",
  type: "object",
  fields: [
    defineField({
      name: "on",
      title: "Usar seccion?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      hidden: ({ parent }) => !parent?.on,
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      hidden: ({ parent }) => !parent?.on,
    }),
    // imageObjectSchema,
    defineField({
      name: "imagenOVideo",
      title: "Imagen o Video",
      type: "boolean",
      hidden: ({ parent }) => !parent?.on,
      
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      type: "imagenObject",
      hidden: ({ parent }) => !parent?.on || parent?.imagenOVideo,
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
      hidden: ({ parent }) => !parent?.on || !parent?.imagenOVideo,
    }),
  ],
});