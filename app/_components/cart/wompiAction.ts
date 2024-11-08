import { TOrderSchemaWithKeys } from "@/sanity/queries/orders";

export const generateWompiPaymentURL = async (data: TOrderSchemaWithKeys) => {
    
  const amountInCents = data.amounts.total * 100
  const reference = data._id
  const publicKey = process.env.NEXT_PUBLIC_WOMPI as string;
  const baseWompiUrl = "https://checkout.wompi.co/p/";
  const currency = "COP";
  const redirectUrl=`${process.env.NEXT_PUBLIC_SITE_URL}/wompi-redirection/${reference}`
  const concatenatedIntegrity = `${reference}${amountInCents}${currency}${process.env.NEXT_PUBLIC_WOMPI_INTEGRITY}`
  const encondedText = new TextEncoder().encode(concatenatedIntegrity);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
   
  const customerData = {
    email: data.customer.email,
    fullName: data.customer.name,
    phoneNumber: data.customer.phone,
    legalIdType: data.customer.id.type,
    legalId: data.customer.id.number,
  }

  const shippingAddress = {
    addressLine1: data.shipping.addressObject.address as string,
    city: data.shipping.addressObject.city as string,
    region: data.shipping.addressObject.department as string,
    postalCode: data.shipping.addressObject.postalCode as string,
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

  return `${baseWompiUrl}?${params.toString()}`;
}