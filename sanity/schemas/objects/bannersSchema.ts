import { defineArrayMember, defineField } from "sanity";
import { videoSchema } from "./video";
import { PiFlagBannerFill } from "react-icons/pi";

export default defineField({
  name: "banners",
  title: "Banners",
  type: "array",
  of: [
    defineArrayMember({
      name: "banner",
      title: "Banner",
      type: "object",
      icon: PiFlagBannerFill,
      fields: [
        defineField({
          name: "titulo",
          title: "Titulo",
          type: "string",
        }),
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "text",
        }),
        defineField({
          name: "imagenOVideo",
          title: "Imagen o Video",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
          hidden: ({ parent }) => !parent?.imagenOVideo,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "video",
          title: "Video",
          type: "object",
          hidden: ({ parent }) => parent?.imagenOVideo,
          validation: (Rule) => Rule.required(),
          fields: [videoSchema],
        }),
      ],
      preview: {
        select: {
          title: "titulo",
          media: "imagen",
        },
        prepare(selection) {
          const { title, media } = selection;
          if (!title) return { title: "Sin título" };
          if (!media) return { title };
          return {
            title,
            media,
          };
        },
      },
    }),
  ],
});