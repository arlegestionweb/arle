"use client";
import React, { useRef, useState } from "react";
import GradientImage from "../GradientImage";
import { cn } from "@/app/_lib/utils";
import Link from "next/link";
import { THeroSection } from "@/sanity/queries/pages/homepageQuery";

type BannerProps = {
    content: THeroSection,
  className?: string;
};

const Banner = ({ content, className }: BannerProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const bannerRef = useRef<HTMLElement>(null);

  const handleScroll = (event: any) => {
    const element = event.target as HTMLElement;
    const scrollValue = element.scrollLeft;
    const imageWidth = element.offsetWidth;
    const newIndex = Math.round(scrollValue / imageWidth);
    setScrollPosition(newIndex);
  };

  const changeScrollPosition = (index: number) => {
    if (bannerRef.current) {
      const imageWidth = bannerRef.current.offsetWidth;
      bannerRef.current.scrollTo({
        left: imageWidth * index,
        behavior: "smooth",
      });
      setScrollPosition(index);
    }
  };
  // console.log({ banners });

  return (
    <section
      className={cn(
        "max-w-screen h-[70vh] pt-[60px] md:pt-0 overflow-hidden relative group",
        className
      )}>
      <section
        className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory"
        onScroll={handleScroll}
        ref={bannerRef}>
        {content.banners.map((banner, index) => (
          <React.Fragment key={index + banner.imagen.alt}>
            {banner.imagen && (
              <GradientImage
                src={banner.imagen.url}
                alt={banner.imagen.alt}
                layout="fill"
                imageClassName="fit object-cover object-top"
                containerclassName={`snap-center snap-always ${
                  index === 1 && "snap-mandatory"
                } min-w-full px-2 pt-2 pb-9 flex-col justify-end items-center gap-2.5 inline-flex`}>
              </GradientImage>
            )}
          </React.Fragment>
        ))}
                <section className="absolute bottom-20 w-full z-10 self-stretch flex-col justify-center items-center gap-2.5 flex">
                  <h2 className="self-stretch text-center text-white text-[32px] font-semibold font-lora uppercase leading-[38.40px]">
                    {content.titulo}
                  </h2>
                  <p className="text-center text-white text-2xl font-light font-lora leading-[28.80px]">
                    {content.subtitulo}
                  </p>
                  <Link className="text-zinc-800 text-lg font-medium leading-[27px] px-20 py-[8.50px] bg-color-bg-surface-1-default" href="/listing" >Explora todos los productos</Link>
                </section>
      </section>

      <div className="flex absolute z-20 bottom-9 m-auto left-0 right-0 justify-center py-2">
        {content.banners.map((banner, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1.5 cursor-pointer ${
              index === scrollPosition ? "bg-color-bg-surface-1-default" : "bg-[#8f8e94]"
            }`}
            onClick={() => changeScrollPosition(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;