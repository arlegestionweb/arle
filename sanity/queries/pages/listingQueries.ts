import sanityClient from "@/sanity/sanityClient";
import { bannersQuery, imageArrayQuery, imageQuery } from "../objects";

import { z } from "zod";

const commonProductItems = `
  "marca": marca->titulo,
  "type": _type,
  "slug": slug.current,
  "genero": coalesce(genero, detalles.genero, detallesReloj.genero),
  _id
`;

const listingMainString = ` 
{
  "listingContent": *[_type == "listing"][0]{
    ${bannersQuery}
  },
  "perfumes": *[_type == "perfumeLujo" || _type == "perfumePremium"] {
    titulo,
    ${commonProductItems},
    ${imageArrayQuery},
    "variantes": variantes[]{
      precio,
      unidadesDisponibles,
      tamano,
      etiqueta,
      codigoDeReferencia,
      registroInvima
    },
  },
  "relojes": *[_type == "relojesLujo" || _type == "relojesPremium"] {
    ${commonProductItems},
    modelo,
    "variantes": variantes[]{
      precio,
      unidadesDisponibles,
      etiqueta,
      ${imageArrayQuery},
      "colorCaja": colorCaja->{
        nombre,
        "color": color.hex
      },
      "colorTablero": colorTablero->{
        nombre,
        "color": color.hex
      },
      "colorPulso": colorPulso-> {
        nombre,
        "color": color.hex
      },
      codigoDeReferencia,
      registroInvima
    },
  },
  "gafas": *[_type == "gafasLujo" || _type == "gafasPremium"] {
    ${commonProductItems},
    "variantes": variantes []{
      precio,
      etiqueta,
      unidadesDisponibles,
      "imagenes": imagenes[]{
        alt,
        "url": asset->url,
      },
      "colorDeLaMontura": colorDeLaMontura->{
        nombre,
        "color": color.hex
      },
      "colorDelLente": colorDelLente->{
        nombre,
        "color": color.hex
      },
      "colorDeLaVarilla": colorDeLaVarilla->{
        nombre,
        "color": color.hex
      },
      codigoDeReferencia,
      registroInvima
    },
    modelo,
  },
  "colecciones": *[_type == "colecciones"] {
    titulo,
    descripcion,
    ${imageQuery},
    "productos": productos[]->{
      "marca": marca->titulo,
      "type": _type,
      modelo,
      titulo,
    }
  },
  
}
`;
const zodColorSchema = z.object({
  nombre: z.string(),
  color: z.string(),
});

const zodCommonProductItems = z.object({
  marca: z.string(),
  type: z.string(),
  slug: z.string(),
  genero: z.string(),
  _id: z.string(),
});
export type TColor = z.infer<typeof zodColorSchema>;

const zodVarianteGafa = z.object({
  precio: z.string(),
  etiqueta: z.string(),
  unidadesDisponibles: z.number(),
  imagenes: z.array(
    z.object({
      alt: z.string().optional().nullable(),
      url: z.string(),
    })
  ),
  colorDeLaMontura: zodColorSchema,
  colorDelLente: zodColorSchema,
  colorDeLaVarilla: zodColorSchema,
  codigoDeReferencia: z.string(),
  registroInvima: z.string(),
});

export type TVarianteGafa = z.infer<typeof zodVarianteGafa>;

const zodGafaListingQuery = zodCommonProductItems.merge(
  z.object({
    variantes: z.array(zodVarianteGafa),
    modelo: z.string(),
  })
);

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

const zodPerfumeListingQuery = zodCommonProductItems.merge(
  z.object({
    titulo: z.string(),
    imagenes: z.array(
      z.object({
        url: z.string(),
        alt: z.string().optional().nullable(),
      })
    ),
    variantes: z.array(zodVariantePerfume),
  })
);

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
export type TVarianteReloj = z.infer<typeof zodVarianteReloj>;

const zodRelojListingQuery = zodCommonProductItems.merge(
  z.object({
    modelo: z.string(),
    variantes: z.array(zodVarianteReloj),
  })
);

export type TReloj = z.infer<typeof zodRelojListingQuery>;

export type TGafa = z.infer<typeof zodGafaListingQuery>;

export const isPerfume = (product: TProduct): product is TPerfume =>
  product.type.includes("perfume");
export const isReloj = (product: TProduct): product is TReloj =>
  product.type.includes("reloj");
export const isGafa = (product: TProduct): product is TGafa =>
  product.type.includes("gafa");

const zodProduct = z.union([
  zodPerfumeListingQuery,
  zodRelojListingQuery,
  zodGafaListingQuery,
]);

export type TProduct = z.infer<typeof zodProduct>;

const zodColeccionProducto = z.object({
  marca: z.string(),
  type: z.string(),
  modelo: z.string().optional().nullable(),
  titulo: z.string().optional().nullable(),
  titulos: z.string().optional(),
  imagenes: z
    .array(
      z.object({
        url: z.string(),
        alt: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
});

const zodCollectiones = z.array(
  z.object({
    titulo: z.string(),
    descripcion: z.string(),
    imagen: z.object({
      url: z.string(),
      alt: z.string().optional().nullable(),
    }),
    productos: z.array(zodColeccionProducto),
  })
);

export type TColecciones = z.infer<typeof zodCollectiones>;

const zodListPage = z.object({
  listingContent: z.object({
    banners: z.array(zodBanner),
  }),

  perfumes: z.array(zodPerfumeListingQuery),

  relojes: z.array(zodRelojListingQuery),

  gafas: z.array(zodGafaListingQuery).optional(),

  colecciones: zodCollectiones,
});

export const getListingInitialLoadContent = async () => {
  try {
    const result = await sanityClient.fetch(listingMainString);

    console.log(result.perfumes)
    const parsedResult = zodListPage.safeParse(result);

    if (!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }

    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};
