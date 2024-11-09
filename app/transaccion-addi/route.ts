// import { getOrderById } from "@/sanity/queries/orders";
export const dynamic = 'force-dynamic' // defaults to auto

import { getProductsByIds } from "@/sanity/queries/pages/productPage";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { TProductType } from "../_components/navbar/menu";
import { revalidatePath } from "next/cache";
import { sendAdminInvoiceEmail, sendClientInvoiceEmail } from "../_components/actions/send-email";
import { initiatePixelAddiPurchaseView } from "../_lib/pixelActions";
import { getOrSetExternalIdPixel } from "../_lib/utils";


type AddiRequest = {
  orderId: string;
  applicationId: string;
  approvedAmount: number;
  currency: string;
  status: string;
  statusTimestamp: number;
}

export const POST = async (req: Request) => {
  const request: AddiRequest = await req.json();

  if (request.status !== "APPROVED") {
    return new Response(JSON.stringify(request), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const paymentId = request.orderId;

  const sanityOrder = await sanityClient.fetch(
    `*[_type == "orders" && _id == $id][0]`,
    { id: paymentId }
  );


  const newSanityOrder = {
    ...sanityOrder,
    status: "PAID",
    addiReference: request.applicationId ,
  };
  
  const updateSanityOrder = await sanityWriteClient
    .patch(newSanityOrder._id)
    .set(newSanityOrder)
    .commit();

  const cartItemProducts = newSanityOrder.items.map(
    (item: {
      productId: string;
      productType: TProductType;
      variantId: string;
      quantity: number;
    }) => {
      return {
        _id: item.productId,
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

  const { data, error } = await sendClientInvoiceEmail(newSanityOrder);
  const { data: adminData, error: adminError } = await sendAdminInvoiceEmail(newSanityOrder);


  if (error || adminError) {
    console.error("email no enviado.");
  }

  revalidatePath("/listing", "page")
  revalidatePath("/[type]/[id]/page", "page")

  const pixelInfo = {
    name: sanityOrder.customer.name as string,
    email: sanityOrder.customer.email as string,
    phone: sanityOrder.customer.phone as string,
    amount: request.approvedAmount,
    externalId: sanityOrder.externalIdandFbc.externalId as string,
    fbclid: sanityOrder.externalIdandFbc.fbclid as string | null
  }


  initiatePixelAddiPurchaseView(pixelInfo);

  // Return the request body
  return new Response(JSON.stringify(request), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

