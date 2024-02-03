import { z } from "zod";
import sanityClient from "@/sanity/sanityClient";

const contentSectionQuery = `{
  on,
  titulo,
  descripcion,
  imagenOVideo,
  "imagen": imagen {
    alt,
    "url": asset -> url
  },
  "video": video {
    "url": asset -> url,
    alt
  }
}`;

const sobreNosotrosQuery = `*[_type == "sobreNosotros"] [0] {
  "whyWeDoWhatWeDo": whyWeDoWhatWeDo ${contentSectionQuery},
  titulo,
  "whyUs": whyUs ${contentSectionQuery},
  "howWeHelpOurClients": howWeHelpOurClients ${contentSectionQuery},
  "ourStory": ourStory ${contentSectionQuery},
  "marcasAliadas": marcasAliadas[] -> {
    titulo,
    "logo": logotipo {
      "url": imagen.asset -> url
    }
  }
  }`;

const assetSchema = z.object({
  url: z.string(),
  alt: z.string(),
});

const contentSectionSchema = z.object({
  on: z.boolean(),
  titulo: z.string(),
  descripcion: z.string(),
  imagenOVideo: z.boolean().optional().nullable(),
  imagen: assetSchema.optional().nullable(),
  video: assetSchema.optional().nullable(),
});

const logoSchema = z.object({
  url: z.string(),
});

const marcasAliadasSchema = z.array(
  z.object({
    logo: logoSchema,
    titulo: z.string(),
  })
);

const sobreNosotrosSchema = z.object({
  whyWeDoWhatWeDo: contentSectionSchema.optional().nullable(),
  titulo: z.string(),
  whyUs: contentSectionSchema.optional().nullable(),
  howWeHelpOurClients: contentSectionSchema.optional().nullable(),
  ourStory: contentSectionSchema.optional().nullable(),
  marcasAliadas: marcasAliadasSchema.optional().nullable(),
});

export const getSobreNosotrosContent = async () => {
  try {
    const data = await sanityClient.fetch(sobreNosotrosQuery);

    const parsedData = sobreNosotrosSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error(parsedData.error?.message);
    }

    return parsedData.data;
  } catch (error) {
    console.error(error);
  }
};
