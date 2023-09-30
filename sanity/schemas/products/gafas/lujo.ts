import { defineType, defineField } from "sanity";

import { garantiaSchema, resenaSchema, slugSchema } from "../../objects/products/generales";
import { detallesDeGafaSchema, variantesDeGafaSchema } from "../../objects/products/gafas";
import bannersSchema from "../../objects/bannersSchema";

export const gafasLujoSchema = defineType({
  name: "gafasLujo",
  title: "Gafas de Lujo",
  type: "document",
  groups: [
    {name: "general", title: "General"},
    {name: "detalles", title: "Detalles"},
    {name: "variantes", title: "Variantes"},
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
    resenaSchema,
    bannersSchema,
    defineField({
      name: "paisDeFabricacion",
      title: "País de fabricación",
      group: "detalles",
      type: "reference",
      to: [{ type: "paisDeFabricacion" }],
    }),
    defineField({
      name: "queIncluye",
      title: "Qué incluye?",
      group: "general",
      type: "string",
    }),
    detallesDeGafaSchema,
    variantesDeGafaSchema,
    garantiaSchema,
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



