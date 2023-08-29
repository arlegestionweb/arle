import { defineType, defineField, defineArrayMember } from "sanity";
import {
  detallesRelojSchema,
  funcionesSchema,
  garantiaSchema,
  precioSchema,
  resenaSchema,
  resistenciaAlAguaSchema,
} from "../../objects/productObjects";
import { imageArray } from "../../objects/image";
import { videoSchema } from "../../objects/video";

export const relojesLujoSchema = defineType({
  name: "relojesLujo",
  title: "Relojes de Lujo",
  type: "document",
  fields: [
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
    }),
    videoSchema,
    defineField({
      name: "modelo",
      title: "Modelo o Referencia",
      type: "string",
    }),
    imageArray,
    precioSchema,
    funcionesSchema,
    resistenciaAlAguaSchema,
    garantiaSchema,
    resenaSchema,
    detallesRelojSchema,
  ],
});
