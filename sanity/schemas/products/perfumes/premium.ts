import { defineType, defineField, defineArrayMember } from "sanity";
import { imageArray } from "../../objects/image";
import {
  generoSchema,
  notasOlfativasSchema,
  precioSchema,
} from "../../objects/productObjects";

export const perfumePremiumSchema = defineType({
  name: "perfumePremium",
  title: "Perfume Premium",
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
    defineField({
      name: "resenaCorta",
      title: "Reseña corta",
      type: "text",
    }),
    defineField({
      name: "calificacion",
      title: "Calificación del producto",
      type: "string",
    }),
  ],
});
