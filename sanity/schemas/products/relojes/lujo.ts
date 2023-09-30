import { defineType, defineField } from "sanity";

import { videoSchema } from "../../objects/video";
import {
  detallesRelojSchema,
  variantesDeRelojesSchema,
} from "../../objects/products/relojes";
import {
  coleccionesDeMarcaRefSchema,
  garantiaSchema,
  mostrarCreditoSchema,
  resenaSchema,
  slugSchema,
} from "../../objects/products/generales";
import bannersSchema from "../../objects/bannersSchema";

export const relojesLujoSchema = defineType({
  name: "relojesLujo",
  title: "Relojes de Lujo",
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
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      group: "general",
      type: "text",
    }),
    variantesDeRelojesSchema,
    // videoSchema,
    detallesRelojSchema,
    resenaSchema,
    garantiaSchema,
    bannersSchema,
    coleccionesDeMarcaRefSchema,
    mostrarCreditoSchema,
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

      return {
        title,
        subtitle,
        media: media[0].imagenes[0],
      };
    },
  },
});
