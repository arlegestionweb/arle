"use server";

import {
  TEmailOrderItemSchema,
  TFrontEndOrderSchema,
} from "@/sanity/queries/orders";
import { Resend } from "resend";
import { EmailTemplate } from "./_components/email-template";
import { getProductById } from "@/sanity/queries/pages/productPage";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "arleweb8@gmail.com";

export const successAction = async (_: unknown, formData: FormData) => {
  const order = JSON.parse(
    formData.get("order") as string
  ) as TFrontEndOrderSchema;
  // console.log("formData", order);
  const { data, error } = await sendClientInvoiceEmail(order);
  if (error) {
    return { error: error };
  }
  return { data: data, error: null };
};

export const sendClientInvoiceEmail = async (order: TFrontEndOrderSchema) => {
  // console.log("sending email to", order.customer.email);
  // console.log({ items: order.items });

  const fetchProduct = async (item: TEmailOrderItemSchema) => {
    // console.log("fetching product", item);
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

  // console.log({ newItems });

  const newOrder = { ...order, items: newItems };
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@arle.co",
      to: [order.customer.email],
      subject: "Factura de tu compra",
      react: EmailTemplate({ order: newOrder }) as React.ReactElement,
    });
    // console.log({ data, error });
    if (error) {
      return { error: error };
    }

    return { data: data, error: null };
  } catch (error) {
    return { error: error };
  }
};
export const sendAdminInvoiceEmail = async (order: TFrontEndOrderSchema) => {
  // console.log("sending email to", order.customer.email);
  // console.log({ items: order.items });

  const fetchProduct = async (item: TEmailOrderItemSchema) => {
    // console.log("fetching product", item);
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

  // console.log({ newItems });

  const newOrder = { ...order, items: newItems };
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@arle.co",
      to: [ADMIN_EMAIL],
      subject: `Numero de orden: ${order._id}`,
      react: EmailTemplate({ order: newOrder }) as React.ReactElement,
    });
    // console.log({ data, error });
    if (error) {
      return { error: error };
    }

    return { data: data, error: null };
  } catch (error) {
    return { error: error };
  }
};
