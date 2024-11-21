import { defineArrayMember, defineField, defineType } from "sanity";
import { PiFlagBannerFill } from "react-icons/pi";
import { videoSchema } from "../objects/video";

export const listingSchema = defineType({
  name: "listing",
  title: "Listing",
  type: "document",
  fields: [
    defineField({
      name: "generalBanners",
      title: "Banners Generales",
      type: "array",
      // @ts-ignore
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
              // @ts-ignore
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
      name: "perfumesBanners",
      title: "Banners de Perfumes",
      type: "array",
      // @ts-ignore
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
              // @ts-ignore
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
      name: "gafasBanners",
      title: "Banners de Gafas",
      type: "array",
      // @ts-ignore
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
              // @ts-ignore
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
      name: "relojesBanners",
      title: "Banners de Relojes",
      type: "array",
      // @ts-ignore
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
              // @ts-ignore
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
  ]
})
