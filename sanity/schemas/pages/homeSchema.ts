import { imageArrayMemberSchema } from './../objects/image';
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
