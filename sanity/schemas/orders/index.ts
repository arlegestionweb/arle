import { BiSolidWatchAlt } from "react-icons/bi";
import { IoCash } from "react-icons/io5";
import { PiSunglassesBold } from "react-icons/pi";
import { TbPerfume } from "react-icons/tb";
import { defineField, defineType } from "sanity";
import IdComponent from "./IdComponent";
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
    defineField({
      name: "country",
      title: "País",
      type: "string",
    }),
  ],
});

export const ordersSchema = defineType({
  name: "orders",
  title: "Órdenes",
  type: "document",
  icon: IoCash,
  groups: [
    {
      name: "general",
      title: "Información General",
    },
    {
      name: "envio",
      title: "Envío",
      default: true,
    },
    {
      name: "productos",
      title: "Productos",
    },
  ],
  fields: [
    defineField({
      name: "id",
      title: "ID de la orden",
      type: "string",
      components: {
        input: IdComponent,
      },
      readOnly: true,
    }),
    defineField({
      name: "orderDate",
      title: "Fecha de la orden",
      type: "datetime",
      group: "general",
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "customer",
      title: "Cliente",
      type: "object",
      group: "general",
      // @ts-ignore
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
      name: "amounts",
      title: "Cantidades",
      type: "object",
      group: "general",
      // @ts-ignore
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
      name: "shipping",
      title: "Envío",
      type: "object",
      group: "envio",
      // @ts-ignore
      fields: [
        defineField({
          name: "price",
          title: "Precio",
          type: "number",
        }),
        addressSchema,
        defineField({
          name: "status",
          title: "Status",
          type: "string",
          options: {
            list: [
              { title: "En Proceso", value: "in_process" },
              { title: "Despachado", value: "sent" },
              {
                title: "No entregado - Devuelto al vendedor",
                value: "returned_to_seller",
              },
              { title: "Entregado al comprador", value: "delivered" },
            ],
            layout: "radio",
          },
        }),
        defineField({
          name: "trackingNumber",
          title: "Número de guía del envío",
          type: "string",
        }),
        defineField({
          name: "trackingLink",
          title: "Link de Transportadora",
          type: "url",
        }),
      ],
    }),

    defineField({
      name: "items",
      title: "Items",
      type: "array",
      group: "productos",
      // @ts-ignore
      of: [
        defineField({
          name: "orderItem",
          title: "Order Item",
          type: "object",
          fields: [
            // defineField({
            //   name: "productId",
            //   title: "Producto",
              // @ts-ignore
              // type: "reference",
              // to: [
              //   { type: "gafasLujo" },
              //   { type: "gafasPremium" },
              //   { type: "relojesLujo" },
              //   { type: "relojesPremium" },
              //   { type: "perfumeLujo" },
              //   { type: "perfumePremium" },
              // ],
            // }),

            defineField({
              name: "productId",
              title: "id del producto",
              type: "string",
            }),
            defineField({
              name: "productName",
              title: "Nombre del producto",
              type: "string",
            }),
            defineField({
              name: "productCode",
              title: "Código del producto",
              type: "string",
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
            defineField({
              name: "discountType",
              title: "Tipo de descuento",
              type: "string",
            }),
            defineField({
              name: "productType",
              title: "Tipo de descuento",
              type: "string",
            }),
            defineField({
              name: "originalPrice",
              title: "Precio original",
              type: "number",
            }),
            defineField({
              name: "variantId",
              title: "ID de la variante",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "productId.marca.titulo",
              quantity: "quantity",
              productType: "productType",
            },
            prepare({ title, productType, quantity }) {
              const media = productType.includes("perfume")
                ? TbPerfume
                : productType.includes("gafa")
                ? PiSunglassesBold
                : productType.includes("reloj")
                ? BiSolidWatchAlt
                : null;
              return {
                title,
                media,
                subtitle: `Cantidad: ${quantity}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "wompiReference",
      title: "Referencia Wompi",
      type: "string",
      group: "general",
    }),
  ],
  preview: {
    select: {
      id: "_id",
      orderDate: "orderDate",
      status: "status",
      customerName: "customer.name",
    },
    prepare({ id, status, customerName }) {
      return {
        title: customerName,
        subtitle: `${id} - ${status}`,
      };
    },
  },
});
