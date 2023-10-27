import { defineType, defineField } from "sanity";

import { coleccionesDeMarcaRefSchema, detallesLujoSchema, garantiaSchema, generoSchema, inspiracionSchema, monturaDetallesSchema, mostrarCreditoSchema, resenaSchema, slugSchema } from "../../objects/products/generales";
import { detallesDeGafaSchema, lenteSchema, monturaSchema, variantesDeGafaSchema } from "../../objects/products/gafas";
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
    generoSchema,
    mostrarCreditoSchema,
    coleccionesDeMarcaRefSchema,
    garantiaSchema,
    inspiracionSchema,
    detallesLujoSchema,
    monturaDetallesSchema,
    bannersSchema,
    defineField({
      name: "especificaciones",
      title: "Especificaciones",
      group: "detalles",
      type: "object",
      fields: [
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
        defineField({
          name: "tipoDeGafa",
          title: "Tipo de Gafa",
          type: "reference",
          to: [{ type: "tipoDeGafa" }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "estiloDeGafa",
          title: "Estilo de Gafa",
          type: "reference",
          to: [{ type: "estiloDeGafa" }],
          validation: (Rule) => Rule.required(),
        }),
        monturaSchema,
        lenteSchema,
      ]
    }),
    variantesDeGafaSchema,
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
      if (!media) return {title}
      return {
        title,
        subtitle,
        media: media[0].imagenes[0],
      };
    },
  },
});



