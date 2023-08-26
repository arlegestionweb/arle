import { defineField, defineArrayMember } from 'sanity';

export const imageObjectSchema = defineField({
  name: "imagen",
  title: "Imagen",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      title: "Texto Alternativo",
      description: "Para buscadores de internet (SEO)",
      type: "string",
    }),
  ],
})

export const imageArrayMemberSchema = defineArrayMember({
  name: "imagen",
  title: "Imagen",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      title: "Texto Alternativo",
      description: "Para buscadores de internet (SEO)",
      type: "string",
    }),
  ],
})