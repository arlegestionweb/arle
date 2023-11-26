"use client";
import React, { useRef, useState } from "react";
import GradientImage from "../GradientImage";
import { cn } from "@/app/_lib/utils";
import { TBanner } from "@/sanity/queries/pages/listingQueries";

type BannerProps = {
  banners: TBanner[];
  className?: string;
};

const Banner = ({ banners, className }: BannerProps) => {
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
        "max-w-screen h-[70vh] pt-[70px] md:pt-0 overflow-hidden relative group",
        className
      )}>
      <section
        className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory"
        onScroll={handleScroll}
        ref={bannerRef}>
        {banners.map((banner, index) => (
          <React.Fragment key={index + banner.titulo}>
            {banner.imagen && (
              <GradientImage
                src={banner.imagen.url}
                alt={banner.imagen.alt}
                layout="fill"
                imageClassName="fit object-cover object-top"
                containerclassName={`snap-center snap-always ${
                  index === 1 && "snap-mandatory"
                } min-w-full px-2 pt-2 pb-9 flex-col justify-end items-center gap-2.5 inline-flex`}>
                <div className="sticky z-10 self-stretch h-[114px] flex-col justify-center items-center gap-2.5 flex">
                  <div className="self-stretch text-center text-white text-[32px] font-semibold font-lora uppercase leading-[38.40px]">
                    {banner.titulo}
                  </div>
                </div>
              </GradientImage>
            )}
          </React.Fragment>
        ))}
      </section>

      <div className="flex absolute z-20 bottom-9 m-auto left-0 right-0 justify-center py-2">
        {banners.map((banner, index) => (
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