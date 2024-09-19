// import { getOrderById } from "@/sanity/queries/orders";
export const dynamic = 'force-dynamic' // defaults to auto

import { getProductsByIds } from "@/sanity/queries/pages/productPage";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { TProductType } from "../_components/navbar/menu";
import { revalidatePath } from "next/cache";
import { sendAdminInvoiceEmail, sendClientInvoiceEmail } from "../_components/actions/send-email";


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
    wompiReference: request.applicationId ,
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

      if (!variantToUpdate) {
        return Response.json({
          status: 500,
        });
      }

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

  const { data, error } = await sendClientInvoiceEmail(newSanityOrder);
  const { data: adminData, error: adminError } = await sendAdminInvoiceEmail(newSanityOrder);


  if (error || adminError) {
    return Response.json({status: 500})
  }

  revalidatePath("/listing", "page")
  revalidatePath("/[type]/[id]/page", "page")

  const pixelUrl = `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.PIXEL_API_TOKEN}`

  const pixelEvent = {
            "data": [
                {
                    "event_name": "Purchase",
                    "event_time": new Date().toISOString(),
                    "action_source": "website",
                    "custom_data": {
                        "currency": "COP",
                        "value": `${request.approvedAmount / 100}`
                    }
                }
            ],
      };

  const postReq = await fetch(pixelUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(pixelEvent),
});

if (!postReq.ok) {
    console.error('Failed to send event to Pixel API', await postReq.text());
} else {
    console.log('Compra exitosa');
}

  // Return the request body
  return new Response(JSON.stringify(request), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

