import { defineType, defineField } from "sanity";
import { detallesRelojSchema, variantesDeRelojesSchema } from "../../objects/products/relojes";
import { garantiaSchema, slugSchema } from "../../objects/products/generales";


export const relojesPremiumSchema = defineType({
  name: "relojesPremium",
  title: "Relojes Premium",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "detalles", title: "Detalles" },
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
      group: "general",
      title: "Descripción",
      type: "text",
    }),
    variantesDeRelojesSchema,
    garantiaSchema,
    detallesRelojSchema,
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
