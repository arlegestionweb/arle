import { defineArrayMember, defineField, defineType } from "sanity";
import { FaTemperatureHalf } from "react-icons/fa6";
import { GiNoseFront, GiNoseSide } from "react-icons/gi";
import { RiTestTubeFill } from "react-icons/ri";

export const familiasOlfativasSchema = defineType({
  name: "familiasOlfativas",
  title: "Familias Olfativas",
  type: "document",
  icon: GiNoseSide,
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

export const notasOlfativasProdSchema = defineField({
  name: "notasOlfativas",
  title: "Notas olfativas",
  type: "object",
  validation: Rule => Rule.required(),
  fields: [
    defineField({
      name: "familiaOlfativa",
      title: "Familia olfativa",
      type: "reference",
      // @ts-ignore
      to: [{ type: "familiasOlfativas" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notasDeSalida",
      title: "Notas de salida",
      type: "array",
      // @ts-ignore
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
      ],
    }),
    defineField({
      name: "notasDeBase",
      title: "Notas de Base",
      type: "array",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
      ],
    }),
    defineField({
      name: "notasDeCorazon",
      title: "Notas de Corazón",
      type: "array",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "notasOlfativas" }],
        }),
      ],
    }),
  ],
});

export const concentracionSchema = defineType({
  name: "concentracion",
  title: "Concentración",
  type: "document",
  icon: FaTemperatureHalf,
  validation: (Rule) => Rule.required(),
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
    }),
  ],
});
export const notasOlfativasSchema = defineType({
  name: "notasOlfativas",
  title: "Notas Olfativas",
  type: "document",
  icon: GiNoseFront,
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

export const ingredientesSchema = defineType({
  name: "ingrediente",
  title: "Ingrediente",
  type: "document",
  icon: RiTestTubeFill,
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
