import {
  TGafaPremium,
  TPerfumePremium,
  TRelojPremium,
  isPerfumePremium,
} from "@/sanity/queries/pages/types";
import ProductSlide from "../ProductSlide";
import { cn } from "@/app/_lib/utils";
import React from "react";
import Image from "next/image";
import { isPerfume } from "@/sanity/queries/pages/listingQueries";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";

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
        product={imagenes}
        className="hidden lg:flex basis-full max-h-[650px]"
      />
    </>
  );
};

const ProductGrid = ({
  product,
  className,
}: {
  product: {
    alt: string;
    url: string;
  }[];
  className?: string;
}) => {

  const splitArrayIntoEvenOdd = (array: typeof product): [typeof product, typeof product] => {
    const evenItems: typeof product = [];
    const oddItems: typeof product = [];
  
    array.forEach((item, index) => {
      if (index % 2 === 0) {
        evenItems.push(item);
      } else {
        oddItems.push(item);
      }
    });
  
    return [evenItems, oddItems];
  };
  
  const [evenImages, oddImages] = splitArrayIntoEvenOdd(product);

  return (
    <section className={cn("relative ", className)}>
      <div className={"flex overflow-y-scroll no-scrollbar overflow-hidden w-full gap-2"}>
        <section className="basis-full flex flex-col gap-2">
        {evenImages.map(image => (
          <div
          key={image.alt}
          className="relative">
            <Image
              src={image.url}
              alt={image.alt}
              height={900}
              width={900}
              className={`object-contain w-full object-center`}
              />
          </div>
        ))}
        </section>
        <section className="basis-full flex flex-col gap-2">
        {oddImages.map(image => (
          <div
          key={image.alt}
          className="relative">
            <Image
              src={image.url}
              alt={image.alt}
              height={900}
              width={900}
              className={`object-contain w-full object-center`}
              />
          </div>
        ))}
        </section>
        {product.length > 4 && (
          <div className="absolute bottom-0 h-20 w-full z-10 bg-gradient-to-b from-transparent to-[#00000080] opacity-25"></div>
        )}
      </div>
    </section>
  );
};

export default ProductViewer;
