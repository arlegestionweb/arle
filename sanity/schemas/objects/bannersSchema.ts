import { defineArrayMember, defineField } from "sanity";
import { imageObjectSchema } from "./image";


export default defineField({
  name: "banners",
  title: "Banners",
  type: "array",
  of: [
    defineArrayMember({
      name: "banner",
      title: "Banner",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Titulo",
          type: "string",
        }),
        defineField({
          name: "descripcion",
          title: "Descripción",
          type: "text",
        }),
        imageObjectSchema
      ],
    }),
  ],
})