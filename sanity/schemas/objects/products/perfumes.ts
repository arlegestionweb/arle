import { GiNoseSide } from "react-icons/gi";
import { defineArrayMember, defineField } from "sanity";
import { videoSchema } from "../video";
import ColombianPrice from "@/sanity/components/ColombianPrice";
import { etiquetaSchema, generoSchema } from "./generales";
import { TbPerfume } from "react-icons/tb";
import StarRating from "../../../components/StarRating";

export const resenaPerfumesSchema = defineField({
  name: "resena",
  title: "Reseña",
  type: "object",
  fields: [
    videoSchema,
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
    defineField({
      name: "precio",
      title: "Precio",
      type: "string",
      validation: (Rule) => Rule.required(),
      components: {
        input: ColombianPrice,
      },
    }),
    defineField({
      name: "codigoDeReferencia",
      title: "Código de referencia",
      type: "string",
    }),
    defineField({
      name: "registroInvima",
      title: "Registro Invima",
      type: "string",
    }),
    defineField({
      name: "unidadesDisponibles",
      title: "Unidades disponibles",
      type: "number",
      initialValue: 0,
    }),
    etiquetaSchema,
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
      };
    },
  },
});

export const variantesDePerfumesSchema = defineField({
  name: "variantes",
  title: "Variantes",
  type: "array",
  group: "general",
  validation: (Rule) => Rule.custom(variantes => {
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
    defineField({
      name: "concentracion",
      title: "Concentración",
      type: "string",
    }),
    defineField({
      name: "calificacion",
      title: "Calificación",
      type: "number",
      components: {
        input: StarRating,
      },
    }),
    generoSchema,
    defineField({
      name: "resenaCorta",
      title: "Reseña corta",
      type: "text",
    }),
    defineField({
      name: "familiaOlfativa",
      title: "Familia olfativa",
      type: "reference",
      to: [{ type: "familiasOlfativas" }],
    }),

    defineField({
      name: "notasOlfativas",
      title: "Notas olfativas",
      type: "object",
      fields: [
        defineField({
          name: "notasDeSalida",
          title: "Notas de salida",
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
        defineField({
          name: "notasDeBase",
          title: "Notas de Base",
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
        defineField({
          name: "notasDeCorazon",
          title: "Notas de Corazón",
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
      ],
    }),
  ],
});
