"use client";
import React, { useEffect, useRef, useState } from "react";
import GradientImage from "../GradientImage";
import { cn, getOrSetExternalIdPixel } from "@/app/_lib/utils";
import Link from "next/link";
import { THeroSection } from "@/sanity/queries/pages/homepageQuery";
import { pagePixelView } from "@/app/_lib/pixelActions";
import GradientVideo from "../GradientVideo";

type BannerProps = {
  content: THeroSection;
  className?: string;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Banner = ({ content, className, searchParams}: BannerProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const externalId = getOrSetExternalIdPixel();
    const savedData = JSON.parse(localStorage.getItem("shippingData") || "{}");
    const searchfbclid = searchParams.fbclid as string || null;
    if(searchfbclid) {
      const timeInMillis = Date.now();
      const setFbclid = `fb.1.${timeInMillis}.${searchfbclid}`
      localStorage.setItem("fbclid",setFbclid)
    };
    const fbclid = localStorage.getItem("fbclid") || null;
    const clientData = {
      name: savedData.name as string,
      email: savedData.email as string,
      phone: savedData.phone as string,
    }
    pagePixelView(clientData, externalId, fbclid);
  }, []);

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

  const width = 2000;
  const height = null;

  return (
    <section
      className={cn(
        "max-w-screen h-[60svh] md:h-[65svh] lg:h-[75svh] overflow-hidden relative group",
        className
      )}
    >
      <section
        className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory"
        onScroll={handleScroll}
        ref={bannerRef}
      >
        {content.banners.map((banner, index) => (
            <React.Fragment key={index + (banner?.imagen?.url || "") }>
            {banner.imagen && banner.imagenOVideo ? (
                <GradientImage
                  src={banner.imagen.url}
                  alt={banner.imagen.alt || ""}
                  layout="fill"
                  width={2000}
                  height={1000}
                  quality={100}
                  imageClassName="object-center"
                  containerclassName={`snap-center snap-always ${
                    index === 1 && "snap-mandatory"
                  } min-w-full px-2 pt-2 flex-col justify-end items-center gap-2.5 inline-flex`}
                  ></GradientImage>
                ) : (
                  <GradientVideo
                  url={banner.videoObject?.video?.url || ""}
                  imagenUrl={banner.videoObject?.imagenDeCarga?.url || ""}
                  imagenAlt={banner.videoObject?.imagenDeCarga?.alt || ""}
                  containerclassName={`snap-center snap-always ${
                    index === 1 && "snap-mandatory"
                  } min-w-full px-2 pt-2 flex-col justify-end items-center gap-2.5 inline-flex`}
                  />
                )}
                </React.Fragment>
        ))}
        <section className="absolute bottom-20 w-full z-10 flex justify-center default-paddings pointer-events-none">
          <section className="w-full flex flex-col justify-center items-start gap-4 max-w-screen-xl">
            <h1 className=" text-white lux-title text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] max-w-sm sm:max-w-lg">
              {content.titulo}
            </h1>
            <h2 className=" text-white normal-subtitle">{content.subtitulo}</h2>
            {content.buttonText && (
              <Link
                className="light-button pointer-events-auto"
                href="/listing"
              >
                {content.buttonText}
              </Link>
            )}
          </section>
        </section>
      </section>

      <div className="flex absolute z-20 bottom-9 m-auto left-0 right-0 justify-center py-2">
        {content.banners.map((banner, index) => (
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
    </section>
  );
};

export default Banner;
