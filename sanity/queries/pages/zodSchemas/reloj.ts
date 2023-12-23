import { z } from "zod";
import { contenidoSchema, garantiaSchema, generoSchema, imageSchema, zodColorSchema } from "./general";
import { inspiracionSchema } from "./perfume";



const detallesRelojSchema = z.object({
  tipoDeReloj: z.string(),
  estiloDeReloj: z.string(),
  resistenciaAlAgua: z.string(),
  material: z.string(),
  genero: z.string(),
  tipoDeMovimiento: z.string(),
});

export const relojVariantSchema = z.object({
  precio: z.string(),
  precioConDescuento: z.string().nullable().optional(),
  colorTablero: zodColorSchema,
  imagenes: z.array(imageSchema),
  unidadesDisponibles: z.number(),
  codigoDeReferencia: z.string(),
  registroInvima: z.string(),
  etiqueta: z.string().nullable().optional(),
  colorCaja: zodColorSchema,
  colorPulso: zodColorSchema,
});

export type TRelojVariant = z.infer<typeof relojVariantSchema>;

export const relojLujoSchema = z.object({
  genero: generoSchema,
  mostrarCredito: z.boolean().optional().nullable(),
  marca: z.string(),
  _type: z.literal("relojesLujo"),
  _id: z.string(),
  detalles: z.object({
    usarDetalles: z.boolean().optional().nullable(),
    contenido: contenidoSchema.optional().nullable(),
  }).optional().nullable(),
  especificaciones: z.object({
    tipoDeReloj: z.string(),
    estiloDeReloj: z.string(),
    resistenciaAlAgua: z.string(),
    funciones: z.array(
      z.object({
        titulo: z.string(),
        descripcion: z.string().optional().nullable(),
      })
    ),
    material: z.string(),
  }),
  variantes: z.array(relojVariantSchema),
  inspiracion: inspiracionSchema,
  modelo: z.string(),
  garantia: garantiaSchema,
  movimiento: z.object({
    usarMovimiento: z.boolean().optional().nullable(),
    contenido: contenidoSchema.optional().nullable(),
  }),
  slug: z.string(),
});

export const relojPremiumSchema = z.object({
  _type: z.literal("relojesPremium"),
  _id: z.string(),
  marca: z.string(),
  modelo: z.string(),
  descripcion: z.string().nullable().optional(),
  variantes: z.array(relojVariantSchema),
  garantia: garantiaSchema,
  detallesReloj: detallesRelojSchema,
  slug: z.string(),
});
