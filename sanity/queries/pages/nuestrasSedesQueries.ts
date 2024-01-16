import sanityClient from "@/sanity/sanityClient";
import { z } from 'zod';

const sedeQuery = `{
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
  title,
  findUsIn,
}`;


const nuestrasSedesQuery = `*[_type == "nuestrasSedes"] [0] {
  titulo,
  "sedes": sedes [] -> ${sedeQuery}
}`;


const citySchema = z.object({
  titulo: z.string()
})

const imagenSchema = z.object({
  url: z.string(),
});

const sedeSchema = z.object({
  nombre: z.string(),
  whatsapp: z.string(),
  direccion: z.string(),
  title: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  ciudad: z.string(),
  map: z.string(),
  schedule: z.string(),
  local: z.string(),
  imagenes: z.array(imagenSchema),
  findUsIn: z.string(),
});

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
