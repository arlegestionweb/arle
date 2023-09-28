import { defineType, defineField } from "sanity";
import { imageArrayForProducts } from "../../objects/image";
import {
  detallesPerfumeSchema,
  resenaPerfumesSchema,
  variantesDePerfumesSchema,
} from "../../objects/products/perfumes";
import {
  mostrarCreditoSchema,
  slugSchema,
} from "../../objects/products/generales";
import bannersSchema from "../../objects/bannersSchema";

export const perfumeLujoSchema = defineType({
  name: "perfumeLujo",
  title: "Perfume de Lujo",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "detalles", title: "Detalles" },
    {name: "variantes", title: "Variantes"},
  ],
  fields: [
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    imageArrayForProducts,
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
    variantesDePerfumesSchema,
    defineField({
      name: "parteDeUnSet",
      title: "Es parte de un set?",
      type: "boolean",
      initialValue: false,
    }),
    detallesPerfumeSchema,
    defineField({
      name: "coleccionDeMarca",
      title: "Colección De Marca",
      type: "reference",
      to: [{ type: "coleccionesDeMarca" }],
      hidden: ({ document }) => !document?.marca,
      // validation: (Rule) => Rule.custom((coleccionDeMarca) => {}),
    }),
    resenaPerfumesSchema,
    mostrarCreditoSchema,
    bannersSchema,
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
      return {
        title,
        media: media[0],
      };
    },
  },
});
