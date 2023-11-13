import sanityClient from "@/sanity/sanityClient";
import { z } from "zod";
import {
  gafasLujoSchema,
  gafasPremiumSchema,
  perfumeLujoSchema,
  perfumePremiumSchema,
  relojLujoSchema,
  relojPremiumSchema,
} from "../zodSchemas";

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
  gafasLujo: `{
    mostrarCredito,
    "especificaciones": especificaciones {
      "tipoDeGafa": tipoDeGafa -> titulo,
      "estiloDeGafa": estiloDeGafa -> titulo,
      "lente": lente {
        "tipo": tipo -> titulo,
        "material": material -> titulo,
      },
      queIncluye,
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> titulo,
        "materialMontura": materialMontura -> titulo,
        "materialVarilla": materialVarilla -> titulo,
      },
      "paisDeOrigen": paisDeOrigen -> nombre
    },
    _id,
    descripcion,
    "marca": marca->titulo,
    _type,
    "garantia": garantia { 
      meses 
    },
    "inspiracion": inspiracion { 
      usarInspiracion, 
      "contenido": contenido {
        resena,
        "imagen": imagen {
          alt,
          "url": asset->url,
        }
      } 
    },
    "variantes": variantes [] {
      mostrarUnidadesDispobibles,
      "colorDeLaMontura": colorDeLaMontura -> {
        nombre,
        "color": color.hex
      },
      etiqueta,
      "colorDeLaVarilla": colorDeLaVarilla -> {
        nombre,
        "color": color.hex
      },
      codigo,
      precio,
      unidadesDisponibles,
      "colorDelLente": colorDelLente -> {
        nombre,
        "color": color.hex
      },
      "imagenes": imagenes[]{
        alt,
        "url": asset->url,
      }, 
    },
    modelo,
    "slug": slug.current,
    genero
  }`,
  gafasPremium: `{
    _type,
    "marca": marca->titulo,
    _id,
    "variantes": variantes[] {
      "colorDelLente": colorDelLente -> {
        nombre,
        "color": color.hex
      },
      "colorDeLaMontura": colorDeLaMontura -> {
        nombre,
        "color": color.hex
      },
      "imagenes": imagenes[] {
        alt,
        "url": asset->url,
      },
      codigo,
      unidadesDisponibles,
      precio,
      etiqueta,
      mostrarUnidadesDispobibles
    },
    modelo,
    "slug": slug.current, 
    genero,
    descripcion,
    "detalles": detalles {
      "tipoDeGafa": tipoDeGafa -> titulo,
      "estiloDeGafa": estiloDeGafa -> titulo,
      "lente": lente {
        "tipo": tipo -> titulo,
        "material": material -> titulo,
      },
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> titulo,
        "materialMontura": materialMontura -> titulo,
        "materialVarilla": materialVarilla -> titulo,
      }
    },
    "garantia": garantia { 
      meses
    }
  }`,
};

const schemas: Record<TProductType, z.ZodSchema<any>> = {
  relojesLujo: relojLujoSchema,
  relojesPremium: relojPremiumSchema,
  gafasLujo: gafasLujoSchema,
  gafasPremium: gafasPremiumSchema,
  perfumeLujo: perfumeLujoSchema,
  perfumePremium: perfumePremiumSchema,
};

export const getProductById = async (id: string, productType: TProductType) => {
  const query = productQuery[productType];

  const fetchResult =
    await sanityClient.fetch(`*[_type == "${productType}" && _id == "${id}"][0]
  ${query}`);

  // console.log({ fetchResult, detalles: fetchResult.detalles.montura });

  const productSchema = schemas[productType];

  const product = productSchema.safeParse(fetchResult);

  if (!product.success) {
    throw new Error(product.error.message);
  }

  return product.data;
};
