"use server";

import { TWompiRequest } from "../transaccion-wompi/route";

const pixelUrl = `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.PIXEL_API_TOKEN}`;

async function hashString(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export const pagePixelView = async () => {
  const hashedZp = await hashString("760001");

  const pixelEvent = {
    data: [
      {
        event_name: "PageView",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: {
          zp: [`${hashedZp}`],
          ph: [null],
        },
      },
    ],
    //// "test_event_code":"TEST7037"
  };

  const postReq = await fetch(pixelUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pixelEvent),
  });

  if (!postReq.ok) {
    console.error("Failed to send event to Pixel API", await postReq.text());
  } else {
    console.log("Home View");
  }
};

export type ProductTypes = {
  productName: String;
  productType: String;
  productValue: String;
};

export const productPixelView = async ({
  productName,
  productType,
  productValue,
}: ProductTypes) => {
  const hashedZp = await hashString("760001");

  const pixelEvent = {
    data: [
      {
        event_name: "ViewContent",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: {
          zp: [`${hashedZp}`],
          ph: [null],
          fbc: null,
          client_ip_address: null,
          client_user_agent: null
        },
        custom_data: {
          content_name: `${productName}`,
          content_category: `${productType}`,
          currency: "COP",
          value: `${parseInt(productValue.toString(), 10) * 1000}`,
        },
      },
    ],
   // "test_event_code":"TEST7037"
  };

  const postReq = await fetch(pixelUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pixelEvent),
  });

  if (!postReq.ok) {
    console.error("Failed to send event to Pixel API", await postReq.text());
  } else {
    console.log("New Product View");
  }
};

export const addedToCartPixelView = async ({
  productName,
  productType,
  productValue,
}: ProductTypes) => {
  const hashedZp = await hashString("760001");

  const pixelEvent = {
    data: [
      {
        event_name: "AddToCart",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: {
          zp: [`${hashedZp}`],
          ph: [null],
        },
        custom_data: {
          content_name: `${productName}`,
          content_category: `${productType}`,
          currency: "COP",
          value: `${parseInt(productValue.toString(), 10) * 1000}`,
        },
      },
    ],
   // "test_event_code":"TEST7037"
  };

  const postReq = await fetch(pixelUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pixelEvent),
  });

  if (!postReq.ok) {
    console.error("Failed to send event to Pixel API", await postReq.text());
  } else {
    console.log("Added to Cart");
  }
};

export const initiatePixelCheckoutView = async (totalValue: number) => {
  const hashedZp = await hashString("760001");

  const pixelEvent = {
    data: [
      {
        event_name: "InitiateCheckout",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: {
          zp: [`${hashedZp}`],
          ph: [null],
        },
        custom_data: {
          currency: "COP",
          value: `${parseInt(totalValue.toString(),10)}`,
        },
      },
    ],
   // "test_event_code":"TEST7037"
  };

  const postReq = await fetch(pixelUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pixelEvent),
  });

  if (!postReq.ok) {
    console.error("Failed to send event to Pixel API", await postReq.text());
  } else {
    console.log("Initiated checkout");
  }
};

export const initiatePixelPurchaseView = async (data: TWompiRequest["data"]) => {

  console.log("initiating Pixel view")
    
  const pixelUrl = `https://graph.facebook.com/v20.0/${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.PIXEL_API_TOKEN}`;

  const email = await hashString(data.transaction.customer_email);
  const phone = await hashString(
    data.transaction.customer_data.phone_number
  );
  const name = await hashString(
    data.transaction.customer_data.full_name
  );

  const pixelEvent = {
    data: [
      {
        event_name: "Purchase",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: {
          em: [`${email}`],
          ph: [`${phone}`],
          fn: [`${name}`],
        },
        custom_data: {
          currency: "COP",
          value: `${data.transaction.amount_in_cents / 100}`,
        },
      },
    ],
    // "test_event_code":"TEST7037"
  };

  console.log({pixelEvent});
  
  const postReq = await fetch(pixelUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pixelEvent),
  });
  
  if (!postReq.ok) {
    console.error("Failed to send event to Pixel API", await postReq.text());
  } else {
    console.log("Compra exitosa");
  }
}