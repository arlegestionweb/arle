import { defineType, defineField, defineArrayMember } from "sanity";
import { imageArray } from "../../objects/image";
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
      name: "titulo",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "string",
    }),
    imageArray,
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
  ],
});
