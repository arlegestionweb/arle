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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "texto",
      title: "Texto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "porcentaje",
      title: "Porcentaje",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productos",
      title: "Productos",
      type: "array",
      validation: (Rule) =>
        Rule.required().min(1).error("At least one product is required"),
      of: [
        {
          validation: (Rule) =>
            Rule.custom((productos: Array<{ _ref: string }> | undefined) => {
              if (!Array.isArray(productos)) {
                return true; // Pass validation if productos is not an array
              }

              const ids = productos.map((producto) => producto._ref);
              const uniqueIds = new Set(ids);

              return (
                ids.length === uniqueIds.size ||
                "Los productos deben ser únicos"
              );
            }),
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "fin",
          title: "Fin",
          type: "datetime",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
