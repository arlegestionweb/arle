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



export const imageArrayForProducts = defineField({
  name: "imagenes",
  title: "Imágenes",
  // group: "general",
  type: "array",
  validation: (Rule) => Rule.required(),
  of: [imageArrayMemberSchema],
  options: {
    layout: "grid",
  },
})