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
    <section className={cn("col-span-6 px-5", className)}>
      <div className="grid grid-cols-[repeat(2,minmax(200px,288px))] grid-rows-[repeat(3,377px)] h-[500px] w-full gap-[10px] justify-center">
        {product.variantes[0].imagenes.map(image => (
          <div
            key={image.alt}
            className="relative w-full h-full">
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
