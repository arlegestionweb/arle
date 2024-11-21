import { defineType, defineField, defineArrayMember } from "sanity";

export const coleccionesSchema = defineType({
  name: "colecciones",
  title: "Colecciones",
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
      title: "Imagen",
      type: "imagenObject",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productos",
      title: "Productos",
      type: "array",
      validation: (Rule) =>
        Rule.required().min(1).error("Se requiere al menos un producto"),
      // @ts-ignore
      of: [
        {
          // validation: (Rule) =>
          //   Rule.custom((productos: Array<{ _ref: string }> | undefined) => {
          //     if (!Array.isArray(productos)) {
          //       return true; // Pass validation if productos is not an array
          //     }

          //     const ids = productos.map((producto) => producto._ref);
          //     const uniqueIds = new Set(ids);

          //     return (
          //       ids.length === uniqueIds.size ||
          //       "Los productos deben ser únicos"
          //     );
          //   }),
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

    // defineField({
    //   name: "productos",
    //   title: "Productos",
    //   type: "array",
    //   // of: [
    //   //   { type: "gafasLujo" },
    //   //   { type: "gafasPremium" },
    //   //   { type: "relojesLujo" },
    //   //   { type: "relojesPremium" },
    //   //   { type: "perfumeLujo" },
    //   //   { type: "perfumePremium" },
    //   // ],
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "gafasLujo" },
    //         { type: "gafasPremium" },
    //         { type: "relojesLujo" },
    //         { type: "relojesPremium" },
    //         { type: "perfumeLujo" },
    //         { type: "perfumePremium" },
    //       ],
    //     }),
    //   ],
    //   validation: (Rule) =>
    //     Rule.custom((productos) => {
    //       if (!productos) return "Debe haber al menos un producto";
    //       if (productos.length === 0) {
    //         return "Debe haber al menos un producto";
    //       }
    //       return true;
    //     }),
    // }),
  ],
});
