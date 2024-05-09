import { defineArrayMember, defineField } from "sanity";
import {
  etiquetaSchema,
  generoSchema,
  precioConDescuentoSchema,
  precioSchema,
} from "./generales";
import { TbPerfume } from "react-icons/tb";
import { notasOlfativasProdSchema } from "../../products/perfumes";
import { imageArrayForProducts } from "../image";

export const resenaPerfumesSchema = defineField({
  name: "resena",
  title: "Reseña",
  type: "object",
  fields: [
    // videoSchema,
    defineField({
      name: "usarInspiracion",
      title: "Usar inspiración?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "inspiracion",
      title: "Inspiraicón, historia u otros",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "ingredientes",
      title: "Ingredientes",
      type: "array",
      of: [
        defineArrayMember({
          name: "ingrediente",
          title: "Ingrediente",
          type: "reference",
          to: [{ type: "ingrediente" }],
        }),
      ],
    }),
  ],
});

const variantePerfumeSchema = defineField({
  name: "variante",
  title: "Variante",
  type: "object",
  icon: TbPerfume,
  fields: [
    defineField({
      name: "tamano",
      title: "Tamaño (ml)",
      description: "Campo numérico en milílitros (ml)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    precioSchema,
    precioConDescuentoSchema,
    defineField({
      name: "codigoDeReferencia",
      title: "Código de referencia",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "registroInvima",
      title: "Registro Invima",
      type: "string",
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
    etiquetaSchema,
    imageArrayForProducts,
  ],
  preview: {
    select: {
      title: "tamano",
      subtitle: "precio",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      if (!title || !subtitle) {
        return {
          title: "Sin título",
          subtitle: "Sin precio",
        };
      }
      return {
        title: `${title} ml`,
        subtitle: `$ ${subtitle}`,
        media: TbPerfume,
      };
    },
  },
});

export const variantesDePerfumesSchema = defineField({
  name: "variantes",
  title: "Variantes",
  type: "array",
  group: "variantes",
  validation: (Rule) =>
    Rule.custom((variantes) => {
      if (!variantes) return "Debe haber al menos una variante";
      if (variantes.length === 0) {
        return "Debe haber al menos una variante";
      }
      return true;
    }),
  of: [variantePerfumeSchema],
});

export const detallesPerfumeSchema = defineField({
  name: "detalles",
  title: "Detalles",
  type: "object",
  group: "detalles",
  fields: [
    generoSchema,
    defineField({
      name: "concentracion",
      title: "Concentración",
      type: "reference",
      to: [{ type: "concentracion" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parteDeUnSet",
      title: "Es parte de un set?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "resenaCorta",
      title: "Reseña corta",
      type: "text",
      hidden: ({ document }) => document?._type !== "perfumePremium",
    }),

    notasOlfativasProdSchema,
  ],
});
