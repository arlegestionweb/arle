import { defineType, defineField } from "sanity";

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
    defineField({
      name: "imagen",
      title: "Imagen",
      type: "imagenObject",
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
      validation: (Rule) => Rule.custom(imagenes => {
        if (!imagenes) return "Debe haber al menos un producto";
        if (imagenes.length === 0) {
          return "Debe haber al menos un producto";
        }
        return true;
      }),
    }),
  ],
});
