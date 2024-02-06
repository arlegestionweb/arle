import { z } from "zod";
import sanityClient from "@/sanity/sanityClient";
import { toKebabCase } from "@/utils/helpers";

const jobsQuery = `
"jobs": jobs [] {
  modality,
  aboutJob,
  "sede": sede -> {
    schedule,
    local,
    "imagenes": imagenes [] {
      "url": asset -> url,
    },
    whatsapp,
    nombre,
    findUsIn,
    text,
    title,
    city,
    map,
    direccion,
  },
  titulo,
  experience,
  salary,
  "skills": skills [],
}`

const trabajosQuery = `*[_type == "trabajaConNosotros"] [0] {
  ${jobsQuery}
}
  `

const trabajaConNosotrosQuery = `*[_type == "trabajaConNosotros"] [0] {
  email,
  descripcion,
  ${jobsQuery},
  titulo,
  "imagen": imagen {
    alt,
    "url": asset -> url
   }
}`;


const imagenSchema = z.object({
  alt: z.string(),
  url: z.string(),
});

const sedeSchema = z.object({
  schedule: z.string(),
  local: z.string(),
  imagenes: z.array(z.object({ url: z.string() })),
  whatsapp: z.string(),
  nombre: z.string(),
  findUsIn: z.string(),
  text: z.string(),
  title: z.string(),
  city: z.string(),
  map: z.string(),
  direccion: z.string(),
});

export const baseBlockSchema = z
.object({
  _type: z.string(),
    _key: z.string(),
  })
  .passthrough();

const jobSchema = z.object({
  modality: z.string(),
  aboutJob: z.array(baseBlockSchema),
  sede: sedeSchema,
  titulo: z.string(),
  experience: z.string(),
  salary: z.string(),
  skills: z.array(z.string()),
});

const jobByTitleSchema = z.object({
  jobs: z.array(jobSchema),
})

const trabajaConNosotrosSchema = z.object({
  email: z.string(),
  descripcion: z.string(),
  jobs: z.array(jobSchema),
  titulo: z.string(),
  imagen: imagenSchema,
});

export const getTrabajaConNosotrosContent = async () => {
  try {
    const data = await sanityClient.fetch(trabajaConNosotrosQuery);
    const validatedData = trabajaConNosotrosSchema.safeParse(data);
    
    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }

    return validatedData.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getJobByTitle = async (title: string) => {
  try {
    const data = await sanityClient.fetch(trabajosQuery);
    const validatedData = jobByTitleSchema.safeParse(data);
    
    if (!validatedData.success) {
      throw new Error(validatedData.error.message);
    }

    const job = validatedData.data.jobs.find(j => toKebabCase(j.titulo) === title)
    
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}
