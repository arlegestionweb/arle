import { defineField } from "sanity";
import {
  etiquetaSchema,
  precioConDescuentoSchema,
  precioSchema,
} from "./generales";
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
      // @ts-ignore
      to: [{ type: "formaDeLaMontura" }],
    }),
    defineField({
      name: "materialMontura",
      title: "Material de la Montura",
      type: "reference",
      // @ts-ignore
      to: [{ type: "materialDelMarco" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "materialVarilla",
      title: "Material de la Varilla",
      type: "reference",
      // @ts-ignore
      to: [{ type: "materialDeLaVarilla" }],
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
      // @ts-ignore
      to: [{ type: "materialDelLente" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipo",
      title: "Tipo de Lente",
      type: "reference",
      // @ts-ignore
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
      name: "colorDeLaMontura",
      title: "Color de la Montura",
      type: "reference",
      // @ts-ignore
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorDeLaVarilla",
      title: "Color de la Varilla",
      type: "reference",
      // @ts-ignore
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "colorDelLente",
      title: "Color del Lente",
      type: "reference",
      // @ts-ignore
      to: [{ type: "colores" }],
      validation: (Rule) => Rule.required(),
    }),
    precioSchema,
    precioConDescuentoSchema,
    etiquetaSchema,
    lenteSchema,
    defineField({
      name: "talla",
      title: "Talla",
      type: "string",
    }),
    defineField({
      name: "codigoDeReferencia",
      title: "Código de referencia",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mostrarUnidadesDisponibles",
      title: "Mostrar unidades disponibles",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "unidadesDisponibles",
      title: "Unidades disponibles",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .error("Unidades disponibles no pueden ser menos de 0"),
    }),
    imageArrayForProducts,
  ],
  preview: {
    select: {
      title: "colorDeLaMontura.nombre",
      subtitle: "precio",
      media: "imagenes",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      if (!title || !subtitle || !media) {
        return {
          title: "Sin título",
          subtitle: "Sin precio",
        };
      }
      return {
        title: `Montura ${title}`,
        subtitle: `$ ${subtitle}`,
        media: media[0],
      };
    },
  },
});

export const variantesDeGafaPremiumSchema = defineField({
  name: "variantes",
  title: "Variantes",
  group: "variantes",
  type: "array",
  of: [varianteDeGafa],
  validation: (Rule) =>
    Rule.custom((variantes) => {
      if (!variantes) return "Debe haber al menos una variante";
      if (variantes.length === 0) {
        return "Debe haber al menos una variante";
      }
      return true;
    }),
});
export const variantesDeGafaLujoSchema = defineField({
  name: "variantes",
  title: "Variantes",
  group: "variantes",
  type: "array",
  of: [varianteDeGafa],
  validation: (Rule) =>
    Rule.custom((variantes) => {
      if (!variantes) return "Debe haber al menos una variante";
      if (variantes.length === 0) {
        return "Debe haber al menos una variante";
      }
      return true;
    }),
});

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
      // @ts-ignore
      to: [{ type: "tipoDeGafa" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "estiloDeGafa",
      title: "Estilo de Gafa",
      type: "reference",
      // @ts-ignore
      to: [{ type: "estiloDeGafa" }],
      validation: (Rule) => Rule.required(),
    }),
    monturaSchema,
  ],
});
