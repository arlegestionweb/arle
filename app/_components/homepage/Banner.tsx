"use client";
import React, { useRef, useState } from "react";
import GradientImage from "../GradientImage";
import { cn } from "@/app/_lib/utils";
import {
  TlistingContent,
  TBanner,
  TBannerBrands,
} from "@/sanity/queries/pages/listingQueries";
import { useSearchParams } from "next/navigation";

type BannerProps = {
  banners: TlistingContent;
  bannersByBrand: TBannerBrands | null | undefined;
  className?: string;
};

const Banner = ({ banners, bannersByBrand, className }: BannerProps) => {
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

  const searchParams = useSearchParams();

  const selectedProductType = searchParams.get("type");

  const selectedBanners =
    selectedProductType === "gafa"
      ? banners.gafasBanners
      : selectedProductType === "reloj"
      ? banners.relojesBanners
      : selectedProductType === "perfume"
      ? banners.perfumesBanners
      : banners.generalBanners;

  return (
    <>
      {bannersByBrand && bannersByBrand.length > 0
        ? bannersByBrand.map((brand, index) =>
            brand.banners?.map((banner, index) => (
              <div className="h-[140px] md:h-[160px] lg:h-[180px] flex justify-center bg-gray-950">
                <section
                  className={cn("w-screen overflow-hidden relative", className)}
                >
                  <section
                    className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory bg-gray-100"
                    onScroll={handleScroll}
                    ref={bannerRef}
                  >
                    <React.Fragment key={index + banner?.imagen?.url}>
                      <GradientImage
                        src={banner.imagen.url}
                        alt={banner.imagen.alt || ""}
                        layout="fill"
                        height={300}
                        width={2000}
                        quality={90}
                        gradientOff
                        imageClassName="object-cover object-center w-full h-full"
                        containerclassName={`snap-center snap-always ${
                          index === 1 && "snap-mandatory"
                        } min-w-full justify-center items-center flex`}
                      ></GradientImage>
                    </React.Fragment>
                  </section>
                </section>
              </div>
            ))
          )
        : selectedBanners &&
          selectedBanners.map(
            (banner, index) =>
              banner.imagen && (
                <div className="h-[140px] md:h-[160px] lg:h-[180px] flex justify-center bg-gray-950">
                  <section
                    className={cn(
                      "w-screen overflow-hidden relative",
                      className
                    )}
                  >
                    <section
                      className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory bg-gray-100"
                      onScroll={handleScroll}
                      ref={bannerRef}
                    >
                      <React.Fragment key={index + banner?.imagen?.url}>
                        <GradientImage
                          src={banner.imagen.url}
                          alt={banner.imagen.alt || ""}
                          layout="fill"
                          height={300}
                          width={2000}
                          quality={100}
                          gradientOff
                          imageClassName="object-cover object-top w-full h-full"
                          containerclassName={`snap-center snap-always ${
                            index === 1 && "snap-mandatory"
                          } min-w-full justify-center items-center flex`}
                        >
                          <div className="absolute bottom-8 md:bottom-10 z-10 px-3 flex justify-center">
                            <h2 className="capitalize text-center text-white text-xl md:text-2xl lux-title">
                              {banner?.titulo}
                            </h2>
                          </div>
                        </GradientImage>
                      </React.Fragment>
                    </section>
                  </section>
                </div>
              )
          )}

      <div className="flex absolute z-20 bottom-2 m-auto left-0 right-0 justify-center py-2">
        {selectedBanners &&
          selectedBanners.map((banner, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full mx-1.5 cursor-pointer ${
                index === scrollPosition
                  ? "bg-color-bg-surface-1-default"
                  : "bg-[#8f8e94]"
              }`}
              onClick={() => changeScrollPosition(index)}
            />
          ))}
      </div>
    </>
  );
};

export default Banner;
