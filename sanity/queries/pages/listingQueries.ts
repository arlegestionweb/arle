import sanityClient from "@/sanity/sanityClient";
import {
  bannersQuery,
  imageArrayQuery,
  imageQuery,
  marcaTipoModeloQuery,
} from "../objects";

// perfumes: titulo,
//     "type": _type,
//     genero,
//     calificacion,
//     resenaCorta,
//     descripcion,
//     ${imageArrayQuery},
//     tamano,
//     codigoDeReferencia,
//     precio,
//     registroInvima,
//     notasOlfativas

const listingMainString = ` 
{
  "listingContent": *[_type == "listing"]{
    ${bannersQuery},
  },
  "perfumes": *[_type == "perfumeLujo" || _type == "perfumePremium"] {
    modelo,
    "type": _type,
    ${imageArrayQuery},
    precio,
    "slug": slug.current,
  },
  "relojes": *[_type == "relojesLujo" || _type == "relojesPremium"] {
    ${marcaTipoModeloQuery},
    ${imageArrayQuery},
    "slug": slug.current,
  },
  "gafas": *[_type == "gafasLujo" || _type == "gafasPremium"] {
    ${marcaTipoModeloQuery},
    ${imageArrayQuery},
    "slug": slug.current,
  },
  "colecciones": *[_type == "colecciones"] {
    titulo,
    descripcion,
    ${imageQuery},
    "productos": productos[]->{
      ${marcaTipoModeloQuery},
      ${imageArrayQuery},
    }
  },
  
}
`;

export const getListingInitialLoadContent = async () => {
  try {
    const result = await sanityClient.fetch(listingMainString);

    return result;
  } catch (error) {
    console.error(error);
  }
};
