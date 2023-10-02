"use client";
import { useRef, useState } from "react";
import GradientImage from "../GradientImage";

type BannerProps = {
  banners: [
    {
      titulo: string;
      descripcion: string;
      imagen: {
        alt: string;
        url: string;
      };
    }
  ];
};

const Banner = ({ banners }: BannerProps) => {
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
  console.log({ banners });

  return (
    <section className="max-w-screen h-[70vh] pt-[70px] md:pt-0 overflow-hidden relative group">
      <section
        className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory"
        onScroll={handleScroll}
        ref={bannerRef}
      >
        {banners.map((banner, index) => (
          <GradientImage
            key={index + banner.titulo}
            src={banner.imagen.url}
            alt={banner.imagen.alt}
            layout="fill"
            imageClassName="fit object-cover object-top"
            containerclassName={`snap-center snap-always ${
              index === 1 && "snap-mandatory"
            } min-w-full px-2 pt-2 pb-9 flex-col justify-end items-center gap-2.5 inline-flex`}
          >
            <div className="sticky z-10 self-stretch h-[114px] flex-col justify-center items-center gap-2.5 flex">
              <div className="self-stretch text-center text-white text-[32px] font-semibold font-lora uppercase leading-[38.40px]">
                {banner.titulo}
              </div>
            </div>
          </GradientImage>
        ))}
      </section>

      <div className="flex absolute z-30 bottom-9 m-auto left-0 right-0 justify-center py-2">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1.5 cursor-pointer ${
              index === scrollPosition ? "bg-white" : "bg-[#8f8e94]"
            }`}
            onClick={() => changeScrollPosition(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
