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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whyWeDoWhatWeDo",
      title: "Por qué hacemos lo que hacemos?",
      type: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whyUs",
      title: "Por qué nosotros?",
      type: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "howWeHelpOurClients",
      title: "Cómo ayudamos a nuestros clientes?",
      type: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ourStory",
      title: "Nuestra Historia",
      type: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "marcasAliadas",
      title: "Marcas Aliadas",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          name: "marca",
          title: "Marca",
          type: "reference",
          to: [{ type: "marca" }],
          validation: (Rule) => Rule.required(),
        })
      ],
    }),
  ],
});
