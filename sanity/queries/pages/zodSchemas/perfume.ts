import { z } from "zod";
import {
  bannerSchema,
  coleccionDeMarcaSchema,
  contenidoSchema,
  imageSchema,
} from "./general";

export const inspiracionSchema = z.object({
  usarInspiracion: z.boolean().optional().nullable(),
  contenido: contenidoSchema.optional().nullable(),
});

const notasSchema = z.object({
  notasDeBase: z.array(z.string()).optional().nullable(),
  notasDeSalida: z.array(z.string()).optional().nullable(),
  familiaOlfativa: z.string(),
  notasDeCorazon: z.array(z.string()).optional().nullable(),
});

const descripcionSchema = z.object({
  texto: z.string(),
  imagen: z
    .object({
      url: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  subirImagen: z.boolean().optional().nullable(),
  imagenExterna: z
    .object({
      url: z.string(),
      alt: z.string(),
    })
    .optional()
    .nullable(),
});

const perfumeVariantSchema = z.object({
  tamano: z.number(),
  precio: z.string(),
  precioConDescuento: z.string().optional().nullable(),
  codigoDeReferencia: z.string().or(z.number()),
  registroInvima: z.string().or(z.number()).optional().nullable(),
  mostrarUnidadesDisponibles: z.boolean().optional().nullable(),
  unidadesDisponibles: z.number(),
  tag: z.string().optional().nullable(),
});

export type TPerfumeVariant = z.infer<typeof perfumeVariantSchema>;

export const perfumePremiumSchema = z.object({
  date: z.string(),
  slug: z.string(),
  _id: z.string(),
  detalles: z.object({
    concentracion: z.string(),
    resenaCorta: z.string().nullable().optional(),
    notasOlfativas: notasSchema,
  }),
  genero: z.string(),
  titulo: z.string(),
  _type: z.literal("perfumePremium"),
  mostrarCredito: z.boolean().optional().nullable(),
  imagenes: z.array(
    z.object({
      alt: z.string(),
      url: z.string(),
    })
  ),
  marca: z.string(),
  variantes: z.array(perfumeVariantSchema),
  parteDeUnSet: z.boolean().optional().nullable(),
  descripcion: z.string(),
  coleccionDeMarca: coleccionDeMarcaSchema,
});

export const perfumeLujoSchema = z.object({
  date: z.string(),
  titulo: z.string(),
  inspiracion: inspiracionSchema.optional().nullable(),
  variantes: z.array(perfumeVariantSchema),
  genero: z.string(),
  _type: z.literal("perfumeLujo"),
  slug: z.string(),
  _id: z.string(),
  parteDeUnSet: z.boolean().optional().nullable(),
  concentracion: z.string(),
  imagenes: z.array(
    imageSchema
  ),
  notasOlfativas: notasSchema,
  ingredientes: z.array(z.string()).optional().nullable(),
  mostrarCredito: z.boolean().optional().nullable(),
  marca: z.string(),
  descripcion: descripcionSchema,
  paisDeOrigen: z.string().optional().nullable(),
  banners: z.array(bannerSchema).optional().nullable(),
  coleccionDeMarca: coleccionDeMarcaSchema,
});
