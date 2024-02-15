"use client";
import { cn } from "@/app/_lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import CarouselProduct from "./CarouselProduct";

type GalleryProductProps = {
  imagesProduct: {
    url: string;
    alt?: string | null | undefined;
  }[];
  className?: string;
  orientation?: "vertical" | "horizontal";
};

const GalleryProduct = ({
  imagesProduct,
  className,
  orientation = "horizontal",
}: GalleryProductProps) => {
  const [index, setIndex] = useState(0);

  const thumbnailElement = imagesProduct
    .map((img, idx) => {
      if (imagesProduct.length > 1) {
        return (
          <section
            key={`${img.url}-${idx}`}
            className="relative min-w-[80px] w-20 h-20 mr-3">
            <Image
              src={img.url}
              alt={img.alt || "perfume"}
              width={800}
              height={800}
              onClick={() => setIndex(idx)}
              className="object-contain min-h-20 cursor-pointer"
            />
          </section>
        );
      }
    });

  return (
    <section
      className={cn(
        "flex flex-col items-center lg:mt-8",
        orientation == "vertical" && "md:flex-row-reverse gap-2 md:px-20 md:mb-4 justify-center md:items-start md:pt-4",
        className
      )}>
      <div className={cn("relative w-full aspect-square max-h-[370px] md:h-[377px] lg:h-[569px]", orientation == "vertical" && "md:w-1/2 lg:w-full")}>
        <Image
          alt={imagesProduct[index].alt || ""}
          src={imagesProduct[index].url}
          width={200}
          height={200}
          className="object-contain object-center"
        />
      </div>
      <div className=" no-scrollbar flex max-w-[430px] justify-start overflow-x-auto overflow-y-hidden snap-x snap-mandatory w-full p-2 md:hidden">
        {thumbnailElement}
      </div>
      {imagesProduct.length != 1 && (
        <CarouselProduct
          setProduct={setIndex}
          imagesProduct={imagesProduct}
          className={cn("hidden my-2 md:justify-center justify-start md:flex h-20", orientation == "vertical" && "md:h-full lg:h-auto md:gap-2")}
          isHorizontal={orientation != "vertical"}
        />
      )}
    </section>
  );
};

export default GalleryProduct;
