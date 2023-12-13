import { cn } from "@/app/_lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

type CarouselProductProps = {
  imagesProduct: {
    url: string;
    alt?: string | null | undefined;
  }[];
  className?: string;
};

const CarouselProduct = ({
  imagesProduct,
  className,
}: CarouselProductProps) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextImages = () => {
    setStartIndex(prevIndex => (prevIndex + 1) % imagesProduct.length);
  };

  const prevImages = () => {
    setStartIndex(prevIndex =>
      prevIndex === 0 ? imagesProduct.length - 4 : prevIndex - 1
    );
  };

  const visibleImages = Array.from({ length: 4 }, (_, idx) => {
    const arrayIndex = (startIndex + idx) % imagesProduct.length;
    return imagesProduct[arrayIndex];
  });

  return (
    <div className={cn("relative w-fit", className)}>
      <button
        onClick={prevImages}
        className="absolute z-20 -left-[35px] top-1/2 transform -translate-y-1/2 w-7 h-7 p-[7px] opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex">
        <IoIosArrowBack />
      </button>
      <div className="flex space-x-3 overflow-hidden">
        {visibleImages.map((img, idx) => (
          <div
            key={`${img.url}-${idx}`}
            className="relative min-w-[80px] w-20 h-20">
            <Image
              src={img.url}
              alt={img.alt || "perfume"}
              width={300}
              height={300}
              className="object-cover w-full h-20"
            />
          </div>
        ))}
      </div>
      <button
        onClick={nextImages}
        className="absolute -right-[35px] top-1/2 transform -translate-y-1/2 w-7 h-7 p-[7px] opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex">
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default CarouselProduct;
