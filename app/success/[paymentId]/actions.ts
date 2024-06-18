"use server";


import {
  TFrontEndOrderSchema,
} from "@/sanity/queries/orders";
import { sendClientInvoiceEmail } from "@/app/_components/actions/send-email";


export const successAction = async (_: unknown, formData: FormData) => {
  const order = JSON.parse(
    formData.get("order") as string
  ) as TFrontEndOrderSchema;

  const { data, error } = await sendClientInvoiceEmail(order);

  if (error) {
    return { error: error };
  }

  return { data: data, error: null };
};

