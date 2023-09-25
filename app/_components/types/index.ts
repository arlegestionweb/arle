import { PortableTextBlock, StringRule } from "sanity";

export type BannerType = {
  titulo: string;
  descripcion: string;
  imagen: {
    alt: string;
    url: string;
  };
};

export type imageType = {
  alt: string;
  url: string;
};

export type NotaOlftativaType = {
  titulo: string;
  descripcion: string;
};

type PerfumeType = {
  modelo: string;
  descripcion: string;
  imagenes: imageType[];
  notasOlfativas: NotaOlftativaType[];
  tamano: string;
  precio: string;
  codigoDeReferencia: string;
  genero: string;
  registroInvima: string;
  calificacion: string;
  slug: string;
  type: string;
};

type PerfumeLujoExtraType = {
  resena: {
    video: any;
    inspiracion: PortableTextBlock[];
    ingredientes: {
      titulo: string;
    }[];
  };
};

type PerfumePremiumExtraType = {
  resenaCorta: string;
};

export type PerfumeLujoType = PerfumeType & PerfumeLujoExtraType;
export type PerfumePremiumType = PerfumeType & PerfumePremiumExtraType;

type MarcaType = {
  titulo: string;
  descripcion: string;
  logotipo: {
    imagen: {
      alt: string;
      url: string;
    };
  };
  slogan: string;
  banners?: BannerType[];
  type: string;
};
export type RelojType = {
  type: string;
  marca: MarcaType;
  modelo: string;
  imagenes: imageType[];
  precio: string;
  funciones: {
    nombre: string;
    descripcion: string;
  }[];
  resistenciaAlAgua: string;
  garantia: string;
  detallesReloj: {
    genero: string;
    tipoDeMovimiento: string;
    pulso: {
      material: string;
    };
    cristal: string;
    diametro: string;
    colorTablero: string;
    caja: {
      material: string;
      tamano: string;
      color: string;
    };
    slug: string;
  };
};

export type GafaType = {
  marca: MarcaType;
  modelo: string;
  imagenes: imageType[];
  precio: string;
  type: string;
};

export type ColeccionType = {
  titulo: string;
  descripcion: string;
  imagen: {
    alt: string;
    url: string;
  };
  productos?: (PerfumeLujoType | PerfumePremiumType | RelojType | GafaType)[];
};
