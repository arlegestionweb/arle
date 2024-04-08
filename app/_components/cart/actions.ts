"use server";

import { sanityWriteClient } from "@/sanity/sanityClient";
import { z } from "zod";
import { DateTime } from "luxon";
import { TCartItem, zodCartItem } from "./store";
import { nanoid } from "nanoid";
import { TOrderSchema, zodOrderSchema } from "@/sanity/queries/orders";

const zodOrderSchemaWithProductReference = zodOrderSchema.merge(
  z.object({
    items: z.array(
      zodCartItem.merge(
        z.object({
          productId: z
            .string()
            .transform((refId) => ({ _type: "reference", _ref: refId })),
          _key: z.string(),
        })
      )
    ),
  })
);

export const createInvoice = async function (_: unknown, formData: FormData) {

  if (!formData || !formData.get("reference")) {
    return { error: "No reference provided", status: 400 };
  }

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
      status: "in_process",
    },
    amounts: {
      subtotal: Number(formData.get("subtotal")),
      discount: Number(formData.get("discount")),
      taxes: Number(formData.get("tax")),
      shipping: Number(formData.get("shipping")),
      total: Number(formData.get("total")),
    },
    status: "PENDING",
    items: JSON.parse(formData.get("items") as string).map(
      (item: TCartItem) => ({
        ...item,
        _key: nanoid(),
      })
    ),
  };

  const parsedFormDataWithProductReference =
    zodOrderSchemaWithProductReference.safeParse(rawFormData);

  if (!parsedFormDataWithProductReference.success) {
    console.error(parsedFormDataWithProductReference.error);
    return {
      status: 400,
      error: parsedFormDataWithProductReference.error.message,
    };
  }

  try {
    await sanityWriteClient.createOrReplace({
      ...parsedFormDataWithProductReference.data,
    });
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: "Failed to create invoice",
    };
  }

  return {data: parsedFormDataWithProductReference.data, status: 200, error: null};
};
