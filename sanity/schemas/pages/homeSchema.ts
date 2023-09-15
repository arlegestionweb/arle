import { imageArrayMemberSchema, imageObjectSchema } from './../objects/image';
import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import bannersSchema from '../objects/bannersSchema';

export const homeSchema = defineType({
  name: "homepage",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    bannersSchema,
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
          type: "string",
        }),
        imageObjectSchema
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
          type: "string",
        }),
        imageObjectSchema
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
          type: "string",
        }),
        imageObjectSchema,
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
          type: "string",
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
    // defineField({
    //   name: "testimonios",
    //   title: "Testimonios",
    //   type: "object",
    //   fields: [
    //     defineField({
    //       name: "titulo",
    //       title: "Título",
    //       type: "string",
    //     }),
    //     defineField({
    //       name: "descripcion",
    //       title: "Descripción",
    //       type: "string",
    //     }),
    //     defineField({
    //       name: "lista",
    //       title: "Lista de Testimonios",
    //       type: "array",
    //       of: [
    //         defineArrayMember({
    //           name: "testimonio",
    //           title: "Testimonio",
    //           type: "object",
    //           fields: [
    //             defineField({
    //               name: "titulo",
    //               title: "Título",
    //               type: "string",
    //             }),
    //             defineField({
    //               name: "nombre",
    //               title: "Nombre",
    //               type: "string",
    //             }),
    //             defineField({
    //               name: "cargo",
    //               title: "Cargo",
    //               type: "string",
    //             }),
    //             defineField({
    //               name: "descripcion",
    //               title: "Descripción",
    //               type: "string",
    //             }),
    //             imageObjectSchema,
    //           ]
    //         })
    //       ]
    //     })
    //   ],
    // }),

  ],
});
