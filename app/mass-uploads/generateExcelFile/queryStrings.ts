const codigoDeReferencia = `
  "codigoDeReferencia": {
    "order": 3,
    codigoDeReferencia
  }
`;
const titulo = `
  "titulo": {
    "order": 1,
    titulo
  }
`;
const modelo = `
  "modelo": {
    "order": 1,
    modelo
  }
`;

const marca = `
  "marca": marca -> {
    "order": 2,
    "nombre": titulo, 
    "reference": true, 
    "options": *[_type == "marca"] {"nombre": titulo}
  }
`;

const precio = `
  "precio": {
    "order": 5,
    precio
  }
`;

const precioConDescuento = `
"precioConDescuento": {
  "order": 6,
  precioConDescuento
}
`;
const unidadesDisponibles = `
  "unidadesDisponibles": {
    "order": 7,
    unidadesDisponibles
  }
`;

const notasOlfativas = `
  "notasOlfativas": notasOlfativas {
    "notasDeBase": notasDeBase [0] -> {
      nombre,
      "array": true,
      "options": *[_type == "notasOlfativas"] {nombre}
    },
    "notasDeSalida": notasDeSalida [0] -> {
      "array": true,
      nombre,
      "options": *[_type == "notasOlfativas"] {nombre}
    },
    "familiaOlfativa": familiaOlfativa -> {
      nombre,
      "reference": true,
      "options": *[_type == "familiasOlfativas"] {nombre}
    },
    "notasDeCorazon": notasDeCorazon [0] -> {
      "array": true,
      nombre,
      "options": *[_type == "notasOlfativas"] {nombre}
    },
  }
`;

const tag = `
  "etiqueta": {
    "nombre": "Etiqueta",
    "reference": true,
    "options": [
      {
        "nombre": "Nuevo"
      }, 
      {
        "nombre": "Mas Vendido"
      }, 
      {
        "nombre": "Super Descuento"
      }
    ]
  }
`;

const mostrarUnidadesDisponibles = `
  "mostrarUnidadesDisponibles": {
    "boolean": true,
  }
`;

const paisDeOrigen = `
  "paisDeOrigen": paisDeOrigen -> {
    nombre,
    "reference": true,
    "options": *[_type == "paisDeOrigen"] {nombre}
  }
`;

const mostrarCredito = `
  "mostrarCredito": {
    "boolean": true,
  }
`;
export const productQueryString: Record<string, string> = {
  perfumeLujo: `
   ${titulo},
    "inspiracion": {
      "usarInspiracion":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    'variante': variantes[0]{
      ${codigoDeReferencia},
      ${unidadesDisponibles},
      "registroInvima": {
        "order": 6,
        registroInvima
      },
      ${tag},
      ${precioConDescuento},
      ${mostrarUnidadesDisponibles},
      "tamano": {
        tamano
      },
      ${precio},
    },
    genero,
    "parteDeUnSet": {
      "boolean": true,
    },
    "concentracion": concentracion -> {
      "reference": true,
      nombre,
      "options": *[_type == "concentracion"] {nombre}
    },
    ${notasOlfativas},
    "ingredientes": ingredientes [0] -> {
      "array": true,
      nombre,
      "options": *[_type == "ingrediente"] {nombre}
    },
    ${mostrarCredito},
    ${marca},
    "descripcion": descripcion {
      texto,
      "imagen": imagen {
        alt,
        "url": asset->url,
      }
    },
    ${paisDeOrigen}, 
    coleccionDeMarca
    `,
  perfumePremium: `
    descripcion,
    "detalles": detalles {
      genero,
      "concentracion": concentracion -> {
        "reference": true,
        nombre,
        "options": *[_type == "concentracion"] {nombre}
      },
      resenaCorta,
      ${notasOlfativas}
    },
    ${titulo},
    ${mostrarCredito},
    ${marca},
    'variante': variantes[0]{
      tamano,
      ${tag},
      ${precio},
      ${codigoDeReferencia},
      "registroInvima": {
        "order": 6,
        registroInvima
      },
      ${unidadesDisponibles},
      ${mostrarUnidadesDisponibles},
      ${precioConDescuento}
    },
    "parteDeUnSet": {
      "boolean": true,
    },
    coleccionDeMarca
    `,
  gafasLujo: `
    ${marca},
    ${modelo},
    descripcion,
    genero,
    ${mostrarCredito},
    "garantia": garantia { 
      meses, 
      descripcion
    },
    "inspiracion": inspiracion {
      "usarInspiracion":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    "detalles": detalles {
      "usarDetalles":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    "monturaDetalles": monturaDetalles {
      "usarDetalles":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url
        }
      }
    },
    "especificaciones": especificaciones {
      ${paisDeOrigen}, 
      queIncluye,
      "tipoDeGafa": tipoDeGafa -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "tipoDeGafa"] {"nombre": titulo}
      },
      "estiloDeGafa": estiloDeGafa -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "estiloDeGafa"] {"nombre": titulo}
      },
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "formaDeLaMontura"] {"nombre": titulo}
        },
        "materialMontura": materialMontura -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDelMarco"] {"nombre": titulo}
        },
        "materialVarilla": materialVarilla -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDeLaVarilla"] {"nombre": titulo}
        },
      },
      "lente": lente {
        "material": material -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDelLente"] {"nombre": titulo}
        },
        "tipo": tipo -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "tipoDeLente"] {"nombre": titulo}
        },
      },
    },
    coleccionDeMarca,
    'variante': variantes[0] {
      ${codigoDeReferencia},
      "colorDelLente": colorDelLente -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorDeLaVarilla": colorDeLaVarilla -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorDeLaMontura": colorDeLaMontura -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      ${unidadesDisponibles},
      ${precio},
      ${precioConDescuento},
      ${tag},
      ${mostrarUnidadesDisponibles},
    }
  `,
  gafasPremium: `
  ${mostrarCredito},
  ${marca},
  "variante": variantes[0] {
      "colorDelLente": colorDelLente -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorDeLaVarilla": colorDeLaVarilla -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorDeLaMontura": colorDeLaMontura -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      ${precioConDescuento},
      ${codigoDeReferencia},
      ${unidadesDisponibles},
      ${precio},
      ${tag},
      ${mostrarUnidadesDisponibles}
    },
    ${modelo},
    genero,
    descripcion,
    "detalles": detalles {
      "tipoDeGafa": tipoDeGafa -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "tipoDeGafa"] {"nombre": titulo}
      },
      "estiloDeGafa": estiloDeGafa -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "estiloDeGafa"] {"nombre": titulo}
      },
      "lente": lente {
        "material": material -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDelLente"] {"nombre": titulo}
        },
        "tipo": tipo -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "tipoDeLente"] {"nombre": titulo}
        },
      },
      "montura": montura {
        "formaDeLaMontura": formaDeLaMontura -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "formaDeLaMontura"] {"nombre": titulo}
        },
        "materialMontura": materialMontura -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDelMarco"] {"nombre": titulo}
        },
        "materialVarilla": materialVarilla -> {
          "nombre": titulo,
          "reference": true,
          "options": *[_type == "materialDeLaVarilla"] {"nombre": titulo}
        },
      },
    },
    "garantia": garantia { 
      meses, 
      descripcion
    },
  `,
  relojesLujo: `
   ${mostrarCredito},
    genero,
    ${marca},
    "detalles": detalles {
      "usarDetalles":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    "especificaciones": especificaciones {
      "tipoDeReloj": tipoDeReloj -> {
        "nombre": titulo, 
        "reference": true,
        "options": *[_type == "tipoDeReloj"] {"nombre": titulo}
      },
      "estiloDeReloj": estiloDeReloj -> {
        "nombre": titulo, 
        "reference": true,
        "options": *[_type == "estiloDeReloj"] {"nombre": titulo}
      },
      resistenciaAlAgua,
      "funciones": {
        "nombre": "funciones",
        "array": true,
        "options": *[_type == "funcionDeReloj"] {"nombre": titulo},
      },
      "materialDelPulso": material -> {
        nombre,
        "reference": true,
        "options": *[_type == "materialDelPulso"] {nombre}
      }
    },
    "variante": variantes[0]{
      ${precioConDescuento},
      ${precio},
      "colorTablero": colorTablero -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      ${unidadesDisponibles},
      ${mostrarUnidadesDisponibles},
      ${codigoDeReferencia},
      ${tag},
      "colorCaja": colorCaja -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorPulso": colorPulso -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorTablero": colorTablero -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
    },
    "inspiracion": inspiracion {
      "usarInspiracion":  {
        "boolean": true,
      },
      "contenido":  {
        "resena": contenido.resena,
        "imagen":  {
          "alt": contenido.imagen.alt,
          "url": contenido.imagen.asset->url,
        }
      }
    },
    ${modelo},
    "garantia": garantia { 
      meses, 
      descripcion
    },
    "movimiento": movimiento {
      "usarMovimiento": {
        "boolean": true,
      },
      "tipoDeMovimiento": tipoDeMovimiento -> {
        "nombre": titulo,
        "reference": true,
        "options": *[_type == "tipoDeMovimiento"] {"nombre": titulo}
      },
      "contenido": contenido {
        descripcion,
        "imagen": imagen {
          alt,
          "url": asset->url,
        }
      }
    },
    "caja": caja {
      diametro,
      "material": material -> {
        nombre,
        "reference": true,
        "options": *[_type == "materialDeCaja"] {nombre}
      },
      "cristal": cristal -> {
        titulo,
        "reference": true,
        "options": *[_type == "cristal"] {"nombre": titulo}
      }
    },
    coleccionDeMarca,
    descripcion,
  `,
  relojesPremium: `
    ${mostrarCredito},
    "variante": variantes[0]{
      ${precio},
      ${precioConDescuento},
      "colorTablero": colorTablero -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      ${codigoDeReferencia},
      ${tag},
      ${unidadesDisponibles},
      ${mostrarUnidadesDisponibles},
      "colorCaja": colorCaja -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      },
      "colorPulso": colorPulso -> {
        nombre,
        "reference": true,
        "options": *[_type == "colores"] {nombre}
      }
    },
    ${modelo},
    descripcion,
    "garantia": garantia { 
      meses, 
      descripcion
    },
    ${marca},
    "detallesReloj": detallesReloj {
      "tipoDeReloj": tipoDeReloj -> {
        "nombre": titulo, 
        "reference": true,
        "options": *[_type == "tipoDeReloj"] {"nombre": titulo}
      },
      "estiloDeReloj": estiloDeReloj -> {
        "nombre": titulo, 
        "reference": true,
        "options": *[_type == "estiloDeReloj"] {"nombre": titulo}
      },
      "funciones": {
        "nombre": "funciones",
        "array": true,
        "options": *[_type == "funcionDeReloj"] {"nombre": titulo},
      },
      resistenciaAlAgua,
      "material": material -> nombre,
      "tipoDeMovimiento": tipoDeMovimiento -> titulo,
      "caja": caja {
        diametro,
        "materialDelPulso": material -> {
          nombre,
          "reference": true,
          "options": *[_type == "materialDelPulso"] {nombre}
        },
        "cristal": cristal -> {
          titulo,
          "reference": true,
          "options": *[_type == "cristal"] {"nombre": titulo}
        }
      },
    },
    "genero": detallesReloj.genero,
    coleccionDeMarca
  `,
};
