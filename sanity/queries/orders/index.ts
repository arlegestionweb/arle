// import { zodOrderSchema } from "@/app/_components/cart/actions";
import { zodCartItem } from "@/app/_components/cart/store";
import sanityClient from "@/sanity/sanityClient";
import { DateTime } from "luxon";
import { z } from "zod";
import { zodProduct } from "../pages/listingQueries";
import { productQuery } from "../pages/productPage";

const zodAddressSchema = z.object({
  country: z.string().min(1, "El país es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  department: z.string().min(1, "El departamento es requerido"),
  postalCode: z.string().min(1, "El código postal es requerido"),
  city: z.string().min(1, "La ciudad es requerida"),
});

export const zodOrderSchema = z.object({
  _id: z.string().min(1, "El id es requerido"),
  _type: z.literal("orders"),
  orderDate: z.string().refine((value) => DateTime.fromISO(value).isValid),
  status: z.string().min(1, "El estado es requerido"),
  customer: z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().min(1, "El correo es requerido"),
    id: z.object({
      type: z.string().min(1, "El tipo de documento es requerido"),
      number: z.string().min(1, "El número de documento es requerido"),
    }),
    phone: z.string().min(1, "El teléfono es requerido"),
    addressObject: zodAddressSchema.optional().nullable(),
  }),
  amounts: z.object({
    subtotal: z.number(),
    discount: z.number(),
    taxes: z.number(),
    shipping: z.number(),
    total: z.number(),
  }),
  shipping: z.object({
    price: z.number(),
    addressObject: zodAddressSchema,
  }),
  items: z.array(zodCartItem),
});

const zodSanityOrderSchema = zodOrderSchema.merge(
  z.object({
    items: z.array(
      zodCartItem.merge(
        z.object({
          productId: z.string(),
          product: zodProduct,
        })
      )
    ),
  })
);

export type TOrderSchema = z.infer<typeof zodOrderSchema>;

export const getOrderById = async (id: string) => {
  const order = await sanityClient.fetch(
    `*[_type == "orders" && _id == $id][0]{
      _id,
      _type,
      orderDate,
      status,
      customer,
      amounts,
      shipping,
      "items": items[] {
        ...,
        "productId": productId -> _id,
        "product": productId -> {
          "marca": marca->titulo,
          "date": createdAt, 
          _type,
          _type == "perfumeLujo" =>
            ${productQuery.perfumeLujo}
          ,
          _type == "perfumePremium" =>
            ${productQuery.perfumePremium}
          ,
          _type == "relojesLujo" =>
            ${productQuery.relojesLujo}
          ,
          _type == "relojesPremium" =>
            ${productQuery.relojesPremium}
          ,
          _type == "gafasLujo" =>
            ${productQuery.gafasLujo}
          ,
          _type == "gafasPremium" =>
            ${productQuery.gafasPremium}
          ,
        }  
      }
    }`,
    { id }
  );

  const parsedOrder = zodSanityOrderSchema.safeParse(order);

  if (!parsedOrder.success) {
    console.error(parsedOrder.error);
    throw new Error(parsedOrder.error.message);
  }
  return parsedOrder.data;
};