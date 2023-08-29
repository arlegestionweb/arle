import { defineType, defineField } from "sanity";
import {
  garantiaSchema,
  generoSchema,
  lenteSchema,
  monturaSchema,
  precioSchema,
  resenaSchema,
} from "../../objects/productObjects";
import { imageArray } from "../../objects/image";

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
    imageArray,
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
  ],
});
