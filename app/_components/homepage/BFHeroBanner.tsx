"use client";
import React, { useEffect, useRef, useState } from "react";
import GradientImage from "../GradientImage";
import { cn, getOrSetExternalIdPixel } from "@/app/_lib/utils";
import { THeroSection } from "@/sanity/queries/pages/homepageQuery";
import { pagePixelView } from "@/app/_lib/pixelActions";
import GradientVideo from "../GradientVideo";
import { unstable_noStore as noStore } from "next/cache";

type BannerProps = {
  content: THeroSection;
  className?: string;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const BFHeroBanner = ({ content, className, searchParams}: BannerProps) => {
  noStore();
  const [scrollPosition, setScrollPosition] = useState(0);
  const bannerRef = useRef<HTMLElement>(null);
  const autoScrollInterval = 3000;

  useEffect(() => {
    const externalId = getOrSetExternalIdPixel();
    const savedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("shippingData") || "{}") : null;
    const searchfbclid = searchParams.fbclid as string || null;
    if(searchfbclid && typeof window !== 'undefined') {
      const timeInMillis = Date.now();
      const setFbclid = `fb.1.${timeInMillis}.${searchfbclid}`
      localStorage.setItem("fbclid",setFbclid)
    };
    const clientData = {
      name: savedData.name as string,
      email: savedData.email as string,
      phone: savedData.phone as string,
    }
    if(typeof window !== "undefined"){
      const fbclid = localStorage.getItem("fbclid") || null;
      pagePixelView(clientData, externalId, fbclid);
    } else {
      pagePixelView(clientData, externalId, null);
    }
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex =
        (scrollPosition + 1) % content.banners.length; // Cicla al inicio cuando llega al final
      changeScrollPosition(nextIndex);
    }, autoScrollInterval);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [scrollPosition, content.banners.length]);


  // const [timeRemaining, setTimeRemaining] = useState('');

  // useEffect(() => {
  //   // Fecha fija: 30 de noviembre a la medianoche
  //   const discountEndTime = new Date('2024-11-30T00:00:00').getTime();

  //   const intervalId = setInterval(() => {
  //     const now = new Date().getTime();
  //     const timeLeft = discountEndTime - now;

  //     if (timeLeft < 0) {
  //       clearInterval(intervalId);
  //       setTimeRemaining('Discount has ended');
  //     } else {
  //       const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  //       const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //       const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  //       setTimeRemaining(`${days}días ${hours}h ${minutes}m ${seconds}s`);
  //     }
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <section
      className={cn(
        "h-[80svh] lg:h-[75svh] overflow-hidden relative group flex flex-col-reverse lg:flex-row",
        className
      )}
    >
      <section
        className="w-full lg:w-1/2 lg:h-full py-10 lg:py-20 pl-5 sm:pl-8 flex justify-end"
      >
        <div className="justify-center flex flex-col gap-6 lg:max-w-screen-sm pr-4">
          <h1 className="text-5xl md:text-7xl font-tajawal font-extrabold text-arle-blue">BLACK FRIDAY</h1>
          {/* <p>{timeRemaining}</p> */}
          <p className="font-tajawal text-base md:text-xl">Las mejores ofertas del año. Encuentra productos de Lujo garantizados con descuentos INCREÍBLES.</p>
          <div className="flex gap-1 xs:gap-2 md:gap-8 w-full justify-center md:justify-start">
            <article className="flex flex-col w-20 md:w-24 items-center gap-2">
              <span className="h-20 w-20 md:h-24 md:w-24 border-4 border-slate-300 bg-arle-blue rounded-full flex items-center justify-center p-4 md:p-6">
                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Time-Clock-Fire--Streamline-Ultimate"><desc>Time Clock Fire Streamline Icon: https://streamlinehq.com</desc><g id="Time-Clock-Fire--Streamline-Ultimate.svg"><path d="M22.53 10.1a8 8 0 0 0 -2.43 -5.64 1 1 0 0 0 -1 -0.19 1 1 0 0 0 -0.63 0.84A1.35 1.35 0 0 1 17 6.31a4.39 4.39 0 0 1 -0.87 -4.82 1 1 0 0 0 -0.9 -1.49c-4.31 0 -7.55 2.41 -8.5 6.21a1.53 1.53 0 0 1 -1 -1.15 1 1 0 0 0 -1.63 -0.62A7.41 7.41 0 0 0 1.53 11a6.35 6.35 0 0 0 3.15 4.7 0.25 0.25 0 0 0 0.22 0 0.24 0.24 0 0 0 0.15 -0.16 7.71 7.71 0 0 1 0.54 -1.36 0.25 0.25 0 0 0 -0.08 -0.33 4.33 4.33 0 0 1 -2 -3.12A5.43 5.43 0 0 1 4.46 7a3.68 3.68 0 0 0 3.17 1.3 1 1 0 0 0 0.89 -0.86 6 6 0 0 1 5.29 -5.33 6.35 6.35 0 0 0 2.26 6 1 1 0 0 0 0.5 0.17 3.56 3.56 0 0 0 3.1 -1.21 5.87 5.87 0 0 1 0.86 3 3.92 3.92 0 0 1 -1.46 3.17 0.25 0.25 0 0 0 -0.05 0.33 7.75 7.75 0 0 1 0.66 1.32 0.26 0.26 0 0 0 0.17 0.15 0.26 0.26 0 0 0 0.21 0 5.91 5.91 0 0 0 2.47 -4.94Z" fill="#fff" stroke-width="1"></path><path d="M18.73 17.75A6.25 6.25 0 1 0 12.48 24a6.26 6.26 0 0 0 6.25 -6.25Zm-2.45 0a0.75 0.75 0 0 1 -0.75 0.75h-3a0.76 0.76 0 0 1 -0.75 -0.75v-3.5a0.75 0.75 0 0 1 1.5 0v2.5a0.25 0.25 0 0 0 0.25 0.25h2a0.75 0.75 0 0 1 0.75 0.75Z" fill="#fff" stroke-width="1"></path></g></svg>
              </span>
              <p className="font-tajawal text-sm text-center">Ofertas por tiempo limitado</p>
            </article>
            <article className="flex flex-col w-20 md:w-24 items-center gap-2">
              <span className="h-20 w-20 md:h-24 md:w-24 border-4 border-slate-300 bg-arle-blue rounded-full flex items-center justify-center p-4 md:p-6">
                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Shipment-Check--Streamline-Sharp" ><desc>{"Shipment Check Streamline Icon: https://streamlinehq.com"}</desc><g id="shipment-check--shipping-parcel-shipment-check-approved"><path id="Subtract" fill="#fff" fillRule="evenodd" d="M11 0.930664V6.23242H1.48959L5.05883 0.930664H11ZM22.5104 6.23242H13V0.930664h5.9405l3.5699 5.301756Zm-21.0729 2h21.125l0 14.69838H1.4375V8.23242Zm15.7378 4.36708 0.5996 -0.8003 -1.6007 -1.1991 -0.5995 0.8004 -4.1982 5.6043 -2.40197 -1.7993 -0.80034 -0.5996 -1.19907 1.6007 0.80035 0.5996 3.20233 2.3988 0.8003 0.5995 0.5996 -0.8003 4.7976 -6.4047Z" clipRule="evenodd" strokeWidth={1} /></g></svg>
              </span>
              <p className="font-tajawal text-sm text-center">Envíos Gratis siempre</p>
            </article>
            <article className="flex flex-col w-20 md:w-24 items-center gap-2">
              <span className="h-20 w-20 md:h-24 md:w-24 border-4 border-slate-300 bg-arle-blue rounded-full flex items-center justify-center p-4 md:p-6">
              <svg className="w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Discount-Percent-Coupon--Streamline-Flex" ><desc>{"Discount Percent Coupon Streamline Icon: https://streamlinehq.com"}</desc><g id="discount-percent-coupon--shop-shops-stores-discount-coupon-voucher"><path id="Subtract" fill="#fff" fillRule="evenodd" d="M2.6664 1.53865c3.34957 -0.56804 5.2855 -0.48051 8.6539 -0.00207 1.2575 0.17861 2.4297 1.0594 2.4297 2.49503v1.16336c0 0.19944 -0.1185 0.37981 -0.3016 0.45895 -0.5336 0.2307 -0.9054 0.76134 -0.9054 1.37769 0 0.61636 0.3718 1.14699 0.9054 1.3777 0.1831 0.07914 0.3016 0.2595 0.3016 0.45894v1.16335c0 0.6808 -0.2483 1.2722 -0.6975 1.7126 -0.4429 0.4342 -1.0519 0.6943 -1.7382 0.7833 -3.36136 0.4358 -5.2609 0.4388 -8.62891 -0.0001C1.33664 12.3517 0.25 11.455 0.25 10.0316V8.8683c0 -0.19945 0.118535 -0.37982 0.301613 -0.45895 0.533667 -0.23068 0.905537 -0.76135 0.905537 -1.37774S1.08528 5.88456 0.551613 5.65388C0.368535 5.57474 0.25 5.39437 0.25 5.19492V4.03161c0 -0.69053 0.265839 -1.27164 0.718392 -1.70232 0.443658 -0.42221 1.043748 -0.67969 1.698008 -0.79064Zm3.5001 3.49297c0 0.54095 -0.43853 0.97949 -0.97949 0.97949s-0.97949 -0.43854 -0.97949 -0.97949c0 -0.54096 0.43853 -0.9795 0.97949 -0.9795s0.97949 0.43854 0.97949 0.9795Zm2.64649 4.99998c0.54096 0 0.97949 -0.43852 0.97949 -0.97948 0 -0.54095 -0.43853 -0.97949 -0.97949 -0.97949s-0.97949 0.43854 -0.97949 0.97949c0 0.54096 0.43853 0.97948 0.97949 0.97948Zm0.75975 -4.90135c0.21682 -0.26858 0.17485 -0.66208 -0.09373 -0.8789 -0.26859 -0.21681 -0.66209 -0.17485 -0.8789 0.09374 -1.5209 1.88405 -2.50216 2.85482 -4.49847 4.49763 -0.26654 0.21933 -0.3048 0.61321 -0.08546 0.87974 0.21933 0.26653 0.61321 0.30484 0.87974 0.08546 2.05407 -1.69034 3.09685 -2.72044 4.67682 -4.67767Z" clipRule="evenodd" strokeWidth={1} /></g></svg>
              </span>
              <p className="font-tajawal text-sm text-center">Productos Hasta 50% OFF</p>
            </article>
            <article className="flex flex-col w-20 md:w-24 items-center gap-2">
              <span className="h-20 w-20 md:h-24 md:w-24 border-4 border-slate-300 bg-arle-blue rounded-full flex items-center justify-center p-4 md:p-6">
                <svg className="w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Star-Badge--Streamline-Core" ><desc>{"Star Badge Streamline Icon: https://streamlinehq.com"}</desc><g id="star-badge--ribbon-reward-like-social-rating-media"><path id="Union" fill="#fff" fillRule="evenodd" d="M6.997 0.009a5.125 5.125 0 1 0 0 10.249 5.125 5.125 0 0 0 0 -10.25ZM7.2 2.432l0.683 1.374a0.214 0.214 0 0 0 0.174 0.127l1.516 0.23a0.23 0.23 0 0 1 0.127 0.397L8.582 5.624a0.222 0.222 0 0 0 0 0.206l0.214 1.508a0.23 0.23 0 0 1 -0.34 0.246l-1.35 -0.714a0.27 0.27 0 0 0 -0.223 0l-1.35 0.714a0.23 0.23 0 0 1 -0.34 -0.246l0.253 -1.508a0.222 0.222 0 0 0 -0.04 -0.206L4.287 4.552a0.23 0.23 0 0 1 0.127 -0.39l1.517 -0.221a0.214 0.214 0 0 0 0.174 -0.127l0.683 -1.374a0.23 0.23 0 0 1 0.413 -0.008Zm5.1 6.238a6.385 6.385 0 0 1 -3.665 2.625l1.412 2.446a0.5 0.5 0 0 0 0.916 -0.12l0.51 -1.899 1.898 0.509a0.5 0.5 0 0 0 0.562 -0.733L12.301 8.67Zm-6.936 2.626a6.384 6.384 0 0 1 -3.667 -2.621l-1.63 2.823a0.5 0.5 0 0 0 0.562 0.733l1.899 -0.509 0.509 1.899a0.5 0.5 0 0 0 0.916 0.12l1.411 -2.445Z" clipRule="evenodd" strokeWidth={1} /></g></svg>
              </span>
              <p className="font-tajawal text-sm text-center">Descuentos Exclusivos</p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="banner-scrollbar flex w-full lg:w-1/2 h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory bg-blue-300"
        onScroll={handleScroll}
        ref={bannerRef}
      >
        <div className="flex absolute z-20  top-2 lg:top-auto lg:bottom-9 m-auto left-0 right-0 justify-center py-2">
        {content.banners.map((banner, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1.5 cursor-pointer ${
              index === scrollPosition
                ? "bg-arle-blue"
                : "bg-[#8f8e94]"
            }`}
            onClick={() => changeScrollPosition(index)}
          />
        ))}
      </div>
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
      </section>
    </section>
  );
};

export default BFHeroBanner;
