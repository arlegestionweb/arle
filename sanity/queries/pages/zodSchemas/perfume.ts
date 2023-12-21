import { z } from "zod";
import { bannerSchema, coleccionDeMarca, contenidoSchema, imageSchema } from "./general";

const inspiracionSchema = z.object({
  usarInspiracion: z.boolean().optional().nullable(),
  contenido: contenidoSchema.optional().nullable(),
});

const notasSchema = z.object({
  notasDeBase: z.array(z.string()),
  notasDeSalida: z.array(z.string()),
  familiaOlfativa: z.string(),
  notasDeCorazon: z.array(z.string()),
});


const descripcionSchema = z.object({
  texto: z.string(),
  imagen: imageSchema,
});

const perfumeVariantSchema = z.object({
  codigoDeReferencia: z.string(),
  unidadesDisponibles: z.number(),
  registroInvima: z.string(),
  precioConDescuento: z.string().optional().nullable(),
  mostrarUnidadesDispobibles: z.boolean().optional().nullable(),
  tamano: z.number(),
  precio: z.string(),
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
});


export const perfumeLujoSchema = z.object({
  titulo: z.string(),
  inspiracion: inspiracionSchema,
  variantes: z.array(perfumeVariantSchema),
  genero: z.string(),
  _type: z.literal("perfumeLujo"),
  slug: z.string(),
  _id: z.string(),
  parteDeUnSet: z.boolean().optional().nullable(),
  concentracion: z.string(),
  imagenes: z.array(imageSchema),
  notasOlfativas: notasSchema,
  ingredientes: z.array(z.string()),
  mostrarCredito: z.boolean().optional().nullable(),
  marca: z.string(),
  descripcion: descripcionSchema,
  paisDeOrigen: z.string(),
  banners: z.array(bannerSchema),
  coleccionDeMarca: coleccionDeMarca.optional().nullable(),
});
