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
};

const GalleryProduct = ({ imagesProduct, className }: GalleryProductProps) => {
  const [index, setIndex] = useState(0);

  const thumbnailElement = imagesProduct
    .filter((img, idx) => {
      if (idx < 6) {
        return img;
      }
    })
    .map((img, idx) => {
      if (imagesProduct.length > 1) {
        return (
          <section
            key={`${img.url}-${idx}`}
            className="relative min-w-[80px] w-20 h-20 mr-3">
            <Image
              src={img.url}
              alt={img.alt || "perfume"}
              fill
              onClick={() => setIndex(idx)}
              className="object-cover fit object-center min-h-20"
            />
          </section>
        );
      }
    });

  return (
    <section className={cn("flex flex-col items-center", className)}>
      <div  className={"relative w-full h-[377px] lg:h-[569px]"}>
        <Image
          alt={imagesProduct[index].alt || ""}
          src={imagesProduct[index].url}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="no-scrollbar flex lg:justify-center justify-start overflow-x-auto overflow-y-hidden snap-x snap-mandatory w-full p-2 md:hidden">{thumbnailElement}</div>
      <CarouselProduct imagesProduct={imagesProduct} className="hidden my-2 md:justify-center justify-start md:flex h-20 "/>
    </section>
  );
};

export default GalleryProduct;
