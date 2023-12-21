import { z } from "zod";

export const imageSchema = z.object({
  alt: z.string(),
  url: z.string(),
});

export const generoSchema = z.string();

export const garantiaSchema = z.object({
  meses: z.number(),
  descripcion: z.string().nullable().optional(),
});

export const videoSchema = z.object({
  url: z.string(),
});

export const contenidoSchema = z.object({
  resena: z.string().optional().nullable(),
  texto: z.string().optional().nullable(),
  imagen: imageSchema.optional().nullable(),
});

export const bannerSchema = z.object({
  imagenOVideo: z.boolean().optional().nullable(),
  imagen: imageSchema.optional().nullable(),
  video: videoSchema.optional().nullable(),
});

export const coleccionDeMarca = z.object({
  nombre: z.string(),
  marca: z.string(),
});

export const zodColorSchema = z.object({
  nombre: z.string(),
  color: z.string(),
});
