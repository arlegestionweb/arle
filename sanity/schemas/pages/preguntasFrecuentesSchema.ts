import { defineType, defineField } from "sanity";

export const preguntasFrecuentesSchema = defineType({
  name: "preguntasFrecuentes",
  title: "Preguntas Frecuentes",
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
      name: "preguntas",
      title: "Preguntas",
      type: "array",
      // @ts-ignore
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "pregunta",
              title: "Pregunta",
              type: "string",
            }),
            defineField({
              name: "respuesta",
              title: "Respuesta",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
});
