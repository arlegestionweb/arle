"use client";
import { cn } from "@/app/_lib/utils";
import React, { useState } from "react";
import CarouselProduct from "./CarouselProduct";
import ImageModal from "../ImageModal";
import { TImages } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import ImageWrapper from "@/app/listing/_components/ImageWrapper";

type GalleryProductProps = {
  imagesProduct: ({
    url: string;
    alt?: string | null | undefined;
  })[]
  className?: string;
  orientation?: "vertical" | "horizontal";
};

const GalleryProduct = ({
  imagesProduct,
  className,
  orientation = "horizontal",
}: GalleryProductProps) => {
  const [index, setIndex] = useState(0);
  const [isImageOpen, setImageOpen] = useState(false);

  const thumbnailElement = imagesProduct.map((img, idx) => {
    if (imagesProduct.length > 1) {
      return (
        <section
          key={`${img.url}-${idx}`}
          className="relative min-w-[80px] w-20 h-20 mr-3"
        >
          <ImageWrapper
            src={img.url}
            alt={img.alt || "perfume"}
            width={80}
            height={80}
            onClick={() => setIndex(idx)}
            className="object-contain h-full w-full cursor-pointer"
          />
        </section>
      );
    }
  });

  const image = imagesProduct[index];
  return (
    <section
      className={cn(
        "flex flex-col items-center lg:mt-8",
        orientation == "vertical" &&
        "md:flex-row-reverse gap-2 md:px-20 md:mb-4 justify-center md:items-start md:pt-4",
        className
      )}
    >
      <ImageModal
        closeImage={() => setImageOpen(false)}
        images={imagesProduct as TImages}
        index={index}
        isImageOpen={isImageOpen}
      />
      <div
        onClick={() => setImageOpen(true)}
        className={cn(
          "relative w-full aspect-square h-[370px] md:h-[377px] lg:h-[569px] cursor-zoom-in",
          orientation == "vertical" && "md:w-1/2 lg:w-full"
        )}
      >
        <ImageWrapper
          alt={imagesProduct[index].alt || ""}
          src={image.url}
          width={800}
          height={800}
          className="object-contain object-center h-full w-full"
        />
      </div>
      <div className=" no-scrollbar flex max-w-[430px] justify-start overflow-x-auto overflow-y-hidden snap-x snap-mandatory w-full p-2 md:hidden">
        {thumbnailElement}
      </div>
      {imagesProduct.length != 1 && (
        <CarouselProduct
          setProduct={setIndex}
          imagesProduct={imagesProduct}
          className={cn(
            "hidden my-2 md:justify-center justify-start md:flex h-20",
            orientation == "vertical" && "md:h-full lg:h-auto md:gap-2"
          )}
          isHorizontal={orientation != "vertical"}
        />
      )}
    </section>
  );
};

export default GalleryProduct;
