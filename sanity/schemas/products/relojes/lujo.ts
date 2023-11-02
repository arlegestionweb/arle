import { defineField, defineType } from "sanity";
import { bannersDeProductoSchema, coleccionesDeMarcaRefSchema, detallesLujoSchema, garantiaSchema, generoSchema, inspiracionSchema, mostrarCreditoSchema, slugSchema } from "../../objects/products/generales";
import { cajaSchema, especificacionesRelojesLujoSchema, movimientoObjSchema, variantesDeRelojesSchema } from "../../objects/products/relojes";

export const relojesLujoSchema = defineType({
  name: "relojesLujo",
  title: "Relojes de Lujo",
  type: "document",
  groups: [
    { name: "general", title: "General" },
    { name: "detalles", title: "Detalles" },
    { name: "variantes", title: "Variantes" },
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
      title: "Modelo o Referencia",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
    generoSchema,
    mostrarCreditoSchema,
    coleccionesDeMarcaRefSchema,
    inspiracionSchema,
    detallesLujoSchema,
    movimientoObjSchema,
    bannersDeProductoSchema,
    cajaSchema,
    especificacionesRelojesLujoSchema,
    garantiaSchema,
    variantesDeRelojesSchema,
    slugSchema,
  ],
  preview: {
    select: {
      title: "modelo",
      subtitle: "marca.titulo",
      media: "variantes",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      if (!title || !media) return { title: "Sin título" };

      return {
        title,
        subtitle,
        media: media[0].imagenes[0],
      };
    },
  },
})