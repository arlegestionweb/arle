import { defineType, defineField, defineArrayMember } from "sanity";
import { imageArrayForProducts, slugSchema } from "../../objects/image";
import {
  generoSchema,
  notasOlfativasSchema,
  precioSchema,
  resenaSchema,
} from "../../objects/productObjects";

export const perfumeLujoSchema = defineType({
  name: "perfumeLujo",
  title: "Perfume de Lujo",
  type: "document",
  fields: [
    defineField({
      name: "modelo",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "string",
    }),
    imageArrayForProducts,
    notasOlfativasSchema,
    defineField({
      name: "tamano",
      title: "Tamaño",
      type: "string",
    }),
    precioSchema,
    defineField({
      name: "codigoDeReferencia",
      title: "Código de referencia",
      type: "string",
    }),
    generoSchema,
    defineField({
      name: "registroInvima",
      title: "Registro Invima",
      type: "string",
    }),

    resenaSchema,

    defineField({
      name: "calificacion",
      title: "Calificación del producto",
      type: "string",
    }),
    slugSchema,
  ],
  preview: {
    select: {
      title: "modelo",
      media: "imagenes",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media: media[0],
      };
    },
  },
});
