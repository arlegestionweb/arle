import { TGender, TProductType } from "@/app/_components/navbar/menu";
import sanityClient from "../sanityClient";
import { z } from "zod";


const zodRawQuery = z.array(z.object({
  marca: z.string(),
  genero: z.string().optional().nullable(),
  detallesDelReloj: z.object({
    genero: z.string().optional()
  }).optional().nullable(),
  detallesReloj: z.object({
    genero: z.string()
  }).optional().nullable(),
  detalles: z.object({
    genero: z.string().optional()
  }).optional().nullable()
}))

const zodParsedQuery = z.array(z.object({
  marca: z.string(),
  genero: z.string()
}))

const zodBrand = z.array(z.object({
  titulo: z.string(),
  sugerida: z.boolean().optional().nullable(),
})).optional().nullable();

export type TBrand = z.infer<typeof zodBrand>;

export const getAllBrands = async () => {
  try {
    const result = await sanityClient.fetch(`
    *[_type == "marca"][]{
      titulo,
      sugerida
    }
    `)

    const parsedResult = zodBrand.safeParse(result);

    if(!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }
    return parsedResult.data;
  } catch(error){
    console.error(error);
  }
}

export const getBrandsByProductTypeAndGender = async (
  productType: TProductType,
  gender: TGender
) => {
  try {
    const result = await sanityClient.fetch(`
      *[_type match "${productType}*"] {
        "marca": marca -> titulo,
        genero,
        detallesDelReloj,
        detallesReloj,
        detalles
      }
    `);

    const parsedResult = zodRawQuery.safeParse(result);

    if (!parsedResult.success) {
      console.error(parsedResult.error);
      return [];
    }


    const processedResult = parsedResult.data.map(item => ({
      ...item,
      genero: item.genero ? item.genero : item.detallesDelReloj?.genero || item.detallesReloj?.genero || item.detalles?.genero
    }));

    const parsedProcessedResult = zodParsedQuery.safeParse(processedResult);

    if (!parsedProcessedResult.success) {
      console.error(parsedProcessedResult.error);
      return [];
    }
    const filteredResult = parsedProcessedResult.data.filter(item => item.genero === gender || "unisex");

    return filteredResult.map(item => item.marca);
  } catch (error) {
    console.error(error);
  }
};
