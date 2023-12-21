import sanityClient from "@/sanity/sanityClient";
import { bannersQuery, imageArrayQuery, imageQuery } from "../objects";

import { z } from "zod";
import { productQuery } from "./productPage";
import { gafasLujoSchema, gafasPremiumSchema } from "./zodSchemas/gafas";
import { perfumeLujoSchema, perfumePremiumSchema } from "./zodSchemas/perfume";
import { relojLujoSchema, relojPremiumSchema } from "./zodSchemas/reloj";
import { zodColorSchema } from "./zodSchemas/general";

const listingMainString = ` 
{
  "listingContent": *[_type == "listing"][0]{
    ${bannersQuery}
  },
  "perfumes": *[_type in ["perfumeLujo", "perfumePremium"]] {
    _type == "perfumeLujo" => ${productQuery.perfumeLujo},
    _type == "perfumePremium" => ${productQuery.perfumePremium}
  },
  "relojes": *[_type in ["relojesLujo", "relojesPremium"]] {
    _type == "relojesLujo" => ${productQuery.relojesLujo},
    _type == "relojesPremium" => ${productQuery.relojesPremium}
  },
  "gafas": *[_type in ["gafasLujo", "gafasPremium"]] {
    _type == "gafasLujo" => ${productQuery.gafasLujo},
    _type == "gafasPremium" => ${productQuery.gafasPremium}
  },

  "colecciones": *[_type == "colecciones"] {
    titulo,
    descripcion,
    ${imageQuery},
    "productos": productos[]->{
      "marca": marca->titulo,
      "type": _type,
      _type == "perfumeLujo" =>
        ${productQuery.perfumeLujo}
      ,
      _type == "perfumePremium" =>
        ${productQuery.perfumePremium}
      ,
      _type == "relojesLujo" =>
        ${productQuery.relojesLujo}
      ,
      _type == "relojesPremium" =>
        ${productQuery.relojesPremium}
      ,
      _type == "gafasLujo" =>
        ${productQuery.gafasLujo}
      ,
      _type == "gafasPremium" =>
        ${productQuery.gafasPremium}
      ,
    }  
  }  
}
`;

export type TColor = z.infer<typeof zodColorSchema>;

// const zodgafasListingQuery = z.union([gafasLujoSchema, gafasPremiumSchema])

const zodBanner = z.object({
  titulo: z.string(),
  descripcion: z.string(),
  imagen: z
    .object({
      alt: z.string(),
      url: z.string(),
    })
    .optional()
    .nullable(),
  video: z
    .object({
      url: z.string(),
    })
    .optional()
    .nullable(),
});

export type TBanner = z.infer<typeof zodBanner>;

const zodVariantePerfume = z.object({
  precio: z.string(),
  unidadesDisponibles: z.number(),
  tamano: z.number(),
  etiqueta: z.string().optional().nullable(),
  registroInvima: z.string(),
  codigoDeReferencia: z.string(),
});

export type TVariantePerfume = z.infer<typeof zodVariantePerfume>;

export type TPerfume = z.infer<typeof zodPerfumeListingQuery>;

const zodVarianteReloj = z.object({
  precio: z.string(),
  unidadesDisponibles: z.number(),
  etiqueta: z.string().optional().nullable(),
  imagenes: z.array(
    z.object({
      url: z.string(),
      alt: z.string().optional().nullable(),
    })
  ),
  colorPulso: zodColorSchema,
  colorTablero: zodColorSchema,
  colorCaja: zodColorSchema,
  registroInvima: z.string(),
  codigoDeReferencia: z.string(),
});

export const isPerfume = (product: TProduct): product is TPerfume =>
  product._type?.includes("perfume");
export const isReloj = (product: TProduct): product is TReloj =>
  product._type?.includes("reloj");
export const isGafa = (product: TProduct): product is TGafa =>
  product._type?.includes("gafa");

const zodGafaListingQuery = z.discriminatedUnion("_type", [
  gafasPremiumSchema,
  gafasLujoSchema,
]);

const zodPerfumeListingQuery = z.discriminatedUnion("_type", [
  perfumePremiumSchema,
  perfumeLujoSchema,
]);

const zodRelojListingQuery = z.discriminatedUnion("_type", [
  relojPremiumSchema,
  relojLujoSchema,
]);

const zodProduct = z.union([
  zodPerfumeListingQuery,
  zodRelojListingQuery,
  zodGafaListingQuery,
]);

export type TVarianteReloj = z.infer<typeof zodVarianteReloj>;

export type TReloj = z.infer<typeof zodRelojListingQuery>;

export type TGafa = z.infer<typeof zodGafaListingQuery>;

export type TProduct = z.infer<typeof zodProduct>;


const zodCollectiones = z.array(
  z.object({
    titulo: z.string(),
    descripcion: z.string(),
    imagen: z.object({
      url: z.string(),
      alt: z.string().optional().nullable(),
    }),
    productos: z.array(zodProduct),
  })
);

export type TColecciones = z.infer<typeof zodCollectiones>;

const zodListPage = z.object({
  listingContent: z.object({
    banners: z.array(zodBanner),
  }),

  perfumes: z.array(zodPerfumeListingQuery),

  relojes: z.array(zodRelojListingQuery),

  gafas: z.array(zodGafaListingQuery),

  colecciones: zodCollectiones,
});

export const getListingInitialLoadContent = async () => {
  try {
    const result = await sanityClient.fetch(listingMainString);

    // console.log(result.perfumes)

    const parsedResult = zodListPage.safeParse(result);

    if (!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }

    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};
