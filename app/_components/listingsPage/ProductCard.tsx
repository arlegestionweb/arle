"use client";
import Image from "next/image";
import {
  TProduct,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import Button from "../Button";
import { LuShoppingCart } from "react-icons/lu";
import ProductSlide from "./ProductSlide";
import Link from "next/link";
import Labels, { LabelTypes } from "../Labels";

const ProductoCard = ({ producto }: { producto: TProduct }) => {
  // TODO: REFACTORIZAR, no repetir codigo
  console.log(producto);

  if (isPerfume(producto)) {
    return (
      <>
        {producto.variantes[0].etiqueta && (
          <Labels
            labelType={producto.variantes[0].etiqueta as LabelTypes}
            label={producto.variantes[0].etiqueta as LabelTypes}
            className="left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
          />
        )}
        <CardLayout
          link={producto.slug}
          images={producto.imagenes}
          src={producto.imagenes[0].url}
          alt={producto.imagenes[0].alt || ""}
          titulo={producto.titulo}
          price={producto.marca}
        />
      </>
    );
  }

  if (isReloj(producto)) {
    return (
      <>
        {producto.variantes[0].etiqueta && (
          <Labels
            labelType={producto.variantes[0].etiqueta as LabelTypes}
            label={producto.variantes[0].etiqueta as LabelTypes}
            className="left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
          />
        )}
        <CardLayout
          link={producto.slug}
          images={producto.variantes[0].imagenes}
          src={producto.variantes[0].imagenes[0].url}
          alt={producto.variantes[0].imagenes[0].alt || ""}
          titulo={producto.modelo}
          price={producto.marca}
        />
      </>
    );
  }
  // if (!producto.imagenes) return null;

  return (
    <div className="w-[136px] h-[279px] flex-col justify-start items-start gap-2 inline-flex">
      gafas here
    </div>
  );
};

const CardLayout = ({
  src,
  alt,
  titulo,
  price,
  link,
  images,
}: {
  src: string;
  alt: string;
  titulo: string;
  price: string;
  link: string;
  images: {
    url: string;
    alt?: string | null | undefined;
  }[];
}) => {
  return (
    <>
      <section className="w-full  overflow-hidden">
        {images.length > 1 ? (
          <ProductSlide
            slug={link}
            imagesProduct={images}
            className=" h-[180px] lg:h-[288px]"
          />
        ) : (
          <Link href={link}>
            <Image
              src={src}
              alt={alt}
              width={288}
              height={288}
              className="object-cover h-[180px] w-full lg:h-[288px]"
            />
          </Link>
        )}
      </section>

      <section className=" flex-1 justify-between font-tajawal flex flex-col gap-3">
        <h3 className="text-xl font-bold leading-6 text-[#303030]">{titulo}</h3>
        <p className="text-[18px] font-medium leading-5 text-[#4f4f4f]">
          {price}
        </p>
      </section>
      <Button className="bg-black text-[#CFCFCF] flex justify-center items-center gap-2">
        <LuShoppingCart />
        <span className="font-inter text-base font-medium leading-6">
          Agregar
        </span>
      </Button>
    </>
  );
};

export default ProductoCard;