import { defineType, defineField } from "sanity";
import { imageArrayForProducts } from "../../objects/image";

import { slugSchema } from "../../objects/products/generales";
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
      name: "modelo",
      title: "Modelo",
      type: "string",
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
      type: "string",
    }),
    variantesDePerfumesSchema,
    detallesPerfumeSchema,
    defineField({
      name: "parteDeUnSet",
      title: "Es parte de un set?",
      type: "boolean",
    }),
    slugSchema,
  ],
  preview: {
    select: {
      title: "modelo",
      media: "imagenes",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media: media[0],
      };
    },
  },
});
