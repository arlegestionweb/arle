"use server"

import { checkAddiResponseBodySchema, TOrderSchemaWithKeys } from "@/sanity/queries/orders"

export const checkAddiAmounts = async (cartAmount: number) => {

  try {
    const response = await fetch(`${process.env.ADDI_CHECKAMOUNTS_ENDPOINT}/config?requestedAmount=${cartAmount}`);
    const body = await response.json();
    const parsedBody = checkAddiResponseBodySchema.safeParse(body);
    if (!parsedBody.success) {
      throw new Error(JSON.stringify(parsedBody.error));
    }
    return parsedBody.data;
  }
  catch(e) {
			throw new Error(JSON.stringify(e));
  }
}

export const generateAddiToken = async () => {

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const body = {
		audience: process.env.ADDI_AUDIENCE,
		grant_type: "client_credentials",
		client_id: process.env.ADDI_CLIENT_ID,
		client_secret: process.env.ADDI_CLIENT_SECRET,    
	}
  if(!process.env.ADDI_TOKEN_URL){
    return
  }
	try {
		const response = await fetch(process.env.ADDI_TOKEN_URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(body),
		});

		const data = await response.json();
		return data.access_token;

	}
		catch (e) {
			throw new Error(JSON.stringify(e));
	}
}

export const generateAddiPaymentURL = async (data: TOrderSchemaWithKeys) => {

  const requiredParameters = {
    orderId: data._id,
    totalAmount: data.amounts.total,
    shippingAmount: data.amounts.shipping,
    totalTaxesAmount: data.amounts.taxes,
    currency: "COP",
		items: data.items.map((item)=>({
				sku: item.variantId,
        name: item.productName,
        quantity: item.quantity,
        unitPrice: item.price,
        tax: item.price*0.19,
        pictureUrl: "https://picture.example.com/?img=test",
        category: item.productType,
        brand: "ARLÉ",
		})),
    client: {
      idType: data.customer.id.type,
      idNumber: data.customer.id.number,
      firstName: data.customer.name.split(" ")[0],
      lastName: data.customer.name.split(" ")[1] || "Sin Apellido",
      email: data.customer.email,
      cellphone: data.customer.phone,
      cellphoneCountryCode: "+57",
      address: {
        lineOne: data.customer.addressObject?.address,
        city: data.customer.addressObject?.city,
        country: "CO",
      },
    },
    shippingAddress: {
      lineOne: data.shipping.addressObject.address,
			city: data.shipping.addressObject.city,
			country: "CO",
    },
    billingAddress: {
      lineOne: data.customer.addressObject?.address,
			city: data.customer.addressObject?.city,
			country: "CO",
    },
    pickUpAddress: {
      lineOne: data.customer.addressObject?.address,
			city: data.customer.addressObject?.city,
			country: "CO",
    },
    allyUrlRedirection: {
      logoUrl: "https://picture.example.com/?img=test",
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/transaccion-addi`,
      redirectionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/addi-redirection/${data._id}`,
    },
    // geoLocation: {
    //   latitude: "4.624335",
    //   longitude: "-74.063644",
    // },
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  
  try {
    const token = await generateAddiToken();
    
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Redirect", "follow");
    headers.append("Referer", "https://arle.co");
    headers.append("Origin", "https://arle.co");
    headers.append("User-Agent", "Next.js");
    

    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify(requiredParameters),
      redirect: 'manual' as RequestRedirect,
    };

    if(!process.env.ADDI_PAYMENT_URL) return

    const response = await fetch(process.env.ADDI_PAYMENT_URL, requestOptions);
  
    
		if (response.status === 301) {
      return response.headers.get('Location');
    } else if (response.status === 400) {
      return {
        error: response.statusText
      }
    } else {
      return {
        error: `Unexpected status: ${response.status}`
      }
    }
		

  } catch (error) {
    console.error({error});
  }


};