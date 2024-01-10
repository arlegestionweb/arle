import sanityClient from "@/sanity/sanityClient";
import { z } from "zod";

const allDiscountCodesQuery = `*[_type == "codigoDeDescuento" && duracion.inicio <= now() && duracion.fin >= now()]{
  codigo,
  porcentaje
}`;


const zodDiscountObjectSchema = z.object({
  codigo: z.string(),
  porcentaje: z.number(),
})

export type TDiscountCode = z.infer<typeof zodDiscountObjectSchema>

const zodDiscountCodeSchema = z.array(zodDiscountObjectSchema)
export const getAllDiscountCodes = async () => {
  try {
    const result = await sanityClient.fetch(allDiscountCodesQuery);

    console.log(result);

    const parsedResult = zodDiscountCodeSchema.safeParse(result);

    if (!parsedResult.success) {
      throw new Error("Error parsing discount codes from Sanity");
    }


    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};
