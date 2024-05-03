import { z } from "zod";
import { TVarianteGafa } from "./gafas";
import { TRelojVariant } from "./reloj";
import { TPerfumeVariant } from "./perfume";

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


// const zodImage

const contenidoBase = z.object({
  resena: z.string().optional().nullable(),
  texto: z.string().optional().nullable(),
  subirImagen: z.boolean().optional().nullable()
})

const contenidowithSanityImage = contenidoBase.merge(z.object({
  subirImagen: z.literal(false).optional().nullable(),
  imagen: z
    .object({
      url: z.string().optional().nullable(),
      alt: z.string().optional().nullable()
    })
    .optional()
    .nullable(),
}))

const contenidoWithExternalImage = contenidoBase.merge(z.object({
  subirImagen: z.literal(true),
  imagenExterna: z
    .object({
      url: z.string().optional().nullable(),
      alt: z.string().optional().nullable(),
    })
}))

export const contenidoSchema = z.union([contenidowithSanityImage, contenidoWithExternalImage])

export const bannerSchema = z.object({
  imagenOVideo: z.boolean().optional().nullable(),
  imagen: imageSchema.optional().nullable(),
  video: videoSchema.optional().nullable(),
});

export const zodColorSchema = z.object({
  nombre: z.string(),
  color: z.string(),
});

export const coleccionDeMarcaSchema = z.string().optional().nullable();

export type TVariant = TPerfumeVariant | TRelojVariant | TVarianteGafa;

const zodTimedDiscount = z.object({
  texto: z.string(),
  productos: z.array(z.string()),
  porcentaje: z.number(),
  duracion: z.object({
    inicio: z.string(),
    fin: z.string(),
  }),
  titulo: z.string(),
});

export type TTimedDiscount = z.infer<typeof zodTimedDiscount>;

export const zodTimedDiscountsSchema = z
  .array(zodTimedDiscount)
  .optional()
  .nullable();
