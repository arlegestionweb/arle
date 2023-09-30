import { defineType, defineField } from "sanity";
import { imageObjectSchema } from "../objects/image";

export const coleccionesSchema = defineType({
  name: "colecciones",
  title: "Colecciones",
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
    imageObjectSchema,
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
  ],
});
