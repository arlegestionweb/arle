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
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
    }),
   defineField({
    name: "imagen",
    title: "Imagen de fondo",
    type: "imagenObject",
   }),
   defineField({
    name: "email",
    title: "Email",
    type: "string",
   }),
   defineField({
    name: "jobs",
    title: "Empleos",
    type: "array",
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
          }),
          defineField({
            name: "sede",
            title: "Sede",
            type: "reference",
            to: [{ type: "sede" }],
          }),
          defineField({
            name: "experience",
            title: "Experiencia requerida",
            type: "string",
          }),
          defineField({
            name: "skills",
            title: "Habilidades",
            type: "array",
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
            type: "string",
          }),
          defineField({
            name: "salary",
            title: "salario",
            type: "string",
            components: {
              input: ColombianPrice,
            }
          }),
          defineField({
            name: "aboutJob",
            title: "Acerca del trabajo",
            type: "array",
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