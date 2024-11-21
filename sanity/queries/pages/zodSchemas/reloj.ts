import { z } from "zod";
import {
  bannerSchema,
  coleccionDeMarcaSchema,
  contenidoSchema,
  garantiaSchema,
  generoSchema,
  imageSchema,
  zodColorSchema,
} from "./general";
import { inspiracionSchema } from "./perfume";

const zodCajaSchema = z.object({
  diametro: z.number(),
  material: z.string(),
  cristal: z.string(),
});

export type TCaja = z.infer<typeof zodCajaSchema>;

const detallesRelojSchema = z.object({
  tipoDeReloj: z.string(),
  estiloDeReloj: z.string(),
  tipoDeCierre: z.string(),
  resistenciaAlAgua: z.string(),
  funciones: z
    .array(
      z.object({
        titulo: z.string(),
        descripcion: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
  material: z.string(),
  tipoDeMovimiento: z.string(),
  caja: zodCajaSchema,
});

export const relojVariantSchema = z.object({
  precio: z.string(),
  precioConDescuento: z.string().nullable().optional(),
  colorTablero: zodColorSchema,
  imagenes: z.array(imageSchema),
  unidadesDisponibles: z.number(),
  mostrarUnidadesDisponibles: z.boolean().optional().nullable(),
  codigoDeReferencia: z.string().or(z.number()),
  tag: z.string().nullable().optional(),
  colorCaja: zodColorSchema,
  colorPulso: zodColorSchema,
});

export type TRelojVariant = z.infer<typeof relojVariantSchema>;

export const relojLujoSchema = z.object({
  date: z.string(),
  genero: generoSchema,
  mostrarCredito: z.boolean().optional().nullable(),
  marca: z.string(),
  _type: z.literal("relojesLujo"),
  _id: z.string(),
  detalles: z
    .object({
      usarDetalles: z.boolean().optional().nullable(),
      contenido: contenidoSchema.optional().nullable(),
    })
    .optional()
    .nullable(),
  especificaciones: z.object({
    tipoDeReloj: z.string(),
    estiloDeReloj: z.string(),
    tipoDeCierre: z.string(),
    resistenciaAlAgua: z.string(),
    funciones: z
      .array(
        z.object({
          titulo: z.string(),
          descripcion: z.string().optional().nullable(),
        })
      )
      .optional()
      .nullable(),
    material: z.string(),
  }),
  variantes: z.array(relojVariantSchema),
  inspiracion: inspiracionSchema,
  modelo: z.string(),
  garantia: garantiaSchema,
  movimiento: z
    .object({
      usarMovimiento: z.boolean().optional().nullable(),
      tipoDeMovimiento: z.string(),
      contenido: z
        .object({
          descripcion: z.string().optional().nullable(),
          imagen: imageSchema.optional().nullable(),
        })
        .optional()
        .nullable(),
    })
    .optional(),
  banners: z.array(bannerSchema).optional().nullable(),
  descripcion: z.string().optional().nullable(),
  coleccionDeMarca: coleccionDeMarcaSchema,
  slug: z.string(),
  caja: zodCajaSchema,
});

export const relojPremiumSchema = z.object({
  date: z.string(),
  _type: z.literal("relojesPremium"),
  _id: z.string(),
  marca: z.string(),
  modelo: z.string(),
  descripcion: z.string(),
  variantes: z.array(relojVariantSchema),
  garantia: garantiaSchema,
  detallesReloj: detallesRelojSchema,
  genero: generoSchema,
  slug: z.string(),
  coleccionDeMarca: coleccionDeMarcaSchema,
  mostrarCredito: z.boolean().optional().nullable(),
});
