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
  postalCode: z.string().optional().nullable(),
  city: z.string().min(1, "La ciudad es requerida"),
});

export const checkAddiResponseBodySchema = z.object({
  minAmount: z.number(),
  maxAmount: z.number(),
  policy: z.object({
    discount: z.number(),
    productType: z.string(),
    policyMaxAmount: z.number()
  }).optional().nullable(),
  policies: z.array(z.object({})),
  widgetConfig: z.object({
    widgetVersion: z.string(),
    widgetShowPreapproval: z.boolean()
  }),
  checkoutConfig: z.object({
    version: z.string()
  }),
  isActiveAlly: z.boolean(),
  isActivePayNow: z.boolean()
})

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
    status: z.string(),
    trackingNumber: z.string().optional().nullable(),
    trackingLink: z.string().optional().nullable(),
  }),
  items: z.array(zodCartItem),
});

export const zodOrderSchemaWithKeys = zodOrderSchema.merge(
  z.object({
    items: z.array(
      zodCartItem.merge(
        z.object({
          _key: z.string(),
        })
      )
    ),
    addiAmounts: checkAddiResponseBodySchema.optional().nullable(),
  })
);

export type TOrderSchemaWithKeys = z.infer<typeof zodOrderSchemaWithKeys> 

const zodEmailOrderItemSchema = zodCartItem.merge(
  z.object({
    productId: z.string(),
    product: zodProduct,
  })
);

export type TEmailOrderItemSchema = z.infer<typeof zodEmailOrderItemSchema>;

const zodSanityOrderSchema = zodOrderSchema.merge(
  z.object({
    items: z.array(zodEmailOrderItemSchema),
  })
);

export type TFrontEndOrderSchema = z.infer<typeof zodSanityOrderSchema>;
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
        "productId": productId,
        "product": *[_id == ^.productId][0]{
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
    console.log({error: parsedOrder.error})
    return null;
  }
  return parsedOrder.data;
};
