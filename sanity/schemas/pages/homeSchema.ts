import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homeSchema = defineType({
  name: "homepage",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "banners",
      title: "Banners",
      type: "array",
      of: [
        defineArrayMember({
          name: "banner",
          title: "Banner",
          type: "object",
          fields: [
            defineField({
              name: "titulo",
              title: "Titulo",
              type: "string",
            }),
            defineField({
              name: "imagen",
              title: "Imagen",
              type: "image",
            }),
          ],
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
          type: "string",
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              description: "Para buscadores de internet (SEO)",
              type: "string",
            }),
          ],
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
          type: "string",
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              description: "Para buscadores de internet (SEO)",
              type: "string",
            }),
          ],
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
          type: "string",
        }),
        defineField({
          name: "imagen",
          title: "Imagen",
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              description: "Para buscadores de internet (SEO)",
              type: "string",
            }),
          ],
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
            defineArrayMember({
              name: "imagen",
              title: "Imagen",
              type: "image",
              fields: [
                defineField({
                  name: "alt",
                  title: "Texto Alternativo",
                  description: "Para buscadores de internet (SEO)",
                  type: "string",
                }),
              ],
            }),

          ]
        }),
      ]
    }),
    defineField({
      name: "testimonios",
      title: "Testimonios",
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
          name: "lista",
          title: "Lista de Testimonios",
          type: "array",
          of: [
            defineArrayMember({
              name: "testimonio",
              title: "Testimonio",
              type: "object",
              fields: [
                defineField({
                  name: "titulo",
                  title: "Título",
                  type: "string",
                }),
                defineField({
                  name: "nombre",
                  title: "Nombre",
                  type: "string",
                }),
                defineField({
                  name: "cargo",
                  title: "Cargo",
                  type: "string",
                }),
                defineField({
                  name: "descripcion",
                  title: "Descripción",
                  type: "string",
                }),
                defineField({
                  name: "imagen",
                  title: "Imagen",
                  type: "image",
                  fields: [
                    defineField({
                      name: "alt",
                      title: "Texto Alternativo",
                      description: "Para buscadores de internet (SEO)",
                      type: "string",
                    }),
                  ],
                }),
              ]
            })
          ]
        })
      ],
    }),

  ],
});
