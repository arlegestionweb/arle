import { defineArrayMember } from "sanity";
import { defineField } from "sanity";

export const notasOlfativasSchema = defineField({
  name: "notasOlfativas",
  title: "Notas olfativas",
  type: "array",
  of: [
    defineArrayMember({
      name: "nota",
      title: "Nota",
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
      ],
    }),
  ],
});

export const precioSchema = defineField({
  name: "precio",
  title: "Precio",
  type: "string",
});

export const generoSchema = defineField({
  name: "genero",
  title: "Género",
  type: "string",
});


export const monturaSchema = defineField({
  name: "montura",
  title: "Montura",
  type: "object",
  fields: [
    defineField({
      name: "forma",
      title: "Forma de la Montura",
      type: "string",
    }),
    defineField({
      name: "material",
      title: "Material del Marco",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color del Marco",
      type: "string",
    }),
    defineField({
      name: "colorVarilla",
      title: "Color de la Varilla",
      type: "string",
    })
  ]
})

export const lenteSchema = defineField({
  name: "lente",
  title: "Lente",
  type: "object",
  fields: [
    defineField({
      name: "lente",
      title: "Lente",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color del Lente",
      type: "string",
    }),
    defineField({
      name: "material",
      title: "Material del Lente",
      type: "string",
    }),
    defineField({
      name: "tipo",
      title: "Tipo de Lente",
      type: "string",
    }),
  ]
})


export const resenaSchema = defineField({
  name: "resena",
  title: "Reseña",
  type: "object",
  fields: [
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "inspiracion",
      title: "Inspiraicón, historia u otros",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),
    defineField({
      name: "ingredientes",
      title: "Ingredientes",
      type: "array",
      of: [
        defineArrayMember({
          name: "ingrediente",
          title: "Ingrediente",
          type: "object",
          fields: [
            defineField({
              name: "titulo",
              title: "Título",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
})