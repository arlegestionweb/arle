import { defineType, defineField } from "sanity";
import {
  garantiaSchema,
  generoSchema,
  lenteSchema,
  monturaSchema,
  precioSchema,
  resenaSchema,
} from "../../objects/productObjects";
import { imageArrayForProducts, slugSchema } from "../../objects/image";

export const gafasLujoSchema = defineType({
  name: "gafasLujo",
  title: "Gafas de Lujo",
  type: "document",
  fields: [
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
    }),
    defineField({
      name: "modelo",
      title: "Modelo o Referencia",
      type: "string",
    }),
    imageArrayForProducts,
    precioSchema,
    defineField({
      name: "tipo",
      title: "Tipo",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "string",
    }),
    resenaSchema,
    defineField({
      name: "paisDeOrigen",
      title: "País de origen",
      type: "string",
    }),
    defineField({
      name: "incluye",
      title: "Qué incluye",
      type: "string",
    }),

    generoSchema,
    garantiaSchema,
    monturaSchema,
    lenteSchema,
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
      return {
        title,
        subtitle,
        media: media[0],
      };
    },
  },
});
