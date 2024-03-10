import sanityClient from "@/sanity/sanityClient";
import { bannersQuery, imageQuery } from "../objects";

import { z } from "zod";
import { productQuery, timedDiscountQuery } from "./productPage";
import { gafasLujoSchema, gafasPremiumSchema } from "./zodSchemas/gafas";
import { perfumeLujoSchema, perfumePremiumSchema } from "./zodSchemas/perfume";
import { relojLujoSchema, relojPremiumSchema } from "./zodSchemas/reloj";
import { zodColorSchema, zodTimedDiscountsSchema } from "./zodSchemas/general";
import { zodHomeSectionSchema } from "./homepageQuery";

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
      "date": createdAt, 
      _type,
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

export const zodCollectionsWithoutProducts = z.array(zodHomeSectionSchema);

export const zodProduct = z.union([
  zodPerfumeListingQuery,
  zodRelojListingQuery,
  zodGafaListingQuery,
]);

export const recommendedProductsSchema = z.object({
  productos: z.array(zodProduct),
});

export type TPerfume = z.infer<typeof zodPerfumeListingQuery>;
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
    
    // console.log({relojes: result.relojes[3]})
    const parsedResult = zodListPage.safeParse(result);

    if (!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }

    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTimedDiscountByProductId = async (productId: string) => {
  const params = { productId };

  const discounts = await sanityClient.fetch(timedDiscountQuery, params);

  const parsedDiscounts = zodTimedDiscountsSchema.safeParse(discounts);

  if (!parsedDiscounts.success) {
    throw new Error(parsedDiscounts.error.message);
  }

  parsedDiscounts.data?.sort(
    (a, b) =>
      new Date(a.duracion.fin).getTime() - new Date(b.duracion.fin).getTime()
  );
  const now = new Date().getTime();
  const activeDiscounts = parsedDiscounts.data?.filter(
    (discount) => new Date(discount.duracion.fin).getTime() > now
  );

  return { discount: activeDiscounts?.[0]};
};

export const getRecommendedProducts = async () => {
  try {
    const result = await sanityClient.fetch(`*[_type == "recomendados"][0]{
      "productos": productos[]->{
        "marca": marca->titulo,
        "date": createdAt, 
        _type,
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
      }  
    }`);

    const parsedResult = recommendedProductsSchema.safeParse(result);

    if (!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }




    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};
