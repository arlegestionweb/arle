"use server";

import { TFrontEndOrderSchema } from "@/sanity/queries/orders";
import { Resend } from "resend";
import { EmailTemplate } from "./_components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const successAction = async (formData: FormData) => {
  
  const order = JSON.parse(formData.get("order") as string) as TFrontEndOrderSchema;
  // console.log("formData", order);
  const { data, error } = await sendInvoiceEmail(order);
  if (error) {
    return { error: error };
  }
  return { data: data };
};


export const sendInvoiceEmail = async (
  order: TFrontEndOrderSchema
) => {
  console.log("sending email")
  console.log("sending email to", order.customer.email)
  console.log({items: order.items})
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@arle.co",
      to: [order.customer.email],
      subject: "Factura de tu compra",
      react: EmailTemplate({ order }) as React.ReactElement,
    });
    console.log({ data, error });
    if (error) {
      return { error: error };
    }
    
    return { data: data };
  } catch (error) {
    return { error: error };
  }
};