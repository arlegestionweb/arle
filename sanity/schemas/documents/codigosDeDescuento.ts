import { defineType, defineField } from "sanity";

export const codigoDeDescuentosSchema = defineType({
  name: "codigoDeDescuento",
  title: "Códigos de Descuentos",
  type: "document",
  fields: [
    defineField({
      name: "codigo",
      title: "Código",
      type: "string",
    }),
    defineField({
      name: "porcentaje",
      title: "Porcentaje",
      type: "string",
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
