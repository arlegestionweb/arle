import { z } from "zod";
import sanityClient from "../sanityClient";

const zodConfigSchema = z.object({
  titulo: z.string(),
  mostrarCodigoDeDescuento: z.boolean(),
});

export const getSiteSettings = async () => {
  try {
    const result = await sanityClient.fetch(`
      *[_type == "configuracion"][0]{
        titulo,
        mostrarCodigoDeDescuento,
      }
    `);

    const parsedResult = zodConfigSchema.safeParse(result);

    if (!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }

    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};
