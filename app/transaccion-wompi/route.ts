// import { getOrderById } from "@/sanity/queries/orders";
export const dynamic = 'force-dynamic' // defaults to auto

import { getProductsByIds } from "@/sanity/queries/pages/productPage";
import sanityClient, { sanityWriteClient } from "@/sanity/sanityClient";
import { TProductType } from "../_components/navbar/menu";
import { revalidatePath } from "next/cache";
import { sendAdminInvoiceEmail, sendClientInvoiceEmail } from "../_components/actions/send-email";



type WompiRequest = {
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

async function hashString(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export const POST = async (req: Request, res: Response) => {
  const request: WompiRequest = await req.json();

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

  const email = await hashString(request.data.transaction.customer_email);
  const phone = await hashString(request.data.transaction.customer_data.phone_number);
  const name = await hashString(request.data.transaction.customer_data.full_name);

  const pixelEvent = {
            "data": [
                {
                    "event_name": "Purchase Success",
                    "event_time": new Date().toISOString(),
                    "action_source": "website",
                    "user_data": {
                        "em": [
                            `${email}`
                        ],
                        "ph": [
                            `${phone}`
                        ],
                        "fn": [
                          `${name}`
                        ]
                    },
                    "custom_data": {
                        "currency": "COP",
                        "value": `${request.data.transaction.amount_in_cents / 100}`
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
    console.log('Successfully sent event to Pixel API');
}

  return new Response("Transacción exitosa", { status: 200 });
};

// const resObj = {
//   request: {
//     event: "transaction.updated",
//     data: { transaction: [Object] },
//     sent_at: "2024-06-18T10:01:13.602Z",
//     timestamp: 1718704873,
//     signature: {
//       checksum:
//         "11d8955ec4046ec8f703cac7d9c0cd26fd7293eff78caa8bc1eb87903410b696",
//       properties: [Array],
//     },
//     environment: "test",
//   },
//   transaction: {
//     id: "179512-1718704872-31367",
//     created_at: "2024-06-18T10:01:13.021Z",
//     finalized_at: "2024-06-18T10:01:13.486Z",
//     amount_in_cents: 120000000,
//     reference: "EQKxYF7wDBN9rFcyNoEOT", //paymentId
//     customer_email: "a@a.com",
//     currency: "COP",
//     payment_method_type: "CARD",
//     payment_method: {
//       type: "CARD",
//       extra: [Object],
//       token: "tok_test_79512_7f522aE06b6a1F3D1d51a7f446886Ac0",
//       installments: 1,
//     },
//     status: "APPROVED",
//     status_message: null,
//     shipping_address: null,
//     redirect_url:
//       "http://localhost:3000/success/EQKxYF7wDBN9rFcyNoEOT/is-payment-successful",
//     payment_source_id: null,
//     payment_link_id: null,
//     customer_data: {
//       full_name: "asdasd asdasd",
//       phone_number: "+572131231231",
//     },
//     billing_data: { legal_id_type: "CE", legal_id: "1231231" },
//   },
// };
