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
        codigoDeReferencia,
        registroInvima,
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
      codigoDeReferencia,
      registroInvima,
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
    titulo,
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
    "variantes": variantes[] {
      codigoDeReferencia,
      unidadesDisponibles,
      registroInvima,
      precioConDescuento,
      mostrarUnidadesDispobibles,
      tamano,
      precio
    },
    genero,
    _type,
    "slug": slug.current,
    _id,
    parteDeUnSet,
    "concentracion": concentracion -> nombre,
    "imagenes": imagenes[]{
        alt,
        "url": asset->url,
      },    
    "notasOlfativas": notasOlfativas {
      "notasDeBase": notasDeBase [] -> nombre,
      "notasDeSalida": notasDeSalida [] -> nombre,
      "familiaOlfativa": familiaOlfativa -> nombre,
      "notasDeCorazon": notasDeCorazon [] -> nombre
    },
    "ingredientes": ingredientes [] -> nombre,
    mostrarCredito,
    "marca": marca -> titulo,
    "descripcion": descripcion {
      texto,
      "imagen": imagen {
        alt,
        "url": asset->url,
      }
    },
    "paisDeOrigen": paisDeOrigen -> nombre,
    "banners": bannersDeProducto [] {
      imagenOVideo,
      "imagen": imagen {
        alt,
        "url": asset->url,
      },
      "video": video {
        "url": asset->url,
        alt
      }
    }
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
      registroInvima,
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
      codigoDeReferencia,
      registroInvima,
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
      codigoDeReferencia,
      registroInvima,
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

  
  const productSchema = schemas[productType];
  
  const product = productSchema.safeParse(fetchResult);
  // 
  // console.log({ product, error: product.error?.message });
  if (!product.success) {
    throw new Error(product.error.message);
  }
  
  return product.data;
};




