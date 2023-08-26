import { defineType, defineField } from 'sanity';

export const lujoSchema = defineType({
  name: 'lujo',
  title: 'Lujo',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
    }),
  ]
}) 