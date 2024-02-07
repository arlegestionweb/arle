import { IoCash } from "react-icons/io5";
import { defineField, defineType } from "sanity";

const addressSchema = defineField({
  name: "addressObject",
  title: "dirección",
  type: "object",
  fields: [
    defineField({
      name: "address",
      title: "Dirección",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "Ciudad",
      type: "string",
    }),
    defineField({
      name: "department",
      title: "Departamento",
      type: "string",
    }),
    defineField({
      name: "postalCode",
      title: "Código Postal",
      type: "string",
    }),
  ],
});

export const ordersSchema = defineType({
  name: "orders",
  title: "Órdenes",
  type: "document",
  icon: IoCash,
  fields: [
    defineField({
      name: "orderId",
      title: "Identificación de la orden",
      type: "string",
    }),
    defineField({
      name: "orderDate",
      title: "Fecha de la orden",
      type: "datetime",
    }),
    defineField({
      name: "customer",
      title: "Cliente",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Nombre",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Correo",
          type: "string",
        }),
        defineField({
          name: "id",
          title: "identificación",
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Tipo",
              type: "string",
            }),
            defineField({
              name: "number",
              title: "Número",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "phone",
          title: "Teléfono",
          type: "string",
        }),
        addressSchema,
      ],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineField({
          name: "orderItem",
          title: "Order Item",
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Producto",
              type: "reference",
              to: [
                { type: "gafasLujo" },
                { type: "gafasPremium" },
                { type: "relojesLujo" },
                { type: "relojesPremium" },
                { type: "perfumeLujo" },
                { type: "perfumePremium" },
              ],
            }),
            defineField({
              name: "quantity",
              title: "Cantidad",
              type: "number",
            }),
            defineField({
              name: "price",
              title: "Precio",
              type: "number",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "amounts",
      title: "Cantidades",
      type: "object",
      fields: [
        defineField({
          name: "subtotal",
          title: "Subtotal",
          type: "number",
        }),
        defineField({
          name: "discount",
          title: "Descuento",
          type: "number",
        }),
        defineField({
          name: "taxes",
          title: "IVA",
          type: "number",
        }),
        defineField({
          name: "shipping",
          title: "envío",
          type: "number",
        }),
        defineField({
          name: "total",
          title: "Total",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "wompiReference",
      title: "Referencia Wompi",
      type: "string",
    }),
    defineField({
      name: "shipping",
      title: "Envío",
      type: "object",
      fields: [
        defineField({
          name: "price",
          title: "Precio",
          type: "number",
        }),
        addressSchema,
      ],
    }),
  ],
});
