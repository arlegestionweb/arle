"use client";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import React, { useEffect, useState } from "react";
import { cn } from "@/app/_lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SuggestedProductCard from "./SuggestedProductCard";

type ProductCardSlideProps = {
  nameSection: string;
  products: TProduct[]; // for test
};

export const ProductCardSlide = ({ 
  nameSection, 
  products 
}: ProductCardSlideProps) => {
  return (
    <section className="max-w-mx px-0 min-[1024px]:px-10 min-[1280px]:px-0 w-screen py-0 md:py-4 pl-8 lg:flex lg:flex-col">
      {" "}
      <h3 className="text-zinc-800 text-[28px] font-semibold font-crimson leading-loose">
        {nameSection}
      </h3>
      {products && products.length > 0 && (
        <>
          <SlideMobile products={products} className="flex" />
          {/* <SlideDesktop products={products} className="hidden lg:grid" /> */}
        </>
      )}
    </section>
  );
};

const SlideDesktop = ({
  products,
  className,
}: {
  products: TProduct[];
  className?: string;
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [productosVisibles, setProductosVisibles] = useState<TProduct[]>([]);

  const nextProduct = () => {

    setProductosVisibles([])
    setStartIndex(prevIndex => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {

    setProductosVisibles([])
    setStartIndex(prevIndex =>
      prevIndex === 0 ? products.length - 4 : prevIndex - 1
    );
  };

  useEffect(() => {
    setProductosVisibles(
      Array.from({ length: 4 }, (_, idx) => {
        const arrayIndex = (startIndex + idx) % products.length;
        return products[arrayIndex];
      })
    );
  }, [startIndex]);

  return (
    <section className={cn("relative min-h-[380px]", className)}>
      <button
        onClick={prevProduct}
        className="absolute z-20 -left-[20px] top-1/3 transform -translate-y-1/2 w-10 h-10 p-[7px] border border-spacing-1 border-neutral-900 opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex">
        <IoIosArrowBack />
      </button>

      <ul
        className={cn(
          "pt-4 md:pt-7 pb-3 h-auto w-full max-w-mx  grid grid-cols-[repeat(4,minmax(200px,1fr))] place-content-center gap-4"
        )}>
        {productosVisibles.map((product, idx) => (
          <li
            key={`${idx}`}
            className="relative bg-white md:m-0 w-full">
            <SuggestedProductCard producto={product} />
          </li>
        ))}
      </ul>

      <button
        onClick={nextProduct}
        className="absolute -right-[20px] top-1/3 transform -translate-y-1/2 w-10 h-10 p-[7px] opacity-80 border border-spacing-1 border-neutral-900 bg-neutral-100 shadow justify-center items-center inline-flex">
        <IoIosArrowForward />
      </button>
    </section>
  );
};

const SlideMobile = ({
  products,
  className,
}: {
  products: TProduct[];
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        "pt-4 md:pt-7 pb-3 h-auto w-full no-scrollbar flex justify-start md:gap-4 max-w-mx overflow-x-auto overflow-y-hidden snap-x snap-mandatory",
        className
      )}>
      {products.map(product => (
        <li
          key={product._id}
          className=" w-[159px] mr-4 md:m-0 md:w-72 snap-always snap-center">
          <div className="relative w-[159px] h-auto md:w-[288px]">
            <SuggestedProductCard producto={product} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductCardSlide;