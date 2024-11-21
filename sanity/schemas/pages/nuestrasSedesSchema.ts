import { defineArrayMember, defineField, defineType } from "sanity";
import { IoLocationSharp } from "react-icons/io5";

export const nuestrasSedesSchema = defineType({
  name: "nuestrasSedes",
  title: "Nuestras Sedes",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitulo",
      title: "Subtítulo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sedes",
      title: "Sedes",
      type: "array",
      // @ts-ignore
      of: [
        defineArrayMember({
          name: "sede",
          title: "Sede",
          type: "reference",
          to: [{ type: "sede" }],
        }),
      ],
    }),
  ],
});

export const citySchema = defineType({
  name: "ciudad",
  title: "Ciudad",
  type: "document",
  icon: IoLocationSharp,
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const sedeSchema = defineType({
  name: "sede",
  title: "Sede",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ciudad",
      title: "Ciudad",
      type: "reference",
      // @ts-ignore
      to: [{ type: "ciudad" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "direccion",
      title: "Dirección",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "local",
      title: "Local u Oficina",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "findUsIn",
      title: "Encuentrános en:",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "Número de Whatsapp",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagenes",
      title: "Imágenes",
      type: "array",
      validation: (Rule) => Rule.required(),
      // @ts-ignore
      of: [
        defineArrayMember({
          name: "image",
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
        }),
      ],
    }),
    defineField({
      name: "title",
      title: "Título descriptivo",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Texto descriptivo",
      type: "text",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
    }),
    defineField({
      name: "schedule",
      title: "Horario",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "map",
      title: "Ubicación en el mapa",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "nombre",
      media: "imagenes",
    },
    prepare(selection) {
      const { title, media } = selection;
      if (!title) return { title: "Sin título" };
      if (!media) return { title };
      return {
        title,
        media: media[0],
      };
    },
  },
});
