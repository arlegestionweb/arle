import { defineType, defineField } from 'sanity';

export const premiumSchema = defineType({
  name: 'premium',
  title: 'Premium',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
    }),
  ]
}) 