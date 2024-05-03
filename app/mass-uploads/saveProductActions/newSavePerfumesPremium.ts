"use server"

import { z } from "zod";
import { TPerfumePremiumExcel } from "../_components/UploadedData";
import { extractErrorsFromIssues } from "./helpers";

export type TError = {
    message: string;
    path?: string;
    product?: {
      marca: string;
      titulo: string;
    } | {
      marca: string;
      modelo: string;
    };
  };

  const zodVariante = z.object({
    codigoDeReferencia: z.string().or(z.number()),
    precio: z.number().or(z.string()),
    registroInvima: z.string().or(z.number()).optional().nullable(),
    unidadesDisponibles: z.number(),
    mostrarUnidadesDisponibles: z.boolean(),
    tamano: z.number(),
    etiqueta: z.object({}).optional().nullable(),
  })

  const zodInitialImages = z.object({
    _id: z.string(),
    url: z.string(),
  }).or(z.string())

  const zodInitialPerfumePremium = z.object({
    titulo: z.string(),
    marca: z.string(),
    variantes: z.array(zodVariante),
    descripcion: z.string(),
    detalles: z.object({
        concentracion: z.string(),
        genero: z.string(),
        notasOlfativas: z.object({
            familiaOlfativa: z.string(),
            notasDeBase: z.array(z.string()),
            notasDeCorazon: z.array(z.string()),
            notasDeSalida: z.array(z.string()),
        }),
        resenaCorta: z.string(),
    }),
    mostrarCredito: z.boolean(),
    parteDeUnSet: z.boolean(),
    imagenes: z.array(zodInitialImages),
  })


export const savePerfumesPremium = async (formState: {
    success: boolean;
    errors: TError[] | null;
  },
  data: {
    products: TPerfumePremiumExcel[];
    productType: string;
  }) => {
    const { products, productType } = data;

    if (productType !== "perfumePremium") {
      return {
        success: false,
        errors: [
          {
            message: `Invalid product type: ${productType}`,
          },
        ],
      };
    }

    const errors: TError[] = [];

    const parsedProductsFromFront = z
    .array(zodInitialPerfumePremium)
    .safeParse(products);

    // console.log(parsedProductsFromFront);

    if (!parsedProductsFromFront.success) {
        console.log({ error: parsedProductsFromFront.error });
        const parsingErrors = extractErrorsFromIssues(
          parsedProductsFromFront.error.issues,
          products
        );
    
        for (const error of parsingErrors) {
          errors.push(error);
        }
        return {
          success: false,
          errors: errors,
        };
      }

      for (const product of parsedProductsFromFront.data) {
        console.log({
          // descripcion: product.descripcion,
          // inspiracion: product.inspiracion,
          // inspiracionImagen: product.inspiracion?.contenido?.imagen,
          imagenes: product.imagenes,
        });
      }

    return {
        success: false,
        errors: [
            {
              message: `funciona, productos tipo ${productType}: ${products} `,
            },
          ],
    }
}