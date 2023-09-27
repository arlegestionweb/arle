import { defineType, defineField } from "sanity";

import { videoSchema } from "../../objects/video";
import { detallesRelojSchema, resenaRelojesSchema, variantesDeRelojesSchema } from "../../objects/products/relojes";
import { garantiaSchema, mostrarCreditoSchema, slugSchema } from "../../objects/products/generales";
import bannersSchema from "../../objects/bannersSchema";

export const relojesLujoSchema = defineType({
  name: "relojesLujo",
  title: "Relojes de Lujo",
  type: "document",
  groups: [
    {name: "general", title: "General"},
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
    // videoSchema,
    detallesRelojSchema,
    resenaRelojesSchema,
    garantiaSchema,
    bannersSchema,
    defineField({
      name: "coleccionDeMarca",
      title: "Colección De Marca",
      type: "reference",
      to: [{ type: "coleccionesDeMarca" }],
      hidden: ({ document }) => !document?.marca,
    }),
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
