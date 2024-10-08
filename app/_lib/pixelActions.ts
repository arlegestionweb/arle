"use server";

import { cookies, headers } from "next/headers";
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

const isIPv6 = (ip: string) => ip.includes(':'); // Verifica si es una dirección IPv6
const isIPv4 = (ip: string) => ip.includes('.'); // Verifica si es una dirección IPv4

const getIp = () => {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const forwardedFor = headers().get('x-forwarded-for')
 
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    
    // Prioriza la primera IPv6 que encuentre
    const ipv6 = ips.find(isIPv6);
    if (ipv6) {
      return ipv6;
    }
    
    // Si no hay IPv6, retorna la primera IPv4
    const ipv4 = ips.find(isIPv4);
    if (ipv4) {
      return ipv4;
    }
  }
 
  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
}



// Función para validar una dirección IP (IPv4 e IPv6)
const isValidIp = (ip: string) => {
  const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Pattern = /^[0-9a-fA-F:]{2,39}$/;
  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
};

type TUserData = {
  em?: string[];
  ph?: string[];
  fn?: string[];
  client_user_agent: string | null;
  fbc: string | null;
  fbp: string | null;
  fb_login_id: string | null;
  external_id: string;
  client_ip_address?: string; // Hacemos este campo opcional
}

export const pagePixelView = async (externalId: string) => {

  const userAgent = headers().get('user-agent');
  const ip = getIp();
  const cookieStore = cookies();
  const fbc = cookieStore.get('_fbc')?.value || null;
  const fbp = cookieStore.get('_fbp')?.value || null;
  const fbLoginId = cookieStore.get('_fb_login_id')?.value || null;

  
  const userData: TUserData = {
    client_user_agent: userAgent,
    fbc: fbc,
    fbp: fbp,
    fb_login_id: fbLoginId,
    external_id: externalId,
  };
  
  // Solo agregamos la IP si es válida
  if (isValidIp(ip)) {
    userData.client_ip_address = ip;
  }

  const pixelEvent = {
    data: [
      {
        event_name: "PageView",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: userData,
      },
    ],
  //  "test_event_code":"TEST7037"
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
}: ProductTypes, externalId: string) => {

  const userAgent = headers().get('user-agent');
  const ip = getIp();
  const cookieStore = cookies();
  const fbc = cookieStore.get('_fbc')?.value || null;
  const fbp = cookieStore.get('_fbp')?.value || null;
  const fbLoginId = cookieStore.get('_fb_login_id')?.value || null;

  const userData: TUserData = {
    client_user_agent: userAgent,
    fbc: fbc,
    fbp: fbp,
    fb_login_id: fbLoginId,
    external_id: externalId,
  };

  // Solo agregamos la IP si es válida
  if (isValidIp(ip)) {
    userData.client_ip_address = ip;
  }

  const pixelEvent = {
    data: [
      {
        event_name: "ViewContent",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: userData,
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
}: ProductTypes, externalId: string) => {

  const userAgent = headers().get('user-agent');
  const ip = getIp();
  const cookieStore = cookies();
  const fbc = cookieStore.get('_fbc')?.value || null;
  const fbp = cookieStore.get('_fbp')?.value || null;
  const fbLoginId = cookieStore.get('_fb_login_id')?.value || null;

  const userData: TUserData = {
    client_user_agent: userAgent,
    fbc: fbc,
    fbp: fbp,
    fb_login_id: fbLoginId,
    external_id: externalId,
  };

  // Solo agregamos la IP si es válida
  if (isValidIp(ip)) {
    userData.client_ip_address = ip;
  }

  const pixelEvent = {
    data: [
      {
        event_name: "AddToCart",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: userData,
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

export const initiatePixelCheckoutView = async (data: TPurchaseData, externalId: string) => {

  const userAgent = headers().get('user-agent');
  const ip = getIp();
  const cookieStore = cookies();
  const fbc = cookieStore.get('_fbc')?.value || null;
  const fbp = cookieStore.get('_fbp')?.value || null;
  const fbLoginId = cookieStore.get('_fb_login_id')?.value || null;

  const email = await hashString(data.email);
  const phone = await hashString(data.phone);
  const name = await hashString(data.name);

  const userData: TUserData = {
    em: [`${email}`],
    ph: [`${phone}`],
    fn: [`${name}`],
    client_user_agent: userAgent,
    fbc: fbc,
    fbp: fbp,
    fb_login_id: fbLoginId,
    external_id: externalId,
  };

  // Solo agregamos la IP si es válida
  if (isValidIp(ip)) {
    userData.client_ip_address = ip;
  }

  const pixelEvent = {
    data: [
      {
        event_name: "InitiateCheckout",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: userData,
        custom_data: {
          currency: "COP",
          value: `${parseInt(data.amount.toString(), 10)}`,
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

type TPurchaseData = {
  name: string,
  email: string,
  phone: string,
  amount: number
}
export const initiatePixelAddiPurchaseView = async (data: TPurchaseData, externalId: string) => {

  const userAgent = headers().get('user-agent');
  const ip = getIp();
  const cookieStore = cookies();
  const fbc = cookieStore.get('_fbc')?.value || null;
  const fbp = cookieStore.get('_fbp')?.value || null;
  const fbLoginId = cookieStore.get('_fb_login_id')?.value || null;

  const email = await hashString(data.email);
  const phone = await hashString(data.phone);
  const name = await hashString(data.name);
  
  const userData: TUserData = {
    em: [`${email}`],
    ph: [`${phone}`],
    fn: [`${name}`],
    client_user_agent: userAgent,
    fbc: fbc,
    fbp: fbp,
    fb_login_id: fbLoginId,
    external_id: externalId,
  };

  // Solo agregamos la IP si es válida
  if (isValidIp(ip)) {
    userData.client_ip_address = ip;
  }

  const pixelEvent = {
    data: [
      {
        event_name: "Purchase",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: userData,
        custom_data: {
          currency: "COP",
          value: `${data.amount}`,
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
    console.log("Compra exitosa");
  }
};

export const initiatePixelPurchaseView = async (
  data: TWompiRequest["data"],
  externalId: string
) => {
  const userAgent = headers().get('user-agent');
  const ip = getIp();
  const cookieStore = cookies();
  const fbc = cookieStore.get('_fbc')?.value || null;
  const fbp = cookieStore.get('_fbp')?.value || null;
  const fbLoginId = cookieStore.get('_fb_login_id')?.value || null;

  const email = await hashString(data.transaction.customer_email);
  const phone = await hashString(data.transaction.customer_data.phone_number);
  const name = await hashString(data.transaction.customer_data.full_name);

  const userData: TUserData = {
    em: [`${email}`],
    ph: [`${phone}`],
    fn: [`${name}`],
    client_user_agent: userAgent,
    fbc: fbc,
    fbp: fbp,
    fb_login_id: fbLoginId,
    external_id: externalId,
  };

  // Solo agregamos la IP si es válida
  if (isValidIp(ip)) {
    userData.client_ip_address = ip;
  }

  const pixelEvent = {
    data: [
      {
        event_name: "Purchase",
        event_time: new Date().toISOString(),
        action_source: "website",
        user_data: userData,
        custom_data: {
          currency: "COP",
          value: `${data.transaction.amount_in_cents / 100}`,
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
    console.log("Compra exitosa");
  }
};
