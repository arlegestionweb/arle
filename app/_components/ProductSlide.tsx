"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/app/_lib/utils";
import Link from "next/link";
import ProductVideo from "./ProductVideo";
import ImageModal from "./ImageModal";
import { TImages } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import ImageWrapper from "../listing/_components/ImageWrapper";

export type ProductImage = ({
  url: string;
  alt?: string | null | undefined;
})

export type ProductVideo = {
  url: string;
};

type ProductSlideProps = {
  slug?: string;
  imagesProduct?: ProductImage[];
  imageVideoProducts?: {
    imagenOVideo?: boolean | null | undefined;
    imagen?:
    ({
      url: string;
      alt?: string | null | undefined;
    }) | null | undefined;
    video?:
    | {
      url: string;
    }
    | null
    | undefined;
  }[];
  className?: string;
  isLink?: boolean;
};

const ProductSlide = ({
  slug,
  imagesProduct,
  imageVideoProducts,
  className,
  isLink = true,
}: ProductSlideProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const productRef = useRef<HTMLElement>(null);

  const [isImageOpen, setImageOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleScroll = (event: any) => {
    const element = event.target as HTMLElement;
    const scrollValue = element.scrollLeft;
    const imageWidth = element.offsetWidth;
    const newIndex = Math.round(scrollValue / imageWidth);
    setScrollPosition(newIndex);
  };

  const changeScrollPosition = (index: number) => {
    if (productRef.current) {
      const imageWidth = productRef.current.offsetWidth;
      productRef.current.scrollTo({
        left: imageWidth * index,
        behavior: "smooth",
      });
      setScrollPosition(index);
    }
  };

  return (
    <section
      className={cn(
        "max-w-screen h-[70vh] md:pt-0 overflow-hidden relative group ",
        className
      )}>
      <section
        className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory "
        onScroll={handleScroll}
        ref={productRef}>
        {imagesProduct as TImages && (
          <ImageModal closeImage={() => setImageOpen(false)} images={imagesProduct as ProductImage[]} index={imageIndex} isImageOpen={isImageOpen} />
        )}
        {imagesProduct &&
          imagesProduct.map((image, index) => (
            <div
              key={`${image.alt}-${index}`}
              className={cn(
                `relative h-full w-full`,
                `snap-center snap-always ${index === 1 && "snap-mandatory"
                } min-w-full h-full flex-col justify-end items-center gap-2.5 inline-flex`
              )}>
              {isLink ? (
                <Link href={slug || ""} className="w-full h-full">
                  <ImageWrapper
                    alt={image.alt || "product"}
                    src={image.url}
                    width={250}
                    height={250}
                    className={`absolute object-contain h-full w-full object-center`}
                  />
                </Link>
              ) : (
                <div onClick={() => {
                  setImageIndex(index);
                  setImageOpen(true);
                }} className="w-full h-full cursor-zoom-in">
                  <ImageWrapper
                    alt={image.alt || "product"}
                    src={image.url}
                    width={250}
                    height={250}
                    className={`absolute object-contain h-full w-full object-center`}
                  />
                </div>
              )}
            </div>
          ))}

        {imageVideoProducts &&
          imageVideoProducts.map((product, index) => (
            <div
              key={product.imagen?.alt || "" + index}
              className={cn(
                `relative h-full w-full`,
                `snap-center snap-always ${index === 1 && "snap-mandatory"
                } min-w-full h-full flex-col justify-end items-center gap-2.5 inline-flex`
              )}>
              {product.imagenOVideo ? (
                  <ImageWrapper
                    alt={product.imagen?.alt || "product"}
                    src={product.imagen?.url || ""}
                    width={250}
                    height={250}
                    className={`object-contain w-full h-full object-center`}
                  />
              ) : (
                <>
                  {product && <ProductVideo url={product.video?.url || ""} />}
                </>
              )}
            </div>
          ))}
      </section>

      <div className="flex absolute z-20 bottom-2 m-auto left-0 right-0 justify-center py-2">
        {imagesProduct &&
          imagesProduct.map((image, index) => (
            <div
              key={index}
              className={`w-[9px] h-[9px] rounded-full mix-blend-difference bg-black mx-1.5 cursor-pointer ${index === scrollPosition ? "opacity-80" : "opacity-30"
                }`}
              onClick={() => changeScrollPosition(index)}
            />
          ))}

        {imageVideoProducts &&
          imageVideoProducts.map((product, index) => (
            <div
              key={index}
              className={`w-[9px] h-[9px] rounded-full mix-blend-difference bg-white mx-1.5 cursor-pointer ${index === scrollPosition ? "opacity-80" : "opacity-30"
                }`}
              onClick={() => changeScrollPosition(index)}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductSlide;
