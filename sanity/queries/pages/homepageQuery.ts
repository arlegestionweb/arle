import sanityClient from "@/sanity/sanityClient";
import { imageQuery } from "../objects";
import { z } from "zod";
import { imageSchema, videoSchema } from "./zodSchemas/general";


export const zodHomeSectionSchema = z.object({
  titulo: z.string(),
  descripcion: z.string(),
  imagen: imageSchema,
});

export type THomeSection = z.infer<typeof zodHomeSectionSchema>;

const zodHeroSchema = z.object({
  titulo: z.string(),
  subtitulo: z.string(),
  buttonText: z.string().optional().nullable(),
  banners: z.array(
    z.object({
      imagenOVideo: z.boolean(),
      imagen: imageSchema.optional().nullable(),
      videoObject: z.object({
        video: videoSchema.optional().nullable(),
        imagenDeCarga: imageSchema.optional().nullable(),
      }).optional().nullable()
    }),
  ),
});

export type THeroSection = z.infer<typeof zodHeroSchema>;

const zodAsesoriaSchema = z.object({
  titulo: z.string(),
  beneficios: z.array(z.string()),
  usarImagen: z.boolean(),
  imagenAsesoria: z.object({
    imagenOVideo: z.boolean(),
    imagen: imageSchema.optional().nullable(),
    videoObject: z.object({
      video: videoSchema.optional().nullable(),
      imagenDeCarga: imageSchema.optional().nullable(),
    }).optional().nullable()
  }),
});
export type TAsesoriaSection = z.infer<typeof zodAsesoriaSchema>;

const zodHomepageSchema = z.object({
  hero: zodHeroSchema,
  perfumes: zodHomeSectionSchema,
  relojes: zodHomeSectionSchema,
  gafas: zodHomeSectionSchema,
  colecciones: z.array(zodHomeSectionSchema).optional().nullable(),
  sobre: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    imagenes: z.array(imageSchema),
  }),
  asesoria: zodAsesoriaSchema,
});


// TODO debe ser objeto 
const homepageQueryString = `*[_type == "homepage"][0]{
  "hero": hero{
    titulo,
    subtitulo,
    buttonText,
    "banners": banners1[] {
      imagenOVideo,
      "imagen": imagen{
        alt,
        "url": asset->url
      },
      "videoObject": videoObject{
        "video": video {
          "url": asset->url,
        },
        "imagenDeCarga": imagenDeCarga{
        alt,
        "url": asset->url
        },
      },
    },
  },
  "perfumes": perfumes{
    titulo,
    descripcion,
    ${imageQuery},
  },
  "relojes": relojes{
    titulo,
    descripcion,
    ${imageQuery},
  },
  "gafas": gafas{
    titulo,
    descripcion,
    ${imageQuery},
  },
  "colecciones": coleccionesDestacadas[] -> {
    titulo,
    descripcion,
    ${imageQuery},
  },
  "sobre": sobre{
    titulo,
    descripcion,
    "imagenes": imagenes[] {
      alt,
      "url": asset->url
    },
  },
  "asesoria": asesoria{
    titulo,
    "beneficios": beneficios[],
    usarImagen,
    "imagenAsesoria": imagenAsesoria{
      imagenOVideo,
      "imagen": imagen {
        alt,
        "url": asset->url,
      },
      "videoObject": videoObject{
        "video": video {
          "url": asset->url,
        },
        "imagenDeCarga": imagenDeCarga{
        alt,
        "url": asset->url
        },
      },
    }
  },
}`;

export const getHomepageContent = async () => {
  try {
    const result = await sanityClient.fetch(homepageQueryString);

    const parsedResult = zodHomepageSchema.safeParse(result);
    if(!parsedResult.success){
      throw new Error(parsedResult.error.message);
    }

    return parsedResult.data;
  } catch (error) {
    console.error(error);
  }
};