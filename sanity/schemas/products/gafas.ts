import { defineType, defineField } from 'sanity';

export const gafasSchema = defineType({
  name: 'gafas',
  title: 'Gafas',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
    }),
  ]
}) 