"use client";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/app/_lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SuggestedProductCard from "./SuggestedProductCard";

type ProductCardSlideProps = {
  nameSection: string;
  products: TProduct[]; // for test
};

export const ProductCardSlide = ({
  nameSection,
  products,
}: ProductCardSlideProps) => {
  return (
    <section className="max-w-mx px-0 min-[1024px]:px-10 min-[1280px]:px-0 w-screen py-0 md:py-4 pl-8 lg:flex lg:flex-col">
      {" "}
      <h3 className="text-zinc-800 text-3xl font-jomolhari leading-loose">
        {nameSection}
      </h3>
      {products && products.length > 0 && (
        <>
          <SlideMobile products={products} className="flex lg:hidden"/>
          <SlideDesktop
            products={products}
            columns={4}
            className="hidden lg:flex"
          />
        </>
      )}
    </section>
  );
};

interface SlideProps {
  products: TProduct[];
  columns: number;
  className?: string
}

const SlideDesktop = ({ products, columns, className }: SlideProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex <= 1) {
        setHasPrev(false);
      } else {
        setHasPrev(true);
      }
      setHasNext(true);

      return prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex + 1 >= products.length - columns) {
        setHasNext(false);
      }
      setHasPrev(true);
      return prevIndex + 1;
    });
  };

  const getWidthCard = ()=>{
    if(window.innerWidth < 1280){
      return (window.innerWidth-80)/4
    }
    return 1280 / 4
  }

  const determineHasNext = useCallback(() => {
    return products.length > columns;
  }, [products.length, columns]);

  useEffect(()=>{
    setHasNext(determineHasNext());
  },[products.length, determineHasNext])

  return (
    <section className={cn("relative flex items-center", className)}>
      <button
        onClick={handlePrev}
        disabled={!hasPrev}
        className={`absolute z-20 -left-[20px] top-1/3 transform -translate-y-1/2 w-10 h-10 p-[7px] border border-spacing-1 border-neutral-900 opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex disabled:hidden`}>
        <IoIosArrowBack />
      </button>
      <section className="w-mx overflow-hidden mx-auto">
        <div
          style={{
            transition: "transform 0.5s ease",
            transform: `translateX(-${currentIndex * getWidthCard()}px)`, 
          }}
          >
          <ul className={"pt-4 md:pt-7 pb-3 h-auto max-w-mx  grid grid-cols-[repeat(7,calc(95%/4))] gap-4"}>
            {products.map((product, index) => (
              <li
                key={product._id + index}
                className="relative bg-white md:m-0 ">
                <SuggestedProductCard producto={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <button
        onClick={handleNext}
        disabled={!hasNext}
        className={`absolute -right-[20px] top-1/3 transform -translate-y-1/2 w-10 h-10 p-[7px] opacity-80 border border-spacing-1 border-neutral-900 bg-neutral-100 shadow justify-center items-center inline-flex disabled:hidden`}>
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
