import { defineType, defineField } from "sanity";
import { generoSchema, lenteSchema, monturaSchema, precioSchema } from "../../objects/productObjects";
import { imageArray } from "../../objects/image";

export const gafasPremiumSchema = defineType({
  name: "gafasPremium",
  title: "Gafas Premium",
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
    generoSchema,
    defineField({
      name: "garantia",
      title: "Garantía",
      type: "string",
    }),
    monturaSchema,
    lenteSchema,
  ],
});
