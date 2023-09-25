import { defineType, defineField } from "sanity";
import { imageArrayForProducts } from "../../objects/image";

import { generoSchema, precioSchema, slugSchema } from "../../objects/products/generales";
import { notasOlfativasSchema, variantesDePerfumesSchema } from "../../objects/products/perfumes";

export const perfumePremiumSchema = defineType({
  name: "perfumePremium",
  title: "Perfume Premium",
  type: "document",
  groups: [
    {name: "general", title: "General", default: true},
    {name: "detalles", title: "Detalles"},
  ],
  fields: [
    defineField({
      name: "marca",
      title: "Marca",
      type: "reference",
      to: [{ type: "marca" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "modelo",
      title: "Modelo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "string",
    }),



    // variantes
    // unidades disponibles, codigo de ref (req), reg invima, tamano (titulo), precio, etiqueta
    variantesDePerfumesSchema,
    // detalles, 
    // calificacion (stars), concentracion, genero, set(bool), familia olfativa (ref), notas olfativas (obj {notas salida, base, corazon} todos ref a notas olfativas doc),
    
    
    // corta resena
    
    
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
