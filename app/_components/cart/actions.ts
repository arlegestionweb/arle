"use server";

import { sanityWriteClient } from "@/sanity/sanityClient";
import { z } from "zod";
import { DateTime } from "luxon";
import { TCartItem, zodCartItem } from "./store";
import { nanoid } from "nanoid";

const zodAddressSchema = z.object({
  country: z.string().min(1, "El país es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  department: z.string().min(1, "El departamento es requerido"),
  postalCode: z.string().min(1, "El código postal es requerido"),
  city: z.string().min(1, "La ciudad es requerida"),
});

const zodOrderSchema = z.object({
  _id: z.string().min(1, "El id es requerido"),
  _type: z.literal("orders"),
  orderDate: z.string().refine(value => DateTime.fromISO(value).isValid),
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


const zodOrderSchemaWithProductReference = zodOrderSchema.merge(z.object({
  items: z.array(zodCartItem.merge(z.object({
    productId: z.string().transform(refId => ({_type: "reference", _ref: refId })),
    _key: z.string()
  })))
}))

type TOrderSchema = z.infer<typeof zodOrderSchema>;

export const createInvoice = async function (
  currentState: any,
  formData: FormData
) {
  // console.log(currentState, formData)
  
  if (!formData || !formData.get("reference")) {
    return null;
  }
  
  // console.log("id", formData.get("reference"));

  const now = DateTime.now().toISO();

  const rawFormData: TOrderSchema = {
    _id: formData.get("reference") as string,
    _type: "orders",
    orderDate: now,
    customer: {
      name: formData.get("name") as string,
      id: {
        type: formData.get("idType") as string,
        number: formData.get("id") as string,
      },
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      addressObject: {
        country: formData.get("pais") as string,
        city: formData.get("ciudad") as string,
        postalCode: formData.get("codigoPostal") as string,
        address: formData.get("direccion") as string,
        department: formData.get("departamento") as string,
      },
    },
    shipping: {
      price: Number(formData.get("shipping")),
      addressObject: {
        country: formData.get("pais") as string,
        city: formData.get("ciudad") as string,
        postalCode: formData.get("codigoPostal") as string,
        address: formData.get("direccion") as string,
        department: formData.get("departamento") as string,
      },
    },
    amounts: {
      subtotal: Number(formData.get("subtotal")),
      discount: Number(formData.get("discount")),
      taxes: Number(formData.get("tax")),
      shipping: Number(formData.get("shipping")),
      total: Number(formData.get("total")),
    },
    status: "PENDING",
    items: (JSON.parse(formData.get("items") as string)).map((item: TCartItem) => ({
      ...item,
      _key: nanoid()
    })),
  };

  const parsedFormDataWithProductReference = zodOrderSchemaWithProductReference.safeParse(rawFormData);


  if (!parsedFormDataWithProductReference.success) {
    console.log(rawFormData.items)
    console.error(parsedFormDataWithProductReference.error);
    return { status: 400, error: parsedFormDataWithProductReference.error.message };
  }

  const sanityCreateOrder = await sanityWriteClient.createOrReplace({
    ...parsedFormDataWithProductReference.data,
  });

  console.log({ sanityCreateOrder });
  return parsedFormDataWithProductReference.data;
};
