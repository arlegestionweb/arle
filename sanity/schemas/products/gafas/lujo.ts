import { defineType, defineField } from "sanity";

import {
  bannersDeProductoSchema,
  coleccionesDeMarcaSchema,
  detallesLujoSchema,
  garantiaSchema,
  generoSchema,
  inspiracionSchema,
  monturaDetallesSchema,
  mostrarCreditoSchema,
  slugSchema,
} from "../../objects/products/generales";
import {
  lenteSchema,
  monturaSchema,
  variantesDeGafaLujoSchema,
} from "../../objects/products/gafas";

export const gafasLujoSchema = defineType({
  name: "gafasLujo",
  title: "Gafas de Lujo",
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
      title: "Descripción",
      group: "general",
      type: "text",
    }),
    generoSchema,
    mostrarCreditoSchema,
    garantiaSchema,
    inspiracionSchema,
    detallesLujoSchema,
    monturaDetallesSchema,
    bannersDeProductoSchema,
    defineField({
      name: "especificaciones",
      title: "Especificaciones",
      group: "detalles",
      type: "object",
      // @ts-ignore
      fields: [
        defineField({
          name: "paisDeOrigen",
          title: "País de Origen",
          type: "reference",
          to: [{ type: "paisDeOrigen" }],
        }),
        defineField({
          name: "queIncluye",
          title: "Qué incluye?",
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
      ],
    }),
    variantesDeGafaLujoSchema,
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
      if (!media) return { title };
      return {
        title,
        subtitle,
        media: media[0].imagenes[0],
      };
    },
  },
});
