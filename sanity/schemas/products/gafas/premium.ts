import { defineType, defineField } from "sanity";

import {
  garantiaSchema,
  generoSchema,
  mostrarCreditoSchema,
  slugSchema,
} from "../../objects/products/generales";
import {
  detallesDeGafaSchema,
  variantesDeGafaPremiumSchema,
} from "../../objects/products/gafas";

export const gafasPremiumSchema = defineType({
  name: "gafasPremium",
  title: "Gafas Premium",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "detalles", title: "Detalles" },
    { name: "variantes", title: "Variantes" },
  ],
  fields: [
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      group: "general",
      to: [{ type: "marca" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "modelo",
      title: "Modelo o Referencia",
      group: "general",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      group: "general",
      type: "text",
    }),
    generoSchema,
    mostrarCreditoSchema,
    garantiaSchema,

    detallesDeGafaSchema,
    variantesDeGafaPremiumSchema,
    slugSchema,
  ],
  preview: {
    select: {
      title: "modelo",
      subtitle: "marca.titulo",
      media: "variantes",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      if (!title || !media) return { title: "Sin título" };
      if (!media) return { title };
      return {
        title,
        subtitle,
        media: media[0].imagenes[0],
      };
    },
  },
});
