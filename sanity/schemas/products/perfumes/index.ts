import { defineField, defineType } from "sanity";

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

export const concentracionSchema = defineType({
  name: "concentracion",
  title: "Concentración",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
    })
  ]
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