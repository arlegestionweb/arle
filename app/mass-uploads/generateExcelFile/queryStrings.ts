const notasOlfativas = `
  "notasOlfativas": notasOlfativas {
    "notasDeBase": notasDeBase [] -> {
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
  "tag": {
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

const codigoDeProducto = `
  "codigoDeProducto": {
    "order": 1,
    "codigoDeProducto": _id
  }
`;

const titulo = `
  "titulo": {
    "order": 3,
    titulo
  }
`;
const modelo = `
  "modelo": {
    "order": 3,
    modelo
  }
`;

const codigoDeReferencia = `
  "codigoDeReferencia": {
    "order": 2,
    codigoDeReferencia
  }
`;

const unidadesDisponibles = `
  "unidadesDisponibles": {
    "order": 7,
    unidadesDisponibles
  }
`;

const precioConDescuento = `
  "precioConDescuento": {
    "order": 6,
    precioConDescuento
  }
`;

const mostrarUnidadesDisponibles = `
  "mostrarUnidadesDisponibles": {
    "boolean": true,
  }
`;

const precio = `
  "precio": {
    "order": 5,
    precio
  }
`;

const paisDeOrigen = `
  "paisDeOrigen": paisDeOrigen -> {
    nombre,
    "reference": true,
    "options": *[_type == "paisDeOrigen"] {nombre}
  }
`;

const marca = `
  "marca": marca -> {
    "order": 4,
    "nombre": titulo, 
    "reference": true, 
    "options": *[_type == "marca"] {"nombre": titulo}
  }
`;

const mostrarCredito = `
  "mostrarCredito": {
    "boolean": true,
  }
`;
export const productQueryString: Record<string, string> = {
  perfumeLujo: `
    ${codigoDeProducto},
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
    ${codigoDeProducto},
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
    ${paisDeOrigen}, 
    coleccionDeMarca
    `,
  gafasLujo: `
    ${codigoDeProducto},
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
  ${codigoDeProducto},
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
    ${codigoDeProducto},
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
      "resistenciaAlAgua": {
        "boolean": true,
      },
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
    ${codigoDeProducto},
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
      },,
      "resistenciaAlAgua": {
        "boolean": true,
      },
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
