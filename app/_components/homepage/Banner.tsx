"use client";
import { useEffect, useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(1);

  const nextSlide = () => {
    const isLastSlide = currentIndex === banners.length - 1;
    const index = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, [currentIndex]);

  return (
    <section className="max-w-screen h-[70vh] pt-[70px] md:pt-0 relative group">
      {/* //* image */}

      <GradientImage
        src={banners[currentIndex].imagen.url}
        alt={banners[currentIndex].imagen.alt}
        layout="fill"
        imageClassName="fit object-cover object-top"
        containerclassName="px-2 pt-2 pb-9 flex-col justify-end items-center gap-2.5 inline-flex">
        <div className="sticky z-10 self-stretch h-[114px] flex-col justify-center items-center gap-2.5 flex">
          <div className="self-stretch text-center text-white text-[32px] font-semibold font-['Lora'] uppercase leading-[38.40px]">
            {banners[currentIndex].titulo}
          </div>
        </div>
      </GradientImage>

      <div className="flex absolute z-30 bottom-9 m-auto left-0 right-0 justify-center py-2">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1.5 cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-[#8f8e94]"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
