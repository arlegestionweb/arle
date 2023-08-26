import { defineType, defineField } from 'sanity';

export const relojesSchema = defineType({
  name: 'relojes',
  title: 'Relojes',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
    }),
  ]
}) 