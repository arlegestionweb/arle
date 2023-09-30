import { defineField } from "sanity";
import { coleccionesDeMarcaRefSchema, etiquetaSchema, generoSchema, mostrarCreditoSchema, precioConDescuentoSchema, precioSchema } from "./generales";
import { imageArrayForProducts } from "../image";

export const monturaSchema = defineField({
  name: "montura",
  title: "Montura",
  type: "object",
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "formaDeLaMontura",
      title: "Forma de la Montura",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "formaDeLaMontura" }],
    }),
    defineField({
      name: "material",
      title: "Material de la Montura",
      type: "reference",
      to: [{ type: "materialDelMarco" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const lenteSchema = defineField({
  name: "lente",
  title: "Lente",
  type: "object",
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "material",
      title: "Material del Lente",
      type: "reference",
      to: [{ type: "materialDelLente" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo de Lente",
      type: "reference",
      to: [{ type: "tipoDeLente" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});

const varianteDeGafa = defineField({
  name: "variante",
  title: "Variante",
  type: "object",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorDeLaMontura",
      title: "Color de la Montura",
      type: "reference",
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorDeLaVarilla",
      title: "Color de la Varilla",
      type: "reference",
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
      hidden: ({ document }) => document?._type === "gafasPremium",
    }),
    defineField({
      name: "colorDelLente",
      title: "Color del Lente",
      type: "reference",
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    precioSchema,
    precioConDescuentoSchema,
    etiquetaSchema,
    defineField({
      name: "codigo",
      title: "Código",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "unidadesDisponibles",
      title: "Unidades disponibles",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    imageArrayForProducts,    
  ]
})

export const variantesDeGafaSchema = defineField({
  name: "variantes",
  title: "Variantes",
  group: "variantes",
  type: "array",
  of: [varianteDeGafa],
  validation: (Rule) => Rule.custom(variantes => {
    if (!variantes) return "Debe haber al menos una variante";
    if (variantes.length === 0) {
      return "Debe haber al menos una variante";
    }
    return true;
  }),
})

export const detallesDeGafaSchema = defineField({
  name: "detalles",
  title: "Detalles",
  type: "object",
  group: "detalles",
  fields: [
    defineField({
      name: "tipoDeGafa",
      title: "Tipo de Gafa",
      type: "reference",
      to: [{ type: "tipoDeGafa" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "estiloDeGafa",
      title: "Estilo de Gafa",
      type: "reference",
      to: [{ type: "estiloDeGafa" }],
      validation: (Rule) => Rule.required(),
    }),
    generoSchema,
    mostrarCreditoSchema,
    coleccionesDeMarcaRefSchema,
    monturaSchema,
    lenteSchema,
  ]
})