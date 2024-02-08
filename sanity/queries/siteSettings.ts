import { z } from "zod";
import sanityClient from "../sanityClient";
import { baseBlockSchema } from "./pages/trabajaConNosotrosQueries";

const zodConfigSchema = z.object({
  marcaPromocionada: z.object({
    titulo: z.string(),
  }).optional().nullable(),
  linksSociales: z.array(
    z.object({
      redSocial: z.string(),
      url: z.string(),
    })
  ).optional().nullable(),
  mostrarCodigoDeDescuento: z.boolean(),
  legal: z.object({
    terminosCondiciones: z.array(baseBlockSchema).optional().nullable(),
    politicasPrivacidad: z.array(baseBlockSchema).optional().nullable(),
    garantiasCambiosDevoluciones: z.array(baseBlockSchema).optional().nullable(),
    politicasEnvio: z.array(baseBlockSchema).optional().nullable(),
    politicasCookies: z.array(baseBlockSchema).optional().nullable(),
  })
});

export type TSiteSettings = z.infer<typeof zodConfigSchema>;

export const getSiteSettings = async () => {
  try {
    const result = await sanityClient.fetch(`
    *[_type == "configuracion"][0]{
      mostrarCodigoDeDescuento,
      "marcaPromocionada": marcaPromocionada->{
        titulo,
      },
      "linksSociales": socialLinks[]{
        redSocial,
        url,
      },
      mostrarCodigoDeDescuento,
      "legal": legal {
        terminosCondiciones,
        politicasPrivacidad,
        garantiasCambiosDevoluciones,
        politicasEnvio,
        politicasCookies,
      }
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


const zodMetaSchema = z.object({
  titulo: z.string(),
  descripcion: z.string(),
});

export const getSiteSettingsMetadata = async () => {
    try {
      const result = await sanityClient.fetch(`
        *[_type == "configuracion"][0]{
          titulo,
          descripcion,
        }
      `);
  
      const parsedResult = zodMetaSchema.safeParse(result);

  
      if (!parsedResult.success) {
        throw new Error(parsedResult.error.message);
      }
  
      return parsedResult.data;
    } catch (error) {
      console.error(error);
    }
}