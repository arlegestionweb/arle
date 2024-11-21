import { defineField } from "sanity";

export const videoSchema = defineField({
  name: "videoObject",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      // group: "general",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "imagenDeCarga",
      title: "Imagen de Carga",
      type: "imagenObject",
    })
  ],
  hidden: ({ parent }) => parent?.imagenOVideo,
})
