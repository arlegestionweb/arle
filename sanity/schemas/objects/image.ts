import { defineField, defineArrayMember } from "sanity";
import ImageUrl, { Image } from "../../components/ImageUrl";


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
      // validation: (Rule) => Rule.required(),
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
  // components: {
  //   input: ImageUrl({value: "url"}),
  // },
  fields: [
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      components: {
        input: ImageUrl,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Texto Alternativo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "url",
    },
    prepare({ title, media }) {
      return {
        title,
        media: Image({media, title}),
      };
    },
  },
});

export const imageArrayMemberSchema = defineArrayMember({
  name: "image",
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

export const newImagesArrayForProducts = defineField({
  name: "newImagenes",
  title: "Nuevas Imágenes",
  type: "array",
  of: [
    defineArrayMember({
      name: "imagen",
      title: "Imagen",
      type: "object",
      // @ts-ignore
      fields: [
        // defineField({
        //   name: "useExternalImage",
        //   title: "Usar imagen externa",
        //   type: "boolean",
        // }),
        defineField({
          name: "externalImage",
          title: "Imagen Externa",
          type: "imageUrlObject",
          hidden: ({ parent }) => !parent.useExternalImage,
        }),
        defineField({
          name: "image",
          title: "Imagen",
          type: "image",
          hidden: ({ parent }) => parent.useExternalImage,
        }),
      ],
    }),
  ],
});
