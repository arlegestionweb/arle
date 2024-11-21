import { EmailTemplate } from "@/app/success/[paymentId]/_components/email-template";
import { VoidedEmailTemplate } from "@/app/success/[paymentId]/_components/voided-email-template";
import { TEmailOrderItemSchema, TFrontEndOrderSchema } from "@/sanity/queries/orders";
import { getProductById } from "@/sanity/queries/pages/productPage";
import { Resend } from "resend";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "arle.gestionweb@gmail.com";


export const sendClientInvoiceEmail = async (order: TFrontEndOrderSchema) => {

  const fetchProduct = async (item: TEmailOrderItemSchema) => {
    if (!item.product) {
      const { product } = await getProductById(
        item.productId,
        item.productType
      );
      return { ...item, product };
    }
    return item;
  };

  const newItems = await Promise.all(order.items.map(fetchProduct));

  const newOrder = { ...order, items: newItems };
  
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
export const sendClientVoidedInvoiceEmail = async (order: TFrontEndOrderSchema) => {

  const fetchProduct = async (item: TEmailOrderItemSchema) => {
    if (!item.product) {
      const { product } = await getProductById(
        item.productId,
        item.productType
      );
      return { ...item, product };
    }
    return item;
  };

  const newItems = await Promise.all(order.items.map(fetchProduct));

  const newOrder = { ...order, items: newItems };
  
  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@arle.co",
      to: [order.customer.email],
      bcc: [ADMIN_EMAIL],
      subject: "Factura de tu compra",
      react: VoidedEmailTemplate({ order: newOrder }) as React.ReactElement,
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
        item.productId,
        item.productType
      );
      return { ...item, product };
    }
    return item;
  };
  
  const newItems = await Promise.all(order.items.map(fetchProduct));
  
  const newOrder = { ...order, items: newItems };

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
