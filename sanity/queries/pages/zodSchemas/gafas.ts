import { z } from "zod";
import {
  bannerSchema,
  coleccionDeMarcaSchema,
  contenidoSchema,
  imageSchema,
  zodColorSchema,
} from "./general";

const gafaVariantSchema = z.object({
  colorDeLaMontura: zodColorSchema,
  colorDelLente: zodColorSchema,
  colorDeLaVarilla: zodColorSchema,
  precio: z.string(),
  precioConDescuento: z.string().optional().nullable(),
  tag: z.string().optional().nullable(),
  codigoDeReferencia: z.string(),
  registroInvima: z.string(),
  mostrarUnidadesDispobibles: z.boolean().optional().nullable(),
  unidadesDisponibles: z.number(),
  imagenes: z.array(imageSchema),
});
export type TVarianteGafa = z.infer<typeof gafaVariantSchema>;


export const gafasLujoSchema = z.object({
  date: z.string(),
  banners: z.array(bannerSchema).optional().nullable(),
  mostrarCredito: z.boolean().optional().nullable(),
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
  descripcion: z.string().optional().nullable(),
  marca: z.string(),
  _type: z.literal("gafasLujo"),
  garantia: z.object({
    meses: z.number(),
    descripcion: z.string().optional().nullable(),
  }),
  inspiracion: z.object({
    usarInspiracion: z.boolean().optional().nullable(),
    contenido: contenidoSchema.optional().nullable(),
  }),
  variantes: z.array(gafaVariantSchema),
  modelo: z.string(),
  slug: z.string(),
  genero: z.string(),
  detalles: z.object({
      usarDetalles: z.boolean().optional().nullable(),
      contenido: z.object({
          texto: z.string().optional().nullable(),
          imagen: imageSchema.optional().nullable(),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable(),
  monturaDetalles: z.object({
    usarDetalles: z.boolean().optional().nullable(),
    contenido: z.object({
        texto: z.string().optional().nullable(),
        imagen: imageSchema.optional().nullable(),
      })
      .optional()
      .nullable(),
  }).optional().nullable(),
  coleccionDeMarca: coleccionDeMarcaSchema,

});

export const gafasPremiumSchema = z.object({
  date: z.string(),
  _type: z.literal("gafasPremium"),
  marca: z.string(),
  _id: z.string(),
  variantes: z.array(gafaVariantSchema),
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
  coleccionDeMarca: coleccionDeMarcaSchema,
});

