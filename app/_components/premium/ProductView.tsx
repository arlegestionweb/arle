import {
  TGafaPremium,
  TPerfumePremium,
  TRelojPremium,
  isPerfumePremium,
} from "@/sanity/queries/pages/types";
import ProductSlide from "../ProductSlide";
import { cn } from "@/app/_lib/utils";
import React, { useState } from "react";
import Image from "next/image";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TImages } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import ImageModal from "../ImageModal";
import ImageWrapper from "@/app/listing/_components/ImageWrapper";

type ProductViewerProps = {
  product: TGafaPremium | TRelojPremium | TPerfumePremium;
  className?: string;
  selectedVariant: TVariant;
};

const ProductViewer = ({ product, className, selectedVariant }: ProductViewerProps) => {
  const imagenes = isPerfumePremium(product)
    ? product.imagenes
    : (selectedVariant as TRelojVariant | TVarianteGafa).imagenes;

  return (
    <>
      <ProductSlide
        slug={product.slug}
        imagesProduct={imagenes}
        className={cn("max-h-[377px] lg:hidden", className)}
        isLink={false}
      />
      <ProductGrid
        imagenes={imagenes}
        className="hidden lg:flex basis-full max-h-[650px]"
      />
    </>
  );
};

const ProductGrid = ({
  imagenes,
  className,
}: {
  imagenes: TImages;
  className?: string;
}) => {

  const splitArrayIntoEvenOdd = (array: typeof imagenes): [typeof imagenes, typeof imagenes] => {
    const evenItems: typeof imagenes = [];
    const oddItems: typeof imagenes = [];
  
    array.forEach((item, index) => {
      if (index % 2 === 0) {
        evenItems.push(item);
      } else {
        oddItems.push(item);
      }
    });
  
    return [evenItems, oddItems];
  };
  
  const [evenImages, oddImages] = splitArrayIntoEvenOdd(imagenes);
  const [isImageOpen, setImageOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className={cn("relative ", className)}>
      <div className={"flex overflow-y-scroll no-scrollbar overflow-hidden w-full gap-2"}>
        <section className="basis-full flex flex-col gap-2">
          <ImageModal closeImage={()=>setImageOpen(false)} images={imagenes}  index={index} isImageOpen={isImageOpen} />
        {evenImages.map((image, i) => (
          <div
          onClick={()=>{
            setIndex(i*2)
            setImageOpen(true);
          }}
          key={image.alt}
          className="relative">
            <ImageWrapper
              src={image.url}
              alt={image.alt}
              height={900}
              width={900}
              className={`object-contain w-full object-center cursor-zoom-in`}
              />
          </div>
        ))}
        </section>
        <section className="basis-full flex flex-col gap-2">
        {oddImages.map((image, i) => (
          <div
          onClick={()=>{
            setIndex(i*2+1)
            setImageOpen(true);
          }}
          key={image.alt}
          className="relative">
            <ImageWrapper
              src={image.url}
              alt={image.alt}
              height={900}
              width={900}
              className={`object-contain w-full object-center cursor-zoom-in`}
              />
          </div>
        ))}
        </section>
        {imagenes.length > 4 && (
          <div className="absolute bottom-0 h-20 w-full z-10 bg-gradient-to-b from-transparent to-[#00000080] opacity-25"></div>
        )}
      </div>
    </section>
  );
};

export default ProductViewer;
