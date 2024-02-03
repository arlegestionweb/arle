import sanityClient from "@/sanity/sanityClient";
import { toKebabCase } from "@/utils/helpers";
import { z } from 'zod';

const sedeQuery = `
"sedes": sedes [] -> {
  nombre,
  whatsapp,
  direccion,
  text,
  "ciudad": ciudad -> titulo,
  map,
  schedule,
  local,
  "imagenes": imagenes [] {
    "url": asset -> url
  },
  "video": video {
    "url": asset -> url,
    alt
  },
  title,
  findUsIn,
}`;

const sedesQuery = `*[_type == "nuestrasSedes"] [0] {
  ${sedeQuery},
}`;

const nuestrasSedesQuery = `*[_type == "nuestrasSedes"] [0] {
  titulo,
  ${sedeQuery},
}`;

const imagenSchema = z.object({
  url: z.string(),
});

const assetSchema = z.object({
  url: z.string(),
  alt: z.string(),
});

const sedeSchema = z.object({
  nombre: z.string(),
  whatsapp: z.string(),
  direccion: z.string(),
  title: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  ciudad: z.string(),
  map: z.string(),
  video: assetSchema.optional().nullable(),
  schedule: z.string(),
  local: z.string(),
  imagenes: z.array(imagenSchema),
  findUsIn: z.string(),
});

const sedeByTitleSchema = z.object({
  sedes: z.array(sedeSchema),
})

const nuestrasSedesSchema = z.object({
  titulo: z.string(),
  sedes: z.array(sedeSchema),
});

export const getNuestrasSedesContent = async () => {
  try {
    const data = await sanityClient.fetch(nuestrasSedesQuery);
    
    const validatedData = nuestrasSedesSchema.safeParse(data);
    
    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }

    return validatedData.data;
    
  } catch (error) {
    console.error(error);
  }
};

export const getSedeByTitle = async (title: string) => {
  try {
    const data = await sanityClient.fetch(sedesQuery);
    const validatedData = sedeByTitleSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }

    const sede = validatedData.data.sedes.find(s => toKebabCase(s.nombre) === title)

    return sede;
  } catch (error) {
    console.error(error);
    return null;
  }
  
};
