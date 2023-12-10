"use client";
import Image from "next/image";
import React, { useState } from "react";

type GalleryProductProps = {
  imagesProduct: {
    url: string;
    alt?: string | null | undefined;
  }[];
  className?: string;
};

const GalleryProduct = ({ imagesProduct }: GalleryProductProps) => {
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
    <section className="flex flex-col">
      <div  className="relative w-screen h-[377px]">
        <Image
          alt={imagesProduct[index].alt || ""}
          src={imagesProduct[index].url}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="no-scrollbar flex justify-start overflow-x-auto overflow-y-hidden snap-x snap-mandatory w-screen p-2">{thumbnailElement}</div>
    </section>
  );
};

export default GalleryProduct;
