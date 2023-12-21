export const imageQuery = `
  "imagen": imagen{
    alt,
    "url": asset->url
  }
`;

export const bannersQuery = `
  "banners": banners[] {
    titulo,
    descripcion,
    "imagen": imagen {
      alt,
      "url": asset->url
    },
    "video": video {
      "url": asset->url
    }
  }
`;

export const imageArrayQuery = `
"imagenes": imagenes[] {
  "url": asset->url,
  alt
}
`;

export const marcaTipoModeloQuery = `
  "marca": marca->{
    titulo,
  },
  "type": _type,
  modelo,
  precio
`;
