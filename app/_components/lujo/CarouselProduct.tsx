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

  // const visibleImages = Array.from({ length: 4 }, (_, idx) => {
  //   const arrayIndex = (startIndex + idx) % imagesProduct.length;
  //   return imagesProduct[arrayIndex];
  // });

  const visibleImages = Array.from({ length: Math.min(4, imagesProduct.length) }, (_, idx) => {
    const arrayIndex = (startIndex + idx) % imagesProduct.length;
    return imagesProduct[arrayIndex];
});

  const selectImages = (image: ImageType) => {
    const imageIndex = imagesProduct.indexOf(image);
    setProduct(imageIndex)
  }
  
  return (
    <div className={cn("relative w-fit",  className)}>
      {imagesProduct.length > 4 && <button
        onClick={prevImages}
        className={cn("absolute z-20  w-7 h-7 p-[7px] opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex", isHorizontal ? "-left-[35px] top-1/2 transform -translate-y-1/2" : "rotate-90 -top-3")}>
        <IoIosArrowBack />
      </button>}
      <div className={cn("flex space-x-3 md:space-x-0 md:gap-y-2 md:justify-start md:items-center", isHorizontal ? "overflow-hidden flex-row gap-2 lg:flex-row h-full" : "md:flex-col")}>

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
              className="object-contain w-full h-20"
            />
          </div>
        ))}
      </div>
      {imagesProduct.length > 4 && 
        <button
        onClick={nextImages}
        className={cn("absolute z-20 w-7 h-7 p-[7px] opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex",isHorizontal ? " -right-[35px] top-1/2 transform -translate-y-1/2 " : "rotate-90 -bottom-3")}>
        <IoIosArrowForward />
      </button>}
    </div>
  );
};

export default CarouselProduct;
