import ColombianPrice from "@/sanity/components/ColombianPrice";
import { defineArrayMember, defineField, defineType } from "sanity";


export const trabajaConNosotrosSchema = defineType({
  name: "trabajaConNosotros",
  title: "Trabaja Con Nosotros",
  type: "document",
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
    name: "imagen",
    title: "Imagen de fondo",
    type: "imagenObject",
    validation: (Rule) => Rule.required(),
   }),
   defineField({
    name: "email",
    title: "Email",
    type: "string",
    validation: (Rule) => Rule.required(),
   }),
   defineField({
    name: "jobs",
    title: "Empleos",
    type: "array",
    // @ts-ignore
    of: [
      defineArrayMember({
        name: "job",
        title: "Empleo",
        type: "object",
        fields: [
          defineField({
            name: "titulo",
            title: "Título",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "sede",
            title: "Sede",
            type: "reference",
            // @ts-ignore
            to: [{ type: "sede" }],
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "experience",
            title: "Experiencia requerida",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "skills",
            title: "Habilidades",
            type: "array",
            validation: (Rule) => Rule.required(),
            // @ts-ignore
            of: [
              defineArrayMember({
                name: "skill",
                title: "Habilidad",
                type: "string",
              }),
            ],
          }),
          defineField({
            name: "modality",
            title: "Modalidad",
            type: "text",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "areaLaboral",
            title: "Área laboral",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),
          
          defineField({
            name: "salary",
            title: "salario",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "aboutJob",
            title: "Acerca del trabajo",
            type: "array",
            validation: (Rule) => Rule.required(),
            // @ts-ignore
            of: [{type: "block"}]
          })
        ],
        preview: {
          select: {
            title: "titulo",
            media: "sede.imagenes",
          },
          prepare: ({title, media}) => ({
            title,
            media: media[0],
          }),
        }

      })
    ]
   })
  ],
});