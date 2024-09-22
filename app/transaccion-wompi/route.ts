// import { getOrderById } from "@/sanity/queries/orders";
export const dynamic = "force-dynamic"; // defaults to auto

import { getProductsByIds } from "@/sanity/queries/pages/productPage";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { TProductType } from "../_components/navbar/menu";
import { revalidatePath } from "next/cache";
import {
  sendAdminInvoiceEmail,
  sendClientInvoiceEmail,
  sendClientVoidedInvoiceEmail,
} from "../_components/actions/send-email";
import { initiatePixelPurchaseView } from "../_lib/pixelActions";
import { getOrSetExternalIdPixel } from "../_lib/utils";

export type TWompiRequest = {
  event: string;
  data: {
    transaction: {
      id: string;
      created_at: string;
      finalized_at: string;
      amount_in_cents: number;
      reference: string;
      customer_email: string;
      currency: string;
      payment_method_type: string;
      payment_method: {
        type: string;
        extra: any;
        token: string;
        installments: number;
      };
      status: string;
      status_message: string;
      shipping_address: any;
      redirect_url: string;
      payment_source_id: string;
      payment_link_id: string;
      customer_data: {
        full_name: string;
        phone_number: string;
      };
      billing_data: {
        legal_id_type: string;
        legal_id: string;
      };
    };
  };
  sent_at: string;
  timestamp: number;
  signature: {
    checksum: string;
    properties: string[];
  };
  environment: string;
};

export const POST = async (req: Request, res: Response) => {

  const request: TWompiRequest = await req.json();
  
  if (request.data.transaction.status === "VOIDED") {
    const paymentId = request.data.transaction.reference;

    const sanityOrder = await sanityClient.fetch(
      `*[_type == "orders" && _id == $id][0]`,
      { id: paymentId }
    );
    const newSanityOrder = {
      ...sanityOrder,
      status: "ANULADO",
      wompiReference: request.data.transaction.id,
    };

    const updateSanityOrder = await sanityWriteClient
      .patch(newSanityOrder._id)
      .set(newSanityOrder)
      .commit();

    const { data, error } = await sendClientVoidedInvoiceEmail(newSanityOrder);

    if (error) {
      return Response.json({status: 500})
    }
  
    revalidatePath("/listing", "page")
    revalidatePath("/[type]/[id]/page", "page")
  }

  if (request.data.transaction.status !== "APPROVED") {
    return Response.json({
      status: 500,
    });
  }

  const paymentId = request.data.transaction.reference;

  const sanityOrder = await sanityClient.fetch(
    `*[_type == "orders" && _id == $id][0]`,
    { id: paymentId }
  );
  const newSanityOrder = {
    ...sanityOrder,
    status: "PAID",
    wompiReference: request.data.transaction.id,
  };

  const updateSanityOrder = await sanityWriteClient
    .patch(newSanityOrder._id)
    .set(newSanityOrder)
    .commit();

  const cartItemProducts = newSanityOrder.items.map(
    (item: {
      productId: { _ref: string };
      productType: TProductType;
      variantId: string;
      quantity: number;
    }) => {
      return {
        _id: item.productId._ref,
        _type: item.productType,
        variantId: item.variantId,
        quantity: item.quantity,
      };
    }
  );

  const productsToUpdate = await getProductsByIds(cartItemProducts);

  for (const product of cartItemProducts) {
    const productToUpdate = productsToUpdate?.find(
      (p) => p._id === product._id
    );

    if (productToUpdate) {
      const variantToUpdate = productToUpdate.variantes.find(
        (v) => v.codigoDeReferencia === product.variantId
      );

      if (variantToUpdate) {
        
        const newVariantInfo = {
          ...variantToUpdate,
          unidadesDisponibles:
          variantToUpdate.unidadesDisponibles - product.quantity,
        };
        
        const variantIndex = productToUpdate.variantes.indexOf(variantToUpdate);
        const updateProduct = await sanityWriteClient
        .patch(productToUpdate._id)
        .set({
          [`variantes[${variantIndex}].unidadesDisponibles`]:
          newVariantInfo.unidadesDisponibles,
        })
        .commit();
      }
    }
  }

  const externalId = getOrSetExternalIdPixel();
  initiatePixelPurchaseView(request.data, externalId);

  const { data, error } = await sendClientInvoiceEmail(newSanityOrder);
  const { data: adminData, error: adminError } = await sendAdminInvoiceEmail(
    newSanityOrder
  );
  
  if (error || adminError) {
    console.log("email no enviado");
  }
  
  revalidatePath("/listing", "page");
  revalidatePath("/[type]/[id]/page", "page");
  
  
  return new Response("Transacción exitosa", { status: 200 });
}
