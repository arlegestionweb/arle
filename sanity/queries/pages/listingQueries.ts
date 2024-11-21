import sanityClient from "@/sanity/sanityClient";
import { bannersQuery, imageQuery } from "../objects";

import { z } from "zod";
import { productQuery, timedDiscountQuery } from "./productPage";
import { gafasLujoSchema, gafasPremiumSchema } from "./zodSchemas/gafas";
import { perfumeLujoSchema, perfumePremiumSchema } from "./zodSchemas/perfume";
import { relojLujoSchema, relojPremiumSchema } from "./zodSchemas/reloj";
import { imageSchema, zodColorSchema, zodTimedDiscountsSchema } from "./zodSchemas/general";
import { zodHomeSectionSchema } from "./homepageQuery";

const listingMainString = ` 
{
  "listingContent": *[_type == "listing"][0]{
    ${bannersQuery},
    "generalBanners": generalBanners[] {
      titulo,
      descripcion,
      "imagen": imagen {
        alt,
        "url": asset->url
      },
      "video": video {
        "url": asset->url
      }
    },
    "perfumesBanners": perfumesBanners[] {
      titulo,
      descripcion,
      "imagen": imagen {
        alt,
        "url": asset->url
      },
      "video": video {
        "url": asset->url
      }
    },
    "gafasBanners": gafasBanners[] {
      titulo,
      descripcion,
      "imagen": imagen {
        alt,
        "url": asset->url
      },
      "video": video {
        "url": asset->url
      }
    },
    "relojesBanners": relojesBanners[] {
      titulo,
      descripcion,
      "imagen": imagen {
        alt,
        "url": asset->url
      },
      "video": video {
        "url": asset->url
      }
    },
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
    "date": _updatedAt,
    ${imageQuery},
    "productos": productos[]->{
      "marca": marca->titulo,
      "date": _updatedAt, 
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
  titulo: z.string().optional()
  .nullable(),
  descripcion: z.string().optional()
  .nullable(),
  imagen: z
    .object({
      alt: z.string().optional()
      .nullable(),
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

export const zodCollectionsWithoutProducts = z.array(z.object({
  titulo: z.string(),
  descripcion: z.string(),
  imagen: imageSchema,
  date: z.string(),
}));

export const zodProduct = z.union([
  zodPerfumeListingQuery,
  zodRelojListingQuery,
  zodGafaListingQuery,
]);

export const recommendedProductsSchema = z.object({
  productos: z.array(zodProduct),
}).optional().nullable();

export type TPerfume = z.infer<typeof zodPerfumeListingQuery>;
export type TReloj = z.infer<typeof zodRelojListingQuery>;
export type TGafa = z.infer<typeof zodGafaListingQuery>;

export type TProduct = z.infer<typeof zodProduct>;

const zodCollectiones = z.array(
  z.object({
    titulo: z.string(),
    descripcion: z.string().optional().nullable(),
    date: z.string(),
    imagen: z.object({
      url: z.string(),
      alt: z.string().optional().nullable(),
    }),
    productos: z.array(zodProduct),
  })
);

export type TColecciones = z.infer<typeof zodCollectiones>;

const listingContent = z.object({
  banners: z.array(zodBanner).optional().nullable(),
  generalBanners: z.array(zodBanner).optional().nullable(),
  perfumesBanners: z.array(zodBanner).optional().nullable(),
  gafasBanners: z.array(zodBanner).optional().nullable(),
  relojesBanners: z.array(zodBanner).optional().nullable(),
});

const zodListPage = z.object({
  listingContent,

  perfumes: z.array(zodPerfumeListingQuery),

  relojes: z.array(zodRelojListingQuery),

  gafas: z.array(zodGafaListingQuery),

  colecciones: zodCollectiones.optional().nullable(),
});

export type TlistingContent = z.infer<typeof listingContent>

export const getListingInitialLoadContent = async () => {
  try {
    const result = await sanityClient.fetch(listingMainString);

    const parsedResult = zodListPage.safeParse(result);

    if (!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }

    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};

const zodBannerByBrandSchema = z.object({
    banners: z.array(
      z.object({
        imagen: z.object({
          alt: z.string().optional().nullable(),
          url: z.string(),
        })
      })
    ).optional().nullable()
  })

type TBrandBanner = z.infer<typeof zodBannerByBrandSchema>

const bannerBrandParser = z.array(zodBannerByBrandSchema)

export type TBannerBrands = z.infer<typeof bannerBrandParser>

export const getBannersByBrands = async (marcasSeleccionadas: string[] | null) => {
  if(marcasSeleccionadas === null) return
  
  const bannersArray: TBrandBanner[] = await Promise.all(marcasSeleccionadas.map(async brand => {
    const bannersDeMarcasQueryString = `
    *[_type == "marca" && titulo == "${brand}" ][0] {
      "banners" : banners[] {
        "imagen": imagen {
          alt,
          "url": asset->url
        }
      }
    }
    `;
    const marcas = await sanityClient.fetch(bannersDeMarcasQueryString);
    return marcas;
  }));
  
  const parser = bannerBrandParser.safeParse(bannersArray);

  if(!parser.success) return null

  return parser.data;
}


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

  return { discount: activeDiscounts?.[0] };
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
