import { defineType, defineField } from "sanity";
import { imageArrayForProducts } from "../../objects/image";

import { coleccionesDeMarcaSchema, mostrarCreditoSchema, slugSchema } from "../../objects/products/generales";
import {
  detallesPerfumeSchema,
  variantesDePerfumesSchema,
} from "../../objects/products/perfumes";

export const perfumePremiumSchema = defineType({
  name: "perfumePremium",
  title: "Perfume Premium",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "detalles", title: "Detalles" },
    {name: "variantes", title: "Variantes"},
  ],
  fields: [
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    variantesDePerfumesSchema,
    defineField({
      name: "parteDeUnSet",
      title: "Es parte de un set?",
      type: "boolean",
      initialValue: false,
    }),
    detallesPerfumeSchema,
    mostrarCreditoSchema,
    coleccionesDeMarcaSchema,
    slugSchema,
  ],
  preview: {
    select: {
      title: "titulo",
      media: "variantes",
    },
    prepare(selection) {
      const { title, media } = selection;
      if (!title) return { title: "Sin título" };
      if (!media) return {title}
      return {
        title,
        media: media[0].imagenes[0],
      };
    },
  },
});
