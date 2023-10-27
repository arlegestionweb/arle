import { defineField, defineType } from "sanity";

export const tipoDeGafaSchema = defineType({
  name: "tipoDeGafa",
  title: "Tipo de Gafa",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const formaDeLaMonturaSchema = defineType({
  name: "formaDeLaMontura",
  title: "Forma de la Montura",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const materialDelMarcoSchema = defineType({
  name: "materialDelMarco",
  title: "Material del Marco",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export const materialDeLaVarillaSchema = defineType({
  name: "materialDeLaVarilla",
  title: "Material de la Varilla",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export const materialDelLenteSchema = defineType({
  name: "materialDelLente",
  title: "Material del Lente",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export const tipoDeLenteSchema = defineType({
  name: "tipoDeLente",
  title: "Tipo de Lente",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const estiloDeGafaSchema = defineType({
  name: "estiloDeGafa",
  title: "Estilo de Gafa",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});