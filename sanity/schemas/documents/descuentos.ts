import { defineType, defineField } from "sanity";

export const descuentosSchema = defineType({
  name: "descuentos",
  title: "Descuentos",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "porcentaje",
      title: "Porcentaje",
      type: "string",
    }),
    defineField({
      name: "productos",
      title: "Productos",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "gafasLujo" },
            { type: "gafasPremium" },
            { type: "relojesLujo" },
            { type: "relojesPremium" },
            { type: "perfumeLujo" },
            { type: "perfumePremium" },
          ],
        },
      ],
    }),
    defineField({
      name: "duracion",
      title: "Duración",
      type: "object",
      fields: [
        defineField({
          name: "inicio",
          title: "Inicio",
          type: "datetime",
        }),
        defineField({
          name: "fin",
          title: "Fin",
          type: "datetime",
        }),
      ],
    })
  ],
});
