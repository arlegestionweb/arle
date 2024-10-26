"use server"

import { DateTime } from "luxon";
import { TFormState } from "./types"
import { nanoid } from "nanoid";
import { TCartItem } from "./store";
import { TOrderSchemaWithKeys, zodOrderSchemaWithKeys } from "@/sanity/queries/orders";
import { sanityWriteClient } from "@/sanity/sanityClient";
import { generateAddiPaymentURL } from "./addiAuthAction";
import { generateWompiPaymentURL } from "./wompiAction";
import { getOrSetExternalIdPixel } from "@/app/_lib/utils";
import { initiatePixelCheckoutView } from "@/app/_lib/pixelActions";

export const createInvoiceAction = async (formState: TFormState, formData: FormData) => {

  const now = DateTime.now().toISO();

  const rawFormData: TOrderSchemaWithKeys = {
    _id: formData.get("reference") as string,
    _type: "orders",
    orderDate: now,
    customer: {
      name: formData.get("name") as string,
      id: {
        type: formData.get("idType") as string,
        number: formData.get("id") as string,
      },
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      addressObject: {
        country: formData.get("pais") as string,
        city: formData.get("ciudad") as string,
        postalCode: formData.get("codigoPostal") as string,
        address: formData.get("direccion") as string,
        department: formData.get("departamento") as string,
      },
    },
    shipping: {
      price: Number(formData.get("shipping")),
      addressObject: {
        country: formData.get("pais") as string,
        city: formData.get("ciudad") as string,
        postalCode: formData.get("codigoPostal") as string,
        address: formData.get("direccion") as string,
        department: formData.get("departamento") as string,
      },
      status: "in_process",
    },
    amounts: {
      subtotal: Number(formData.get("subtotal")),
      discount: Number(formData.get("discount")),
      taxes: Number(formData.get("tax")),
      shipping: Number(formData.get("shipping")),
      total: Number(formData.get("total")),
    },
    status: "PENDING",
    items: JSON.parse(formData.get("items") as string).map(
      (item: TCartItem) => ({
        ...item,
        _key: nanoid(),
      })
    ),
  };



  const parsedFormDataWithProductReference =
  zodOrderSchemaWithKeys.safeParse(rawFormData);

  if (!parsedFormDataWithProductReference.success) {

      const errorArray = parsedFormDataWithProductReference.error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message, 
      }));
    
    
    return {
      success: false,
      errors: errorArray,
      redirectionUrl: null,
    };
  }

  try {
    await sanityWriteClient.createOrReplace({
      ...parsedFormDataWithProductReference.data,
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: [{
        path: 'sanityWrite',
        message: 'Error al registrar la órden de compra.'
      }],
      redirectionUrl: null,
    };
  }

  const paymentMethod = formData.get('paymentMethod');

  if(!paymentMethod){
    return {
      success: false,
      errors: [{
        path: 'paymentMethod',
        message: 'Seleccione un método de pago.' 
      }],
      redirectionUrl: null,
    }
  }

  const pixelInfo = {
    name: parsedFormDataWithProductReference.data.customer.name,
    email: parsedFormDataWithProductReference.data.customer.email,
    phone: parsedFormDataWithProductReference.data.customer.phone,
    amount: parsedFormDataWithProductReference.data.amounts.total,
  }

  const externalId = getOrSetExternalIdPixel();
  initiatePixelCheckoutView(pixelInfo, externalId);

  let paymentUrl = '';

  if(paymentMethod === 'addi'){
    try {
        const url = await generateAddiPaymentURL(parsedFormDataWithProductReference.data);
        if (!url || typeof url !== "string") {
          throw new Error("No se pudo generar la URL de pago");
        }
        paymentUrl = url;
      } catch (error) {
        console.error(error);
      }
  }

  if(paymentMethod === 'wompi'){
    try {
      const url = await generateWompiPaymentURL(parsedFormDataWithProductReference.data);
      if (!url || typeof url !== "string") {
        throw new Error("No se pudo generar la URL de pago");
      }
      paymentUrl = url;
    } catch (error) {
      console.error(error);
    }
  }
  
  return {
    success: true,
    errors: null,
    redirectionUrl: paymentUrl,
  }
}