import { defineArrayMember, defineField, defineType } from "sanity";

export const familiasOlfativasSchema = defineType({
  name: "familiasOlfativas",
  title: "Familias Olfativas",
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

export const notasOlfativasProdSchema = defineField({
  name: "notasOlfativas",
  title: "Notas olfativas",
  type: "object",
  fields: [
    defineField({
      name: "familiaOlfativa",
      title: "Familia olfativa",
      type: "reference",
      to: [{ type: "familiasOlfativas" }],
    }),
    defineField({
      name: "notasDeSalida",
      title: "Notas de salida",
      type: "array",
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
