import { defineField } from "sanity";

export const precioSchema = defineField({
  name: "precio",
  title: "Precio",
  type: "string",
});

export const generoSchema = defineField({
  name: "genero",
  title: "Género",
  type: "string",
  options: {
    list: ["mujer", "hombre", "unisex"],
  },
});

export const etiquetaSchema = defineField({
  name: "etiqueta",
  title: "Etiqueta",
  type: "string",
  options: {
    list: ["nuevo", "agotado", "mas vendido", "ultimas unidades"],
  },
});

export const garantiaSchema = defineField({
  name: "garantia",
  title: "Garantía",
  type: "object",
  group: "detalles",
  fields: [
    defineField({
      name: "meses",
      title: "Meses",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "string",
    }),
  ],
});

export const slugSchema = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  group: "general",
  validation: (Rule) => Rule.required(),
  options: {
    source: "modelo",
    maxLength: 200,
    slugify: (input) => {
      return input.toLowerCase().replace(/\s+/g, "-").slice(0, 200);
    },
  },
});
