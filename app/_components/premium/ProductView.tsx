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

type ProductViewerProps = {
  product: TGafaPremium | TRelojPremium | TPerfumePremium;
  className?: string;
};

const ProductViewer = ({ product, className }: ProductViewerProps) => {
  const imagenes = isPerfumePremium(product)
    ? []
    : product.variantes[0].imagenes;

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
    <section className={cn("relative col-span-6", className)}>
      <div className="grid grid-cols-[repeat(2,minmax(200px,1fr))] h-[1000px] overflow-y-scroll no-scrollbar overflow-hidden w-full gap-[10px] justify-start">
        {product.length > 4 && (
          <div className="absolute right-[30px] top-[calc(1000px-85px)] w-[calc(576px+10px)] z-10 h-[85px] bg-gradient-to-b from-transparent to-[#00000080] opacity-70"></div>
        )}

        {product.map(image => (
          <div
            key={image.alt}
            className="relative w-full h-[377px]">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className={`object-cover`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductViewer;
