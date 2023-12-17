import { cn } from "@/app/_lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

type ImageType =  {
  url: string;
  alt?: string | null | undefined;
}

type CarouselProductProps = {
  imagesProduct: ImageType[];
  className?: string;
  setProduct:  React.Dispatch<React.SetStateAction<number>>,
  isHorizontal?: boolean
};

const CarouselProduct = ({
  imagesProduct,
  className,
  setProduct,
  isHorizontal,
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

  const selectImages = (image: ImageType) => {
    const imageIndex = imagesProduct.indexOf(image);
    setProduct(imageIndex)
  }
  
  return (
    <div className={cn("relative w-fit",  className)}>
      {isHorizontal && <button
        onClick={prevImages}
        className="absolute z-20 -left-[35px] top-1/2 transform -translate-y-1/2 w-7 h-7 p-[7px] opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex">
        <IoIosArrowBack />
      </button>}
      <div className={cn("flex space-x-3 lg:space-x-0 lg:gap-y-2 lg:flex-col lg:justify-start lg:items-center", isHorizontal && "overflow-hidden flex-row h-full")}>

        {visibleImages.map((img, idx) => (
          <div
            key={`${img.url}-${idx}`}
            className="relative min-w-[80px] w-20 h-20 "
            onClick={()=>selectImages(img)}
            >
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
      {isHorizontal && <button
        onClick={nextImages}
        className="absolute -right-[35px] top-1/2 transform -translate-y-1/2 w-7 h-7 p-[7px] opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex">
        <IoIosArrowForward />
      </button>}
    </div>
  );
};

export default CarouselProduct;
