import { GiCrystalGrowth, GiMaterialsScience } from "react-icons/gi";
import {
  TbDeviceWatchCog,
  TbDeviceWatchQuestion,
  TbDeviceWatchStats2,
} from "react-icons/tb";
import { defineField, defineType } from "sanity";

export const funcionDelRelojSchema = defineType({
  name: "funcionDeReloj",
  title: "Función del Reloj",
  type: "document",
  icon: TbDeviceWatchCog,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
});

export const tipoDeRelojSchema = defineType({
  name: "tipoDeReloj",
  title: "Tipo de Reloj",
  type: "document",
  icon: TbDeviceWatchQuestion,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export const estiloDeRelojSchema = defineType({
  name: "estiloDeReloj",
  title: "Estilo de Reloj",
  type: "document",
  icon: TbDeviceWatchStats2,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const tipoDeCierreSchema = defineType({
  name: "tipoDeCierre",
  title: "Tipo de Cierre",
  type: "document",
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const cristalSchema = defineType({
  name: "cristal",
  title: "Cristal",
  type: "document",
  icon: GiCrystalGrowth,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const tipoDeMovimientoSchema = defineType({
  name: "tipoDeMovimiento",
  title: "Tipo de Movimiento",
  type: "document",
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "descripción",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      type: "imagenObject",
    }),
  ],
});

export const materialesDeCajaSchema = defineType({
  name: "materialDeCaja",
  title: "Material de Caja",
  type: "document",
  icon: GiMaterialsScience,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
  ],
}); 
export const materialesDelPulsoSchema = defineType({
  name: "materialDelPulso",
  title: "Material del Pulso",
  type: "document",
  icon: GiMaterialsScience,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
}); 