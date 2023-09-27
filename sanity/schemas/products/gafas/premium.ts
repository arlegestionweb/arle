import { defineType, defineField } from "sanity";

import { imageArrayForProducts } from "../../objects/image";
import { garantiaSchema, generoSchema, mostrarCreditoSchema, precioSchema, slugSchema } from "../../objects/products/generales";
import { lenteSchema, monturaSchema } from "../../objects/products/gafas";

export const gafasPremiumSchema = defineType({
  name: "gafasPremium",
  title: "Gafas Premium",
  type: "document",
  groups: [
    {name: "general", title: "General", default: true},
    {name: "detalles", title: "Detalles"},
  ],
  fields: [
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
    }),
    defineField({
      name: "modelo",
      title: "Modelo o Referencia",
      type: "string",
    }),
    imageArrayForProducts,
    precioSchema,
    defineField({
      name: "tipo",
      title: "Tipo",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
    generoSchema,
    garantiaSchema,
    monturaSchema,
    lenteSchema,
    mostrarCreditoSchema,
    slugSchema,
  ],
  preview: {
    select: {
      title: "modelo",
      subtitle: "marca.titulo",
      media: "imagenes",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      if (!title || !media) return { title: "Sin título" };

      return {
        title,
        subtitle,
        media: media[0],
      };
    },
  },
});
