import { z } from "zod";

const zodSiBoolean = z
  .string()
  .optional()
  .nullable()
  .default("no")
  .transform((value) => value === "si")
  .or(z.boolean());

export const gafasLujoExcelSchema = z.object({
  modelo: z.string(),
  marca: z.string(),
  variantes: z.array(
    z.object({
      codigoDeReferencia: z.string().or(z.number()),
      precio: z.number(),
      precioConDescuento: z.number().optional().nullable(),
      unidadesDisponibles: z.number(),
      mostrarUnidadesDisponibles: zodSiBoolean,
      etiqueta: z
        .string()
        .optional()
        .nullable()
        .transform((etiqueta) => ({ tag: etiqueta })),
      colorDeLaMontura: z.string(),
      colorDeLaVarilla: z.string(),
      colorDelLente: z.string(),
      imagenes: z.array(
        z.string().or(
          z.object({
            url: z.string().url(),
            _id: z.string(),
          })
        )
      ),
    })
  ),
  coleccionDeMarca: z.string().optional().nullable(),
  descripcion: z.string(),
  detalles: z.object({
    usarDetalles: zodSiBoolean,
    contenido: z
      .object({
        imagen: z.object({
          alt: z.string(),
          url: z.string().url(),
        }),
        resena: z.string(),
      })
      .optional()
      .nullable(),
  }),
  especificaciones: z.object({
    estiloDeGafa: z.string(),
    lente: z.object({
      material: z.string(),
      tipo: z.string(),
    }),
    montura: z.object({
      formaDeLaMontura: z.string(),
      materialDeLaMontura: z.string(),
      materialDeLaVarilla: z.string(),
    }),
    paisDeOrigen: z.string(),
    queIncluye: z.string(),
    tipoDeGafa: z.string(),
  }),
  garantia: z.object({
    descripcion: z.string(),
    meses: z.string().or(z.number()),
  }),
  inspiracion: z.object({
    usarInspiracion: zodSiBoolean,
    contenido: z
      .object({
        imagen: z.object({
          alt: z.string(),
          url: z.string().url(),
        }),
        resena: z.string(),
      })
      .optional()
      .nullable(),
  }),
  monturaDetalles: z.object({
    usarDetalles: zodSiBoolean,
    contenido: z
      .object({
        imagen: z.object({
          alt: z.string(),
          url: z.string().url(),
        }),
        resena: z.string(),
      })
      .optional()
      .nullable(),
  }),
  genero: z.string(),
  mostrarCredito: zodSiBoolean,
  codigoDeProducto: z.string().or(z.number()),
});

export const perfumeDeLujoExcelSchema = z.object({
  titulo: z.string(),
  marca: z.string(),
  variantes: z.array(
    z.object({
      codigoDeReferencia: z.string().or(z.number()),
      precio: z.number(),
      precioConDescuento: z.number().optional().nullable(),
      registroInvima: z.string().or(z.number()),
      unidadesDisponibles: z.number(),
      mostrarUnidadesDisponibles: zodSiBoolean,
      tamano: z.string().or(z.number()),
      etiqueta: z
        .string()
        .optional()
        .nullable()
        .transform((etiqueta) => ({ tag: etiqueta })),
    })
  ),
  concentracion: z.string(),
  descripcion: z.object({
    imagen: z
      .object({
        alt: z.string(),
        url: z.string().url(),
      })
      .optional()
      .nullable(),
    texto: z.string(),
  }),
  genero: z.string(),
  ingredientes: z.array(z.string()),
  inspiracion: z
    .object({
      contenido: z
        .object({
          imagen: z.object({
            alt: z.string(),
            url: z.string().url(),
          }),
          resena: z.string().optional().nullable(),
        })
        .optional()
        .nullable(),
      usarInspiracion: zodSiBoolean,
    })
    .optional()
    .nullable(),
  mostrarCredito: zodSiBoolean,
  notasOlfativas: z.object({
    familiaOlfativa: z.string(),
    notasDeBase: z.array(z.string()),
    notasDeCorazon: z.array(z.string()),
    notasDeSalida: z.array(z.string()),
  }),
  paisDeOrigen: z.string(),
  parteDeUnSet: zodSiBoolean,
  imagenes: z.array(
    z.string().or(
      z.object({
        url: z.string().url(),
        _id: z.string(),
      })
    )
  ),
  coleccionDeMarca: z.string().optional().nullable(),
});
export const perfumePremiumExcelSchema = z.object({
  titulo: z.string(),
  marca: z.string(),
  variantes: z.array(
    z.object({
      codigoDeReferencia: z.string().or(z.number()),
      precio: z.number(),
      precioConDescuento: z.number().optional().nullable(),
      registroInvima: z.string().or(z.number()),
      unidadesDisponibles: z.number(),
      mostrarUnidadesDisponibles: zodSiBoolean,
      tamano: z.string().or(z.number()),
      etiqueta: z
        .string()
        .optional()
        .nullable()
        .transform((etiqueta) => ({ tag: etiqueta })),
    })
  ),
  coleccionDeMarca: z.string().optional().nullable(),
  descripcion: z.string(),
  detalles: z.object({
    concentracion: z.string(),
    genero: z.string(),
    notasOlfativas: z.object({
      familiaOlfativa: z.string(),
      notasDeBase: z.array(z.string()),
      notasDeCorazon: z.array(z.string()),
      notasDeSalida: z.array(z.string()),
    }),
    resenaCorta: z.string().optional().nullable(),
  }),
  mostrarCredito: zodSiBoolean,
  parteDeUnSet: zodSiBoolean,
  imagenes: z.array(
    z.string().or(
      z.object({
        url: z.string().url(),
        _id: z.string(),
      })
    )
  ),
});
