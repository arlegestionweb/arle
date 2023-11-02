import { defineArrayMember, defineField, defineType } from "sanity";
import { imageArrayForProducts } from "../../objects/image";
import {
  bannersDeProductoSchema,
  generoSchema,
  inspiracionSchema,
  mostrarCreditoSchema,
  slugSchema,
} from "../../objects/products/generales";
import { variantesDePerfumesSchema } from "../../objects/products/perfumes";

export const perfumeLujoSchema = defineType({
  name: "perfumeLujo",
  title: "Perfumes de Lujo",
  type: "document",
  groups: [
    {
      name: "general",
      title: "General",
    },
    {
      name: "detalles",
      title: "Detalles",
    },
    {
      name: "variantes",
      title: "Variantes",
    },
  ],
  fields: [
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    imageArrayForProducts,
    mostrarCreditoSchema,
    generoSchema,
    defineField({
      name: "concentracion",
      title: "Concentración",
      type: "reference",
      group: "detalles",
      to: [{ type: "concentracion" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parteDeUnSet",
      title: "Es parte de un set?",
      type: "boolean",
      group: "detalles",
      initialValue: false,
    }),
    defineField({
      name: "coleccionDeMarca",
      title: "Colección De Marca",
      type: "reference",
      group: "detalles",
      to: [{ type: "coleccionesDeMarca" }],
      hidden: ({ document }) => !document?.marca,
      // validation: (Rule) => Rule.custom((coleccionDeMarca) => {}),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "object",
      group: "detalles",
      fields: [
        defineField({
          name: "texto",
          title: "Texto",
          type: "text",
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
        }),
      ],
    }),
    inspiracionSchema,
    bannersDeProductoSchema,
    defineField({
      name: "notasOlfativas",
      title: "Notas olfativas",
      group: "detalles",
      type: "object",
      fields: [
        defineField({
          name: "familiaOlfativa",
          title: "Familia olfativa",
          type: "reference",
          to: [{ type: "familiasOlfativas" }],
        }),
        defineField({
          name: "notasDeSalida",
          title: "Notas de salida",
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
        defineField({
          name: "notasDeBase",
          title: "Notas de Base",
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
        defineField({
          name: "notasDeCorazon",
          title: "Notas de Corazón",
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
      ],
    }),
    defineField({
      name: "ingredientes",
      title: "Ingredientes",
      group: "detalles",
      type: "array",
      of: [
        defineArrayMember({
          name: "ingrediente",
          title: "Ingrediente",
          type: "reference",
          to: [{ type: "ingrediente" }],
        }),
      ],
    }),
    defineField({
      name: "paisDeFabricacion",
      title: "País de fabricación",
      type: "reference",
      group: "detalles",
      to: [{ type: "paisDeFabricacion" }],
    }),
    variantesDePerfumesSchema,
    slugSchema,
  ],
  preview: {
    select: {
      title: "titulo",
      media: "imagenes",
    },
    prepare(selection) {
      const { title, media } = selection;
      if (!title || !media) return { title: "Sin título" };
      if (!media) return {title}
      return {
        title,
        media: media[0],
      };
    },
  },
});
