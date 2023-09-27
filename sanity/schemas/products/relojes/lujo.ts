import { defineType, defineField } from "sanity";

import { videoSchema } from "../../objects/video";
import { detallesRelojSchema, resenaRelojesSchema, variantesDeRelojesSchema } from "../../objects/products/relojes";
import { garantiaSchema, slugSchema } from "../../objects/products/generales";

export const relojesLujoSchema = defineType({
  name: "relojesLujo",
  title: "Relojes de Lujo",
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
    videoSchema,
    detallesRelojSchema,
    resenaRelojesSchema,
    garantiaSchema,
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
      return {
        title,
        subtitle,
        media: media[0].imagenes[0],
      };
    },
  },
});
