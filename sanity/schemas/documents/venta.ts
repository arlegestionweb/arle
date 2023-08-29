import { defineType, defineField } from "sanity";
import { MdPointOfSale } from "react-icons/md";

export const ventaSchema = defineType({
  name: "venta",
  title: "Ventas",
  type: "document",
  icon: MdPointOfSale,
  fields: [
    defineField({
      name: "codigoVenta",
      title: "Código de venta",
      type: "string",
    }),

    defineField({
      name: "fecha",
      title: "Fecha",
      type: "date",
    }),

    defineField({
      name: "cliente",
      title: "Cliente",
      type: "object",
      fields: [
        defineField({
          name: "nombre",
          title: "Nombre",
          type: "string",
        }),
        defineField({
          name: "telefono",
          title: "Teléfono",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "direccion",
          title: "Dirección",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "estadoDelEnvio",
      title: "Estado del envío",
      type: "string",
      options: {
        list: [
          { title: "Pendiente", value: "pendiente" },
          { title: "En Camino", value: "enCamino" },
          { title: "Entregado", value: "entregado" },
        ],
      },
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
      name: "pago",
      title: "Pago",
      type: "object",
      fields: [
        defineField({
          name: "metodo",
          title: "Método",
          type: "string",
        }),
        defineField({
          name: "monto",
          title: "Monto",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "total",
      title: "Total",
      type: "number",
    }),
  ],
});
