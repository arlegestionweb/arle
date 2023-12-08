import { defineType, defineField, defineArrayMember } from "sanity";

export const sobreNosotrosSchema = defineType({
  name: "sobreNosotros",
  title: "Sobre Nosotros",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "whyWeDoWhatWeDo",
      title: "Por qué hacemos lo que hacemos?",
      type: "content",
    }),
    defineField({
      name: "whyUs",
      title: "Por qué nosotros?",
      type: "content",
    }),
    defineField({
      name: "howWeHelpOurClients",
      title: "Cómo ayudamos a nuestros clientes?",
      type: "content",
    }),
    defineField({
      name: "marcasAliadas",
      title: "Marcas Aliadas",
      type: "array",
      of: [
        defineArrayMember({
          name: "marca",
          title: "Marca",
          type: "object",
          fields: [
            defineField({
              name: "titulo",
              title: "Título",
              type: "string",
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "imagenObject",
            }),
          ],
          preview: {
            select: {
              title: "titulo",
              media: "logo",
            },
            prepare: ({title, media}) => ({
              title,
              media,
            }),
          },
        })
      ],
    }),
  ],
});
