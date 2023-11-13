import sanityClient from "@/sanity/sanityClient";
import { z } from "zod";
import { perfumeLujoSchema, perfumePremiumSchema, relojLujoSchema, relojPremiumSchema } from "../zodSchemas";

type TProductType =
  | "relojesLujo"
  | "relojesPremium"
  | "perfumeLujo"
  | "perfumePremium"
  | "gafasLujo"
  | "gafasPremium";

const productQuery: Record<TProductType, string> = {
  relojesLujo: `{
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
`,
  relojesPremium: `{
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
      codigo,
      etiqueta,
      unidadesDisponibles,
      "colorCaja": colorCaja -> { 
        nombre, 
        "color": color.hex
       },
      "colorPulso": colorPulso -> { 
        nombre, 
        "color": color.hex
      }
    },
    _id,
    modelo,
    "slug": slug.current,
    "garantia": garantia { meses, descripcion },
    _type,
    "marca": marca->titulo,
    "detallesReloj": detallesReloj {
      "tipoDeReloj": tipoDeReloj -> titulo,
      "estiloDeReloj": estiloDeReloj -> titulo,
      resistenciaAlAgua,
      "material": material -> nombre,
      genero,
      "tipoDeMovimiento": tipoDeMovimiento -> titulo
    }
  }`,
  perfumeLujo: `{
    "inspiracion": inspiracion { 
      usarInspiracion, 
      "contenido": contenido {...}
     },
    "notasOlfativas": notasOlfativas { 
      "familiaOlfativa": familiaOlfativa {...}
    },
    titulo,
    mostrarCredito,
    "concentracion": concentracion -> nombre,
    "descripcion": descripcion {
      texto,
      "imagen": imagen {
        alt,
        "url": asset->url,
      }
    },
    "marca": marca -> titulo,
    _id,
    "slug": slug.current,
    "variantes": variantes[] {...},
    parteDeUnSet,
    "imagenes": imagenes[]{
      alt,
      "url": asset->url,
    },
    _type,
    genero
  }`,
  perfumePremium: `{ 
    "slug": slug.current,
    "detalles": detalles {
      "concentracion": concentracion -> nombre,
      resenaCorta,
      genero
    },
    titulo,
    _type,
    mostrarCredito,
    "imagenes": imagenes[]{
      alt,
      "url": asset->url,
    },
    "marca": marca->titulo,
    "variantes": variantes[]{
      tamano,
      etiqueta,
      precio,
      codigoDeReferencia,
      unidadesDisponibles,
    },
    parteDeUnSet,
    descripcion
  }`,
  gafasLujo: `{...}`,
  gafasPremium: `{...}`,
};


const schemas: Record<TProductType, z.ZodSchema<any>> = {
  relojesLujo: relojLujoSchema,
  relojesPremium: relojPremiumSchema,
  gafasLujo: z.object({}),
  gafasPremium: z.object({}),
  perfumeLujo: perfumeLujoSchema,
  perfumePremium: perfumePremiumSchema,
};


export const getProductById = async (id: string, productType: TProductType) => {
  const query = productQuery[productType];

  const fetchResult =
    await sanityClient.fetch(`*[_type == "${productType}" && _id == "${id}"][0]
  ${query}`);

  const productSchema = schemas[productType];

  console.log({fetchResult})

  const product = productSchema.safeParse(fetchResult);

  // console.log({productParsing: product});
  
  if (!product.success) {
    throw new Error(product.error.message);
  }

  return product.data;
};
