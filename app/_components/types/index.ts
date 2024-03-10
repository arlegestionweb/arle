import { PortableTextBlock } from "sanity";

export type BannerType = {
  titulo: string;
  descripcion: string;
  imagen: {
    alt: string;
    url: string;
  };
};

export type imageType = {
  url: string;
  alt?: string | null | undefined;
}[];

export type NotaOlftativaType = {
  titulo: string;
  descripcion: string;
};


export interface MenuItem {
  title?: string;
  label: string;
  subMenu?: MenuItem[] | MenuItem;
  href?: string;
  param?: string;
}