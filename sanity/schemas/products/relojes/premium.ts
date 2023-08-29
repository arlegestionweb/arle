import { defineType, defineField, defineArrayMember } from "sanity";
import {
  detallesRelojSchema,
  funcionesSchema,
  garantiaSchema,
  precioSchema,
  resistenciaAlAguaSchema,
} from "../../objects/productObjects";
import { imageArray } from "../../objects/image";

export const relojesPremiumSchema = defineType({
  name: "relojesPremium",
  title: "Relojes Premium",
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
    funcionesSchema,
    resistenciaAlAguaSchema,
    garantiaSchema,
    detallesRelojSchema,
  ],
});
