import sanityClient from "@/sanity/sanityClient";
import { bannersQuery, imageArrayQuery, imageQuery } from "../objects";

import { z } from "zod";

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
    "marca": marca->titulo,
    _id,
    "variantes": variantes []{
      precio,
      etiqueta,
      unidadesDisponibles,
      "imagenes": imagenes[]{
        alt,
        "url": asset->url,
      },
    },
    modelo,
    "type": _type,
    "slug": slug.current
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
});

export type TVarianteGafa = z.infer<typeof zodVarianteGafa>;

const zodGafaListingQuery = z.object({
  marca: z.string(),
  _id: z.string(),
  variantes: z.array(zodVarianteGafa),
  modelo: z.string(),
  type: z.string(),
  slug: z.string(),
});

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
});

export type TVariantePerdume = z.infer<typeof zodVariantePerfume>;

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
  variantes: z.array(zodVariantePerfume),
  slug: z.string(),
});

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
});
export type TVarianteReloj = z.infer<typeof zodVarianteReloj>;

const zodRelojListingQuery = z.object({
  marca: z.string(),
  modelo: z.string(),
  type: z.string(),
  variantes: z.array(zodVarianteReloj),
  slug: z.string(),
});

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

    const parsedResult = zodListPage.safeParse(result);

    if (!parsedResult.success) {
      throw new Error(parsedResult.error.message);
    }
    console.log({
      gafa: parsedResult.data.gafas,
      variantes: parsedResult.data.gafas?.map((producto) =>
        JSON.stringify({ ...producto.variantes })
      ),
    });

    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};
