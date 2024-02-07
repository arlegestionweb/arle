"use server";

import { z } from "zod";

const zodAddressSchema = z.object({
  country: z.string().min(1, "El país es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  department: z.string().min(1, "El departamento es requerido"),
  postalCode: z.string().min(1, "El código postal es requerido"),
  city: z.string().min(1, "La ciudad es requerida")
});

const zodOrderSchema = z.object({
  customer: z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().min(1, "El correo es requerido"),
    id: z.object({
      type: z.string().min(1, "El tipo de documento es requerido"),
      number: z.string().min(1, "El número de documento es requerido")
    }),
    phone: z.string().min(1, "El teléfono es requerido"),
    addressObject: zodAddressSchema.optional().nullable(),
  }),
  addressObject: zodAddressSchema,
  amounts: z.object({
    subtotal: z.number(),
    discount: z.number(),
    taxes: z.number(),
    shipping: z.number(),
    total: z.number(),
  })
  
});
export const createInvoice = async function (currentState: any, formData: FormData) {
    // console.log(currentState, formData)
  const rawFormData = {
    customer: {
      name: formData.get("name"),
      id: {
        type: formData.get("idType"),
        number: formData.get("id"),
      },
      phone: formData.get("phone"),
      email: formData.get("email"),
    },
    addressObject: {
      country: formData.get("pais"),
      city: formData.get("ciudad"),
      postalCode: formData.get("codigoPostal"),
      address: formData.get("direccion"),
      department: formData.get("departamento"),
    },
    amounts: {
      subtotal: 0,
      discount: 0,
      taxes: 0,
      shipping: 0,
      total: Number(formData.get("total")),
    },
  };

  const parsedFormData = zodOrderSchema.safeParse(rawFormData);

  console.log({ parsedFormData });
  
  if (!parsedFormData.success) {
    return { status: 400 , error: parsedFormData.error.message};
  }
  
  return parsedFormData.data;
};
