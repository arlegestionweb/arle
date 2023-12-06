import { z } from "zod";

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
  codigoDeReferencia: z.string(),
  registroInvima: z.string(),
  etiqueta: z.string().nullable().optional(),
  colorCaja: colorSchema,
  colorPulso: colorSchema,
});


const generoSchema = z.string();
// const generoSchema = z.union([
//   z.literal("hombre"),
//   z.literal("mujer"),
//   z.literal("unisex"),
// ]);


const detallesRelojSchema = z.object({
  tipoDeReloj: z.string(),
  estiloDeReloj: z.string(),
  resistenciaAlAgua: z.string(),
  material: z.string(),
  genero: z.string(),
  tipoDeMovimiento: z.string(),
});



const garantiaSchema = z.object({
  meses: z.number(),
  descripcion: z.string().nullable().optional(),
});


export const relojLujoSchema = z.object({
  genero: generoSchema,
  mostrarCredito: z.boolean(),
  marca: z.string(),
  _type: z.literal("relojesLujo"),
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

export const relojPremiumSchema = z.object({
  _type: z.literal("relojesPremium"),
  _id: z.string(),
  marca: z.string(),
  modelo: z.string(),
  descripcion: z.string().nullable().optional(),
  variantes: z.array(variantSchema),
  garantia: garantiaSchema,
  detallesReloj: detallesRelojSchema,
  slug: z.string(),
});

export const perfumePremiumSchema = z.object({
  slug: z.string(),
  detalles: z.object({
    concentracion: z.string(),
    resenaCorta: z.string().nullable().optional(),
    genero: z.string(),
  }),
  titulo: z.string(),
  _type: z.literal("perfumePremium"),
  mostrarCredito: z.boolean(),
  imagenes: z.array(
    z.object({
      alt: z.string(),
      url: z.string(),
    })
  ),
  marca: z.string(),
  variantes: z.array(
    z.object({
      tamano: z.number(),
      etiqueta: z.string().optional().nullable(),
      precio: z.string(),
      codigoDeReferencia: z.string(),
      registroInvima: z.string(),
      unidadesDisponibles: z.number(),
    })
  ),
  parteDeUnSet: z.boolean(),
  descripcion: z.string(),
});

export const perfumeLujoSchema = z.object({
  inspiracion: z.object({
    usarInspiracion: z.boolean(),
    contenido: z.object({
      // replace with actual structure
    }),
  }),
  notasOlfativas: z.object({
    familiaOlfativa: z.object({
      // replace with actual structure
    }),
  }),
  titulo: z.string(),
  mostrarCredito: z.boolean(),
  concentracion: z.string(),
  descripcion: z.object({
    texto: z.string(),
    imagen: z.object({
      alt: z.string(),
      url: z.string(),
    }),
  }),
  marca: z.string(),
  _id: z.string(),
  slug: z.string(),
  variantes: z.array(
    z.object({
      // replace with actual structure
    })
  ),
  parteDeUnSet: z.boolean(),
  imagenes: z.array(
    z.object({
      alt: z.string(),
      url: z.string(),
    })
  ),
  _type: z.string(),
  genero: z.string(),
});


export const gafasLujoSchema = z.object({
  mostrarCredito: z.boolean(),
  especificaciones: z.object({
    tipoDeGafa: z.string(),
    estiloDeGafa: z.string(),
    lente: z.object({
      tipo: z.string(),
      material: z.string(),
    }),
    queIncluye: z.string(),
    montura: z.object({
      formaDeLaMontura: z.string(),
      materialMontura: z.string(),
      materialVarilla: z.string(),
    }),
    paisDeOrigen: z.string(),
  }),
  _id: z.string(),
  descripcion: z.string(),
  marca: z.string(),
  _type: z.string(),
  garantia: z.object({
    meses: z.number(),
  }),
  inspiracion: z.object({
    usarInspiracion: z.boolean(),
    contenido: z.object({
      resena: z.string(),
      imagen: z.object({
        alt: z.string(),
        url: z.string(),
      }),
    }),
  }),
  variantes: z.array(
    z.object({
      mostrarUnidadesDispobibles: z.boolean(),
      colorDeLaMontura: z.object({
        nombre: z.string(),
        color: z.string(),
      }),
      etiqueta: z.string().optional().nullable(),
      colorDeLaVarilla: z.object({
        nombre: z.string(),
        color: z.string(),
      }),
      codigoDeReferencia: z.string(),
      registroInvima: z.string(),
      precio: z.string(),
      unidadesDisponibles: z.number(),
      colorDelLente: z.object({
        nombre: z.string(),
        color: z.string(),
      }),
      imagenes: z.array(
        z.object({
          alt: z.string(),
          url: z.string(),
        })
      ),
    })
  ),
  modelo: z.string(),
  slug: z.string(),
  genero: z.string(),
});

export const gafasPremiumSchema = z.object({
  _type: z.string(),
  marca: z.string(),
  _id: z.string(),
  variantes: z.array(
    z.object({
      colorDelLente: z.object({
        nombre: z.string(),
        color: z.string(),
      }),
      colorDeLaMontura: z.object({
        nombre: z.string(),
        color: z.string(),
      }),
      imagenes: z.array(
        z.object({
          alt: z.string(),
          url: z.string(),
        })
      ),
      codigoDeReferencia: z.string(),
      unidadesDisponibles: z.number(),
      precio: z.string(),
      etiqueta: z.string().optional().nullable(),
      mostrarUnidadesDispobibles: z.boolean(),
    })
  ),
  modelo: z.string(),
  slug: z.string(),
  genero: z.string(),
  descripcion: z.string(),
  detalles: z.object({
    tipoDeGafa: z.string(),
    estiloDeGafa: z.string(),
    lente: z.object({
      tipo: z.string(),
      material: z.string(),
    }),
    montura: z.object({
      formaDeLaMontura: z.string(),
      materialMontura: z.string(),
      materialVarilla: z.string(),
    }),
  }),
  garantia: z.object({
    meses: z.number(),
  }),
});