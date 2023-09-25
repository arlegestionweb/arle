import { defineType, defineField } from "sanity";
import { imageArrayForProducts } from "../../objects/image";
import { notasOlfativasSchema, resenaPerfumesSchema } from "../../objects/products/perfumes";
import { generoSchema, precioSchema, slugSchema } from "../../objects/products/generales";


export const perfumeLujoSchema = defineType({
  name: "perfumeLujo",
  title: "Perfume de Lujo",
  type: "document",
  groups: [
    {name: "general", title: "General", default: true},
    {name: "detalles", title: "Detalles"},
  ],
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

    resenaPerfumesSchema,

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
