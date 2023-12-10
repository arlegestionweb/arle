"use client"
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
      if ( imagesProduct.length > 1) {
        return (
          <section
            key={`${img.url}-${idx}`}
            className="relative w-14 h-14 more-images">
            <Image
              src={img.url}
              alt={"vehicle"}
              fill
              style={{ objectFit: "cover" }}
              onClick={() => setIndex(idx)}
              className={idx === index ? "current" : ""}
            />
            <p
              onClick={() => {
                setIndex(idx);
              }}>
              +{imagesProduct.length - 6}
            </p>
          </section>
        );
      }
    });

  return (
    <section className="relative max-h-[473px]">
      <Image
        alt={imagesProduct[index].alt || ""}
        src={imagesProduct[index].url}
        width={300}
        height={473}
        className="object-cover w-full h-[473px]"
      />
      <div>
      {thumbnailElement}
      </div>
    </section>
  );
};

export default GalleryProduct;
