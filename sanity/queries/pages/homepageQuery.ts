import sanityClient from "@/sanity/sanityClient";
import { bannersQuery, imageQuery } from "../objects";

const homepageQueryString = `*[_type == "homepage"]{
  ${bannersQuery},
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
    "productos": productos[] -> {
      ...
    }
  },
  "sobre": sobre{
    titulo,
    descripcion,
    "imagenes": imagenes[] {
      alt,
      "url": asset->url
    },
  },
  "testimonios": testimonios{
    titulo,
    descripcion,
    "lista": lista[] {
      titulo,
      nombre,
      cargo,
      descripcion,
      ${imageQuery},
    },
  }
}`;

export const getHomepageContent = async () => {
  try {
    const result = await sanityClient.fetch(homepageQueryString);
    return result[0];
  } catch (error) {
    console.error(error);
  }
};
