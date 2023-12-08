import { defineArrayMember, defineField, defineType } from "sanity";

export const nuestrasSedesSchema = defineType({
  name: "nuestrasSedes",
  title: "Nuestras Sedes",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "sedes",
      title: "Sedes",
      type: "array",
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

export const sedeSchema = defineType({
  name: "sede",
  title: "Sede",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "Ciudad",
      type: "string",
    }),
    defineField({
      name: "direccion",
      title: "Dirección",
      type: "string",
    }),
    defineField({
      name: "local",
      title: "Local u Oficina",
      type: "string",
    }),
    defineField({
      name: "findUsIn",
      title: "Encuentrános en:",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "Número de Whatsapp",
      type: "string",
    }),
    defineField({
      name: "imagenes",
      title: "Imágenes",
      type: "array",
      of: [
        defineArrayMember({
          name: "image",
          title: "Imagen",
          type: "image",
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
      type: "string",
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
    }),
    defineField({
      name: "map",
      title: "Ubicación en el mapa",
      type: "text",
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
