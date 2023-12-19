import { imageArrayMemberSchema } from './../objects/image';
import { defineArrayMember, defineField, defineType } from "sanity";
import { PiFlagBannerFill } from 'react-icons/pi';
import { videoSchema } from '../objects/video';
import { FaHome } from 'react-icons/fa';

export const homeSchema = defineType({
  name: "homepage",
  title: "Home",
  type: "document",
  icon: FaHome,
  fields: [
    defineField({
      name: "banners1",
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
            }),
            defineField({
              name: "video",
              title: "Video",
              type: "object",
              hidden: ({ parent }) => parent?.imagenOVideo,
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
    }),
    defineField({
      name: "perfumes",
      title: "Perfumes",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "text",
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
        }),
      ],
    }),
    defineField({
      name: "relojes",
      title: "Relojes",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "text",
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
        }),
      ],
    }),
    defineField({
      name: "gafas",
      title: "Gafas",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "text",
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
        }),
      ],
    }),
    defineField({
      name: "coleccionesDestacadas",
      title: "Colecciones Destacadas",
      type: "array",
      of: [
        defineArrayMember({
          name: "coleccion",
          title: "Colección",
          type: "reference",
          to: [{ type: "colecciones" }],
        }),
      ],

    }),
    defineField({
      name: "sobre",
      title: "Sobre Arlé",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
        }),
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "text",
        }),
        defineField({
          name: "imagenes",
          title: "Imágenes",
          type: "array",
          of: [
            imageArrayMemberSchema

          ]
        }),
      ]
    }),
  ],
});