import { defineField, defineArrayMember } from "sanity";

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
      hidden: ({ parent }) => !parent,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
export const imageUrlObjectSchema = defineField({
  name: "imageUrlObject",
  title: "URL de la imagen",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Texto Alternativo",
      description: "Para buscadores de internet (SEO)",
      type: "string",
    }),
  ],
});
export const videoObjectSchema = defineField({
  name: "video",
  title: "Imagen",
  type: "file",
  options: {
    accept: "video/*",
    collapsible: false,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Texto Alternativo",
      description: "Para buscadores de internet (SEO)",
      type: "string",
    }),
  ],
});

export const imageUrlSchema = defineField({
  name: "imageUrl",
  title: "URL de la imagen",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      // validation: (Rule) => Rule.required().url(),
    }),
  ],
});

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
});

export const imageArrayForProducts = defineField({
  name: "imagenes",
  title: "Imágenes",
  // group: "general",
  type: "array",
  validation: (Rule) =>
    Rule.custom((imagenes) => {
      if (!imagenes) return "Debe haber al menos una imagen";
      if (imagenes.length === 0) {
        return "Debe haber al menos una imagen";
      }
      return true;
    }),
    of: [imageArrayMemberSchema, imageUrlSchema],
    options: {
    layout: "grid",
  },
});
