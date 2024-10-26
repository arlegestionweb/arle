"use server"

import { DateTime } from "luxon";
import { TFormState } from "./types"
import { nanoid } from "nanoid";
import { TCartItem } from "./store";
import { TOrderSchemaWithKeys, zodOrderSchemaWithKeys } from "@/sanity/queries/orders";
import { sanityWriteClient } from "@/sanity/sanityClient";
import { generateAddiPaymentURL } from "./addiAuthAction";
import { permanentRedirect, redirect } from "next/navigation";
import { NextResponse } from "next/server";

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
    }
  }

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

    const amountInCents = parsedFormDataWithProductReference.data.amounts.total * 100
    const reference = parsedFormDataWithProductReference.data._id
    const publicKey = process.env.NEXT_PUBLIC_WOMPI as string;
    const baseWompiUrl = "https://checkout.wompi.co/p/";
    const currency = "COP";
    const redirectUrl=`${process.env.NEXT_PUBLIC_SITE_URL}/success/${reference}`
    const concatenatedIntegrity = `${reference}${amountInCents}${currency}${process.env.NEXT_PUBLIC_WOMPI_INTEGRITY}`
    const encondedText = new TextEncoder().encode(concatenatedIntegrity);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); 
    const customerData = {
      email: parsedFormDataWithProductReference.data.customer.email,
      fullName: parsedFormDataWithProductReference.data.customer.name,
      phoneNumber: parsedFormDataWithProductReference.data.customer.phone,
      legalIdType: parsedFormDataWithProductReference.data.customer.id.type,
      legalId: parsedFormDataWithProductReference.data.customer.id.number,
    }
    const shippingAddress = {
      addressLine1: parsedFormDataWithProductReference.data.shipping.addressObject.address as string,
      city: parsedFormDataWithProductReference.data.shipping.addressObject.city as string,
      region: parsedFormDataWithProductReference.data.shipping.addressObject.department as string,
      postalCode: parsedFormDataWithProductReference.data.shipping.addressObject.postalCode as string,
    }

  const params = new URLSearchParams({
    "public-key": publicKey,
    currency: currency,
    "amount-in-cents": `${amountInCents}`,
    reference: reference,
    "redirect-url": redirectUrl,
    "signature:integrity": hashHex,
    "customer-data:email": customerData.email,
    "customer-data:full-name": customerData.fullName,
    "customer-data:phone-number": customerData.phoneNumber,
    "customer-data:phone-number-prefix": "+57",
    "customer-data:legal-id-type": customerData.legalIdType,
    "customer-data:legal-id": customerData.legalId,
    "shipping-address:address-line-1": shippingAddress.addressLine1,
    "shipping-address:country": "CO",
    "shipping-address:city": shippingAddress.city,
    "shipping-address:region": shippingAddress.region,
    "shipping-address:postal-code": shippingAddress.postalCode,
    "shipping-address:name": customerData.fullName,
    "shipping-address:phone-number": customerData.phoneNumber,
  });

  paymentUrl = `${baseWompiUrl}?${params.toString()}`;
  }
  
  return {
    success: true,
    errors: null,
    redirectionUrl: paymentUrl,
  }
}