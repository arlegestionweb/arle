"use client";
import React, { useRef, useState } from "react";
import GradientImage from "../GradientImage";
import { cn } from "@/app/_lib/utils";
import Link from "next/link";
import { THeroSection } from "@/sanity/queries/pages/homepageQuery";

type BannerProps = {
    content: THeroSection,
  className?: string,
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

  return (
    <section
      className={cn(
        "max-w-screen h-[85vh] md:h-[75vh] overflow-hidden relative group",
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
                width={4000}
                height={2000}
                quality={100}
                imageClassName="object-cover object-top"
                containerclassName={`snap-center snap-always ${
                  index === 1 && "snap-mandatory"
                } min-w-full px-2 pt-2 flex-col justify-end items-center gap-2.5 inline-flex`}>
              </GradientImage>
            )}
          </React.Fragment>
        ))}
                <section className="absolute bottom-20 w-full z-10 flex justify-center default-paddings pointer-events-none">
                  <section className="w-full flex flex-col justify-center items-start gap-4 max-w-screen-xl">
                  <h1 className=" text-white lux-title text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] max-w-sm sm:max-w-lg">
                    {content.titulo}
                  </h1>
                  <h2 className=" text-white normal-subtitle">
                    {content.subtitulo}
                  </h2>
                  {content.buttonText && (
                  <Link className="light-button pointer-events-auto" href="/listing">{content.buttonText}</Link>
                  )}
                  </section>
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