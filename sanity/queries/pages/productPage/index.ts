import sanityClient from "@/sanity/sanityClient";
import { z } from "zod";
import { relojLujoSchema, relojPremiumSchema } from "../zodSchemas/reloj";
import { gafasLujoSchema, gafasPremiumSchema } from "../zodSchemas/gafas";
import { perfumeLujoSchema, perfumePremiumSchema } from "../zodSchemas/perfume";
import { zodTimedDiscountsSchema } from "../zodSchemas/general";

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

const bannersQuery = `
"banners": bannersDeProducto [] {
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
    mostrarUnidadesDisponibles,
    "colorDeLaMontura": colorDeLaMontura -> {
      nombre,
      "color": color.hex
    },
    tag,
    "colorDeLaVarilla": colorDeLaVarilla -> {
      nombre,
      "color": color.hex
    },
    codigoDeReferencia,
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

const garantiaQuery = `  
  "garantia": garantia { 
    meses, 
    descripcion
}`;

export const productQuery: Record<TProductType, string> = {
  relojesLujo: `{
    "date": _createdAt,
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
      mostrarUnidadesDisponibles,
      codigoDeReferencia,
      tag,
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
    ${garantiaQuery},
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
    "date": _createdAt,
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
      tag,
      unidadesDisponibles,
      mostrarUnidadesDisponibles,
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
    descripcion,
    "slug": slug.current,
    ${garantiaQuery},
    _type,
    "marca": marca->titulo,
    "detallesReloj": detallesReloj {
      "tipoDeReloj": tipoDeReloj -> titulo,
      "estiloDeReloj": estiloDeReloj -> titulo,
      "funciones": funciones [] -> {
        titulo,
        descripcion
      },
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
    "date": _createdAt,
    titulo,
    "inspiracion": ${inspiracionQuery},    
    "variantes": variantes[] {
      codigoDeReferencia,
      unidadesDisponibles,
      registroInvima,
      tag,
      precioConDescuento,
      mostrarUnidadesDisponibles,
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
        ...,
        alt,
        "url": asset->url,
      }
    },
    "paisDeOrigen": paisDeOrigen -> nombre,
   ${bannersQuery},
   coleccionDeMarca
  }`,
  perfumePremium: `{ 
    "date": _createdAt,
    "slug": slug.current,
    "detalles": detalles {
      "concentracion": concentracion -> nombre,
      resenaCorta,
      "notasOlfativas": notasOlfativas {
        "notasDeBase": notasDeBase [] -> nombre,
        "notasDeSalida": notasDeSalida [] -> nombre,
        "familiaOlfativa": familiaOlfativa -> nombre,
        "notasDeCorazon": notasDeCorazon [] -> nombre
      },
      
    },
    "genero": detalles.genero,
    _id,
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
      tag,
      precio,
      codigoDeReferencia,
      registroInvima,
      unidadesDisponibles,
      mostrarUnidadesDisponibles,
    },
    parteDeUnSet,
    descripcion,
    coleccionDeMarca
  }`,
  gafasLujo: `{
    "date": _createdAt,
    _id,
    _type,
    "marca": marca->titulo,
    modelo,
    descripcion,
    genero,
    mostrarCredito,
    ${garantiaQuery},
    "inspiracion": ${inspiracionQuery},    
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
    "monturaDetalles": monturaDetalles {
      usarDetalles,
        "contenido": contenido {
          texto,
          "imagen": imagen {
            alt,
            "url": asset->url,
          }
        },
    },
    ${bannersQuery},
    "especificaciones": especificaciones {
      "paisDeOrigen": paisDeOrigen -> nombre,
      queIncluye,
      "tipoDeGafa": tipoDeGafa -> titulo,
      "estiloDeGafa": estiloDeGafa -> titulo,
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> titulo,
        "materialMontura": materialMontura -> titulo,
        "materialVarilla": materialVarilla -> titulo,
      },
      "lente": lente {
        "material": material -> titulo,
        "tipo": tipo -> titulo,
      },
    },
    "inspiracion": ${inspiracionQuery},    
    modelo,
    coleccionDeMarca,
    "slug": slug.current,
  }`,
  gafasPremium: `{
    "date": _createdAt,
    _type,
    "marca": marca->titulo,
    _id,
    "variantes": variantes[] {
      "colorDelLente": colorDelLente -> {
        nombre,
        "color": color.hex
      },
      "colorDeLaVarilla": colorDeLaVarilla -> {
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
      unidadesDisponibles,
      precio,
      tag,
      mostrarUnidadesDisponibles
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
    ${garantiaQuery}
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

export const timedDiscountQuery = `*[_type == "descuentos" && $productId in productos[]._ref]{
  "productos": productos[] -> _id,
  porcentaje,
  titulo,
  texto,
  duracion
}`;

export const getProductById = async (id: string, productType: TProductType) => {
  const query = productQuery[productType];

  const fetchResult =
    await sanityClient.fetch(`*[_type == "${productType}" && _id == "${id}"][0]
  ${query}`);
  const productSchema = schemas[productType];

  const params = { productId: id };

  const discounts = await sanityClient.fetch(timedDiscountQuery, params);

  const product = productSchema.safeParse(fetchResult);

  const parsedDiscounts = zodTimedDiscountsSchema.safeParse(discounts);
  //

  if (!parsedDiscounts.success) {
    throw new Error(parsedDiscounts.error.message);
  }

  if (!product.success) {
    throw new Error(product.error.message);
  }
  parsedDiscounts.data?.sort(
    (a, b) =>
      new Date(a.duracion.fin).getTime() - new Date(b.duracion.fin).getTime()
  );
  const now = new Date().getTime();

  const activeDiscounts = parsedDiscounts.data?.filter(
    (discount) => new Date(discount.duracion.fin).getTime() > now
  );

  return {
    product: product.data,
    discount: activeDiscounts && activeDiscounts[0],
  };
};




