import { TGafaPremium } from "@/sanity/queries/pages/types";
import ProductSlide from "../ProductSlide";
import { cn } from "@/app/_lib/utils";
import React from "react";
import Image from "next/image";

type ProductViewerProps = {
  product: TGafaPremium;
  className?: string;
};

const ProductViewer = ({ product, className }: ProductViewerProps) => {
  return (
    <>
      <ProductSlide
        slug={product.slug}
        imagesProduct={product.variantes[0].imagenes}
        className={cn("max-h-[377px] lg:hidden", className)}
        isLink={false}
      />
      <ProductGrid
        product={product}
        className="hidden lg:block"
      />
    </>
  );
};

const ProductGrid = ({ product, className }: ProductViewerProps) => {

  return (
    <section className={cn("relative col-span-6 px-5", className)}>
      <div className="grid grid-cols-[repeat(2,minmax(200px,288px))] h-[1000px] overflow-y-scroll no-scrollbar overflow-hidden w-full gap-[10px] justify-center">

        {product.variantes[0].imagenes.length > 5 && (
          <div className="absolute right-[30px] top-[calc(1000px-85px)] w-[calc(576px+10px)] z-10 h-[85px] bg-gradient-to-b from-transparent to-[#00000080] opacity-70"></div>
        )}

        {product.variantes[0].imagenes.map(image => (
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
