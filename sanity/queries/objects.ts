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
    ${imageQuery}
  }
`;
