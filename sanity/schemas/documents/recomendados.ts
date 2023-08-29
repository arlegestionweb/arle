import { defineType, defineField } from "sanity";
import { imageObjectSchema } from "../objects/image";

export const recomendadosSchema = defineType({
  name: "recomendados",
  title: "Recomendados",
  type: "document",
  fields: [
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
