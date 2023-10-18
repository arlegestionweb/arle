import { defineType, defineField } from "sanity";
import { imageArrayForProducts } from "../../objects/image";

import { mostrarCreditoSchema, slugSchema } from "../../objects/products/generales";
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
    imageArrayForProducts,
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
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
    slugSchema,
  ],
  preview: {
    select: {
      title: "modelo",
      media: "imagenes",
    },
    prepare(selection) {
      const { title, media } = selection;
      if (!title || !media) return { title: "Sin título" };

      return {
        title,
        media: media[0],
      };
    },
  },
});
