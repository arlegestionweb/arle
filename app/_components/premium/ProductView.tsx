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
        className="hidden lg:block"
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
  return (
    <section className={cn("relative col-span-6 pb-7", className)}>
      <div className={cn("grid grid-cols-[repeat(2,minmax(200px,1fr))] overflow-y-scroll no-scrollbar overflow-hidden w-full gap-[10px] justify-start h-auto ", product.length > 4 && "h-[1155px]")}>
        {product.length > 4 && (
          <div className="absolute right-[0px] top-[calc(1155px-85px)] max-w-[100%] w-[100%] z-10 h-[85px] bg-gradient-to-b from-transparent to-[#00000080] opacity-70"></div>
        )}

        {product.map((image,index) => (
          <div
            key={image.alt+index}
            className="relative w-full h-[377px]">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className={`object-cover object-center`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductViewer;
