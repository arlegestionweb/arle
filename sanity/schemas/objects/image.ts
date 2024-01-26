import { defineField, defineArrayMember } from 'sanity';

export const imageObjectSchema = defineField({
  name: "imagenObject",
  title: "Imagen",
  type: "image",
  options: {
    collapsible: false,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Texto Alternativo",
      description: "Para buscadores de internet (SEO)",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
  ],
})



export const imageArrayForProducts = defineField({
  name: "imagenes",
  title: "Imágenes",
  // group: "general",
  type: "array",
  validation: (Rule) => Rule.custom(imagenes => {
    if (!imagenes) return "Debe haber al menos una imagen";
    if (imagenes.length === 0) {
      return "Debe haber al menos una imagen";
    }
    return true;
  }),
  of: [imageArrayMemberSchema],
  options: {
    layout: "grid",
  },
})