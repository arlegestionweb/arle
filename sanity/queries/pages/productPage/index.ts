import sanityClient from "@/sanity/sanityClient";
import { z } from "zod";
import { relojLujoSchema, relojPremiumSchema } from "../zodSchemas/reloj";
import { gafasLujoSchema, gafasPremiumSchema } from "../zodSchemas/gafas";
import { perfumeLujoSchema, perfumePremiumSchema } from "../zodSchemas/perfume";

type TProductType =
  | "relojesLujo"
  | "relojesPremium"
  | "perfumeLujo"
  | "perfumePremium"
  | "gafasLujo"
  | "gafasPremium";

const contenidoQuery = `
  "contenido": contenido {
    resena,
    "imagen": imagen {
      alt,
      "url": asset->url,
  }
}`;
const inspiracionQuery = `inspiracion { 
  usarInspiracion, 
  ${contenidoQuery}
}`;

const movimientoQuery = ` "movimiento": movimiento {
  usarMovimiento,
  "tipoDeMovimiento": tipoDeMovimiento -> titulo,
  "contenido": contenido {
    descripcion,
    "imagen": imagen {
      alt,
      "url": asset->url,
    }
  }
}`;

const bannersQuery = `"banners": bannersDeProducto [] {
  imagenOVideo,
  "imagen": imagen {
    alt,
    "url": asset->url,
  },
  "video": video.video {
    "url": asset->url,
  }
}`;

const variantesDeGafaQueryString = `
  variantes [] {
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
    precioConDescuento,
    unidadesDisponibles,
    "colorDelLente": colorDelLente -> {
      nombre,
      "color": color.hex
    },
    "imagenes": imagenes[]{
      alt,
      "url": asset->url,
    }, 
  }
`;
export const productQuery: Record<TProductType, string> = {
  relojesLujo: `{
    genero,
    mostrarCredito,
    "marca": marca->titulo,
    _type,
    _id,
    "detalles": detalles {
      usarDetalles,
      "contenido": contenido {
        texto,
        "imagen": imagen {
          alt,
          "url": asset->url,
        }
      }
    },
    "especificaciones": especificaciones {
      "tipoDeReloj": tipoDeReloj -> titulo,
      "estiloDeReloj": estiloDeReloj -> titulo,
      resistenciaAlAgua,
      "funciones": funciones [] -> {
        titulo,
        descripcion
      },
      "material": material -> nombre
    },
    "variantes": variantes[]{
      precioConDescuento,
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
      "colorTablero": colorTablero -> {
        nombre,
        "color": color.hex
      },
      _type,
    },
    "inspiracion": ${inspiracionQuery},    
    modelo,
    "garantia": garantia {
      meses,
    },
   ${movimientoQuery},
  "caja": caja { 
    diametro, 
    "material": material -> nombre, 
    "cristal": cristal -> titulo
  },
  coleccionDeMarca,
  descripcion,
  ${bannersQuery},
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
      "tipoDeMovimiento": tipoDeMovimiento -> titulo,
      "caja": caja { 
        diametro, 
        "material": material -> nombre, 
        "cristal": cristal -> titulo
      },
    },
    "genero": detallesReloj.genero,
    coleccionDeMarca
  }`,
  perfumeLujo: `{
    titulo,
    "inspiracion": ${inspiracionQuery},    
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
   ${bannersQuery},
   coleccionDeMarca
  }`,
  perfumePremium: `{ 
    "slug": slug.current,
    "detalles": detalles {
      "concentracion": concentracion -> nombre,
      resenaCorta,
    },
    "genero": detalles.genero,
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
    descripcion,
    coleccionDeMarca
  }`,
  gafasLujo: `{
    ${bannersQuery},
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
      meses, 
      descripcion
    },
    "inspiracion": ${inspiracionQuery},    
    "variantes": ${variantesDeGafaQueryString},
    modelo,
    "slug": slug.current,
    genero,
    "detalles": detalles {
      usarDetalles,
      "contenido": contenido {
        texto,
        "imagen": imagen {
          alt,
          "url": asset->url,
        }
      }
    },
    "monturaDetalles":  {
      usarDetalles,
     "detalles": detalles {
        "contenido": contenido {
          texto,
          "imagen": imagen {
            alt,
            "url": asset->url,
          }
        }
      },
      descripcion,
    },
    coleccionDeMarca
  }`,
  gafasPremium: `{
    _type,
    "marca": marca->titulo,
    _id,
    "variantes": ${variantesDeGafaQueryString},
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
    },
    coleccionDeMarca
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
  if (!product.success) {
    throw new Error(product.error.message);
  }

  return product.data;
};
