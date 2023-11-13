import sanityClient from "@/sanity/sanityClient";
import {
  bannersQuery,
  imageArrayQuery,
  imageQuery,
  marcaTipoModeloQuery,
} from "../objects";

import { z } from "zod";
import { parse } from "path";

const listingMainString = ` 
{
  "listingContent": *[_type == "listing"][0]{
    ${bannersQuery}
  },
  "perfumes": *[_type == "perfumeLujo" || _type == "perfumePremium"] {
    titulo,
    "marca": marca->titulo,
    "type": _type,
    ${imageArrayQuery},
    "variantes": variantes[]{
      precio,
      unidadesDisponibles,
      tamano,
      etiqueta
    },
    "slug": slug.current,
  },
  "relojes": *[_type == "relojesLujo" || _type == "relojesPremium"] {
    "marca": marca->titulo,
    modelo,
    "type": _type,
    "variantes": variantes[]{
      precio,
      unidadesDisponibles,
      etiqueta,
      ${imageArrayQuery},
    },
    "slug": slug.current,
  },
  "gafas": *[_type == "gafasLujo" || _type == "gafasPremium"] {
    ...,
    "type": _type,
    "slug": slug.current,
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

const zodPerfumeListingQuery = z.object({
  titulo: z.string(),
  marca: z.string(),
  type: z.string(),
  imagenes: z.array(
    z.object({
      url: z.string(),
      alt: z.string().optional().nullable(),
    })
  ),
  variantes: z.array(
    z.object({
      precio: z.string().transform((val) => Number(val)),
      unidadesDisponibles: z.number(),
      tamano: z.number(),
      etiqueta: z.string().optional().nullable(),
    })
  ),
  slug: z.string(),
});

export type TPerfume = z.infer<typeof zodPerfumeListingQuery>;

const zodRelojListingQuery = z.object({
  marca: z.string(),
  modelo: z.string(),
  type: z.string(),
  variantes: z.array(
    z.object({
      precio: z.string().transform((val) => Number(val)),
      unidadesDisponibles: z.number(),
      etiqueta: z.string().optional().nullable(),
      imagenes: z.array(
        z.object({
          url: z.string(),
          alt: z.string().optional().nullable(),
        })
      ),
    })
  ),
  slug: z.string(),
});

export type TReloj = z.infer<typeof zodRelojListingQuery>;

const zodGafaListingQuery = z.object({
  slug: z.string(),
  type: z.string(),
});

export type TGafa = z.infer<typeof zodGafaListingQuery>;

export const isPerfume = (product: TProduct): product is TPerfume => product.type.includes("perfume");  
export const isReloj = (product: TProduct): product is TReloj => product.type.includes("reloj");
export const isGafa = (product: TProduct): product is TGafa => product.type.includes("gafa");

const zodProduct = z.union([zodPerfumeListingQuery, zodRelojListingQuery, zodGafaListingQuery]);

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


const zodCollectiones =  z.array(
  z.object({
    titulo: z.string(),
    descripcion: z.string(),
    imagen: z.object({
      url: z.string(),
      alt: z.string().optional().nullable(),
    }),
    productos: z.array(zodColeccionProducto),
  })
)

export type TColecciones = z.infer<typeof zodCollectiones>;

const zodListPage = z.object({
  listingContent: z.object({
    banners: z.array(zodBanner),
  }),

  perfumes: z.array(zodPerfumeListingQuery),

  relojes: z.array(zodRelojListingQuery),

  gafas: z.array(zodGafaListingQuery).optional(),

  colecciones: zodCollectiones
});


export const getListingInitialLoadContent = async () => {
  try {
    const result = await sanityClient.fetch(listingMainString);

    console.log(result.listingContent.banners);
    

    const parsedResult = zodListPage.safeParse(result);

    if (!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }

    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};
