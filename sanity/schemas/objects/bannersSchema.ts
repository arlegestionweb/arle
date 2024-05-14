import { defineArrayMember, defineField } from "sanity";
import { videoSchema } from "./video";
import { PiFlagBannerFill } from "react-icons/pi";

type TParentWithImageOrVideo = {
  imagenOVideo?: boolean;
}

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
        // defineField({
        //   name: "imagenOVideo",
        //   title: "Imagen o Video",
        //   type: "boolean",
        //   initialValue: true,
        // }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
          validation: (Rule) => Rule.required(),

          // hidden: ({ parent }) => !parent?.imagenOVideo,
          // validation: (Rule) =>
          //   Rule.custom((field, context) => {
          //     if (
          //       (context.parent as TParentWithImageOrVideo).imagenOVideo &&
          //       !field
          //     ) {
          //       return "La imagen es requerida cuando 'Imagen' está seleccionado";
          //     }
          //     return true;
          //   }),
        }),
        // defineField({
        //   name: "video",
        //   title: "Video",
        //   type: "object",
        //   hidden: ({ parent }) => parent?.imagenOVideo,
        //   validation: (Rule) =>
        //     Rule.custom((field, context) => {
        //       if (
        //         !(context.parent as TParentWithImageOrVideo).imagenOVideo &&
        //         !field
        //       ) {
        //         return "El video es requerido cuando 'Video' está seleccionado";
        //       }
        //       return true;
        //     }),
        //   fields: [videoSchema],
        // }),
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