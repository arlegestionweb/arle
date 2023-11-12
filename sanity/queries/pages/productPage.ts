import sanityClient from "@/sanity/sanityClient"
import { z } from 'zod';

const productQuery = `
  {
    genero,
    mostrarCredito,
    "marca": marca->titulo,
    _type,
    _id,
    "detalles": detalles {
      ...,
      usarDetalles,
    },
    "variantes": variantes[]{
        precio,
        "colorTablero": colorTablero -> {
          nombre,
          "color": color.hex
        },
        "imagenes": imagenes[]{
          alt,
          "url": asset->url,
        },
        unidadesDisponibles,
        codigo,
        etiqueta,
        "colorCaja": colorCaja -> {
          nombre,
          "color": color.hex
        },
        "colorPulso": colorPulso -> {
          nombre,
          "color": color.hex
        },
        _type,
    },
    "inspiracion": inspiracion {
      usarInspiracion,
      ...
    },
    modelo,
    "garantia": garantia {
      meses,
    },
    "movimiento": movimiento {
      usarMovimiento,
      ...
    },
    "slug": slug.current,
  }
`


const colorSchema = z.object({
  nombre: z.string(),
  color: z.string(),
});

const imageSchema = z.object({
  alt: z.string(),
  url: z.string(),
});

const variantSchema = z.object({
  precio: z.string(),
  colorTablero: colorSchema,
  imagenes: z.array(imageSchema),
  unidadesDisponibles: z.number(),
  codigo: z.string(),
  etiqueta: z.string().nullable().optional(),
  colorCaja: colorSchema,
  colorPulso: colorSchema,
  _type: z.string(),
});

const productSchema = z.object({
  genero: z.string(),
  mostrarCredito: z.boolean(),
  marca: z.string(),
  _type: z.string(),
  _id: z.string(),
  detalles: z.object({
    usarDetalles: z.boolean(),
  }),
  variantes: z.array(variantSchema),
  inspiracion: z.object({
    usarInspiracion: z.boolean(),
  }),
  modelo: z.string(),
  garantia: z.object({
    meses: z.number(),
  }),
  movimiento: z.object({
    usarMovimiento: z.boolean(),
  }),
  slug: z.string(),
});

export type TProduct = z.infer<typeof productSchema>
export const getProductById = async (id: string, productType: string) => {
  console.log({id, productType});
  
  const fetchResult = await sanityClient.fetch(`*[_type == "${productType}" && _id == "${id}"][0]
  ${productQuery}`)

  
  const product = productSchema.safeParse(fetchResult)

  if (!product.success) {
    throw new Error(product.error.message)
  }

  return product.data
}