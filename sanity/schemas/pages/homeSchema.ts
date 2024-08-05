import { imageArrayMemberSchema } from './../objects/image';
import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { PiFlagBannerFill } from 'react-icons/pi';
import { videoSchema } from '../objects/video';

export const homeSchema = defineType({
  name: "homepage",
  title: "Home",
  type: "document",
  // @ts-ignore
  icon: HomeIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Sección Principal",
      type: "object",
      // @ts-ignore
      fields: [
        defineField({
          name: "titulo",
          title: "Titulo",
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
          name: "buttonText",
          title: "Texto del Botón",
          type: "string",
        }),
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
              // @ts-ignore
              fields: [
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
                videoSchema,
              ],
              preview: {
                select: {
                  title: "alt",
                  media: "imagen",
                },
                prepare(selection) {
                  const { title, media } = selection;
                  if (!title) return { title: "Sin título", media };
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
      ],
    }),
    defineField({
      name: "perfumes",
      title: "Perfumes",
      type: "object",
      // @ts-ignore
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "descripcion",
          title: "Subtítulo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "relojes",
      title: "Relojes",
      type: "object",
      // @ts-ignore   
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "descripcion",
          title: "Subtítulo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "gafas",
      title: "Gafas",
      type: "object",
      // @ts-ignore
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "descripcion",
          title: "Subtítulo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "imagenObject",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "coleccionesDestacadas",
      title: "Colecciones Destacadas",
      type: "array",
      // @ts-ignore
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
      // @ts-ignore
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "text",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imagenes",
          title: "Imágenes",
          type: "array",
          of: [
            imageArrayMemberSchema
          ],
          validation: (Rule) => Rule.required(),
        }),
      ]
    }),
    defineField({
      name: "asesoria",
      title: "Asesorías",
      type: "object",
      // @ts-ignore
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "beneficios",
          title: "Beneficios",
          type: "array",
          of: [
            defineField({
              name: "beneficio",
              title: "Beneficio",
              type: "string",
              validation: (Rule) => Rule.required(),
            })
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "usarImagen",
          title: "Usar Imagen",
          type: "boolean",
          initialValue: true,
        }),
        defineField({
          name: "imagenAsesoria",
          title: "Imagen o Video",
          type: "object",
          hidden: ({ parent }) => !parent?.usarImagen,
          fields: [
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
            videoSchema,
          ],
        }),
      ]
    })
  ],
});