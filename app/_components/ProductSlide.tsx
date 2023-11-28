"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/app/_lib/utils";
import Image from "next/image";
import Link from "next/link";

type ProductSlideProps = {
  slug: string;
  imagesProduct: {
    url: string;
    alt?: string | null | undefined;
  }[];
  className?: string;
  isLink?: boolean;
};

const ProductSlide = ({
  slug,
  imagesProduct,
  className,
  isLink = true,
}: ProductSlideProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const productRef = useRef<HTMLElement>(null);

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
        "max-w-screen h-[70vh] md:pt-0 overflow-hidden relative group",
        className
      )}>
      <section
        className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory"
        onScroll={handleScroll}
        ref={productRef}>
        {imagesProduct.map((image, index) => (
          <div
            key={image.alt}
            className={cn(
              `relative h-full w-full`,
              `snap-center snap-always ${
                index === 1 && "snap-mandatory"
              } min-w-full flex-col justify-end items-center gap-2.5 inline-flex`
            )}>
            {isLink ? (
              <Link href={slug}>
                <Image
                  alt={image.alt || "product"}
                  src={image.url}
                  fill
                  className={`object-cover fit object-top`}
                />
              </Link>
            ) : (
              <div>
                <Image
                  alt={image.alt || "product"}
                  src={image.url}
                  fill
                  className={`object-cover fit object-top`}
                />
              </div>
            )}
          </div>
        ))}
      </section>

      <div className="flex absolute z-20 bottom-2 m-auto left-0 right-0 justify-center py-2">
        {imagesProduct.map((image, index) => (
          <div
            key={index}
            className={`w-[9px] h-[9px] rounded-full mix-blend-difference bg-black mx-1.5 cursor-pointer ${
              index === scrollPosition ? "opacity-80" : "opacity-30"
            }`}
            onClick={() => changeScrollPosition(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSlide;
