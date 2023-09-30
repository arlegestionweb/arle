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
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const materialesDeCajaSchema = defineType({
  name: "materialDeCaja",
  title: "Material de Caja",
  type: "document",
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
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
}); 