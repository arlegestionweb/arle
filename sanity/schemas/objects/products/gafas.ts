import { defineField } from "sanity";

export const monturaSchema = defineField({
  name: "montura",
  title: "Montura",
  type: "object",
  fields: [
    defineField({
      name: "forma",
      title: "Forma de la Montura",
      type: "string",
    }),
    defineField({
      name: "material",
      title: "Material del Marco",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color del Marco",
      type: "string",
    }),
    defineField({
      name: "colorVarilla",
      title: "Color de la Varilla",
      type: "string",
    }),
  ],
});

export const lenteSchema = defineField({
  name: "lente",
  title: "Lente",
  type: "object",
  fields: [
    defineField({
      name: "lente",
      title: "Lente",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color del Lente",
      type: "string",
    }),
    defineField({
      name: "material",
      title: "Material del Lente",
      type: "string",
    }),
    defineField({
      name: "tipo",
      title: "Tipo de Lente",
      type: "string",
    }),
  ],
});


