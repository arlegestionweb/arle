import { defineType, defineField } from "sanity";
import {
  detallesRelojSchema,
  funcionesSchema,
  garantiaSchema,
  precioSchema,
  resistenciaAlAguaSchema,
} from "../../objects/productObjects";
import { imageArrayForProducts, slugSchema } from "../../objects/image";

export const relojesPremiumSchema = defineType({
  name: "relojesPremium",
  title: "Relojes Premium",
  type: "document",
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
    funcionesSchema,
    resistenciaAlAguaSchema,
    garantiaSchema,
    detallesRelojSchema,
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
      return {
        title,
        subtitle,
        media: media[0],
      };
    },
  },
});
