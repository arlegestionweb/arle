import { defineType, defineField } from "sanity";
import { detallesRelojSchema, variantesDeRelojesSchema } from "../../objects/products/relojes";
import { coleccionesDeMarcaSchema, garantiaSchema, mostrarCreditoSchema, slugSchema } from "../../objects/products/generales";


export const relojesPremiumSchema = defineType({
  name: "relojesPremium",
  title: "Relojes Premium",
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
      // @ts-ignore
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
      validation: (Rule) => Rule.required(),
    }),
    variantesDeRelojesSchema,
    garantiaSchema,
    detallesRelojSchema,
    mostrarCreditoSchema,
    coleccionesDeMarcaSchema,
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
