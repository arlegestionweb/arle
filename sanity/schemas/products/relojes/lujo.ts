import { defineType, defineField, defineArrayMember } from "sanity";
import {
  detallesRelojSchema,
  funcionesSchema,
  garantiaSchema,
  precioSchema,
  resenaSchema,
  resistenciaAlAguaSchema,
} from "../../objects/productObjects";
import { imageArray, slugSchema } from "../../objects/image";
import { videoSchema } from "../../objects/video";

export const relojesLujoSchema = defineType({
  name: "relojesLujo",
  title: "Relojes de Lujo",
  type: "document",
  fields: [
    defineField({
      name: "modelo",
      title: "Modelo o Referencia",
      type: "string",
    }),
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
    }),
    videoSchema,
    imageArray,
    precioSchema,
    funcionesSchema,
    resistenciaAlAguaSchema,
    garantiaSchema,
    detallesRelojSchema,
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
