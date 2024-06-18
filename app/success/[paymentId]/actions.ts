"use server";
export const runtime = 'edge';

export const dynamic = "force-dynamic";

import {
  TEmailOrderItemSchema,
  TFrontEndOrderSchema,
} from "@/sanity/queries/orders";
import { Resend } from "resend";
import { EmailTemplate } from "./_components/email-template";
import { getProductById } from "@/sanity/queries/pages/productPage";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "arle.gestionweb@gmail.com";

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

export const sendClientInvoiceEmail = async (order: TFrontEndOrderSchema) => {

  const fetchProduct = async (item: TEmailOrderItemSchema) => {
    if (!item.product) {
      const { product } = await getProductById(
        item.productId._ref,
        item.productType
      );
      return { ...item, product };
    }
    return item;
  };

  const newItems = await Promise.all(order.items.map(fetchProduct));

  const newOrder = { ...order, items: newItems };
  
  console.log("inside send client invoice", {newOrder})
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@arle.co",
      to: [order.customer.email],
      subject: "Factura de tu compra",
      react: EmailTemplate({ order: newOrder }) as React.ReactElement,
    });
    
    if (error) {
      return { error: error };
    }
    
    return { data: data, error: null };
  } catch (error) {
    return { error: error };
  }
};
export const sendAdminInvoiceEmail = async (order: TFrontEndOrderSchema) => {
  
  const fetchProduct = async (item: TEmailOrderItemSchema) => {
    
    if (!item.product) {
      const { product } = await getProductById(
        item.productId._ref,
        item.productType
      );
      return { ...item, product };
    }
    return item;
  };
  
  const newItems = await Promise.all(order.items.map(fetchProduct));
  
  const newOrder = { ...order, items: newItems };
  console.log("inside send admin invoice", {newOrder})
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@arle.co",
      to: [ADMIN_EMAIL],
      subject: `Numero de orden: ${order._id}`,
      react: EmailTemplate({ order: newOrder }) as React.ReactElement,
    });

    if (error) {
      return { error: error };
    }

    return { data: data, error: null };
  } catch (error) {
    return { error: error };
  }
};
