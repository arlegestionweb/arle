import { TPerfumeLujo } from "@/sanity/queries/pages/types";
import Image from "next/image";
import Labels, { LabelTypes } from "../../../../_components/Labels";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";
import Cantidad from "../Cantidad";
import InfoSection from "../InfoSection";
import ProductSlide, { ProductImage } from "@/app/_components/ProductSlide";
import MobileAddToCart from "../MobileAddToCart";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import { useState } from "react";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import HeroProduct from "@/app/_components/lujo/HeroProduct";

type TPerfumeLujoProps = {
  product: TPerfumeLujo;
};

const PerfumeLujo = ({ product }: TPerfumeLujoProps) => {
  

  return (
    <>
      <HeroProduct
        product={product}
        images={product.imagenes}
      />

      <div className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Descripción"
          descripcion={product.descripcion.texto}
          alt={product.descripcion.imagen.alt}
          url={product.descripcion.imagen.url}
          className="lg:max-w-[calc(1280px+32px)]"
        />
      </div>

      {product.inspiracion.usarInspiracion && (
        <div className="bg-color-bg-surface-1-default w-screen flex justify-center">
          <InfoSection
            titulo="Inspiración"
            descripcion={product.inspiracion.contenido!.resena || ""}
            alt={product.inspiracion.contenido!.imagen?.alt || ""}
            url={product.inspiracion.contenido!.imagen?.url || ""}
            className="text-slate-900 lg:max-w-[calc(1280px+32px)] flex-row-reverse"
          />
        </div>
      )}

      <section className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Inspiración"
          DesciptionComp={
            <DetallesProducto
              notasOlfativas={product.notasOlfativas}
              ingredientes={product.ingredientes}
            />
          }
          ImageComp={
            <ProductSlide
              imagesProduct={product.banners.map(
                element =>
                  ({
                    url: element.imagen?.url,
                    alt: element.imagen?.alt,
                  } as ProductImage)
              )}
              className="max-h-[377px] w-full"
              isLink={false}
            />
          }
          className="w-full  lg:max-w-[calc(1280px+32px)]"
        />
      </section>

      <section className="px-4 py-6 lg:hidden">
        <NuestrasComprasIncluyen />
      </section>

      <MobileAddToCart className="lg:hidden" />
    </>
  );
};

export default PerfumeLujo;
