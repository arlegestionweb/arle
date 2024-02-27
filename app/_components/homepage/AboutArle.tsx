"use client";
import Link from "next/link";
import GradientImage from "../GradientImage";
import Image from "next/image";
import React, { useRef, useState } from "react";

type AboutArleProps = {
  sobre: {
    titulo: string;
    descripcion: string;
    imagenes: {
      url: string;
      alt: string;
    }[];
  };
};

const AboutArle = ({ sobre }: AboutArleProps) => {
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
    <section className="relative w-screen bg-arle-blue flex flex-col md:flex-row md:items-center md:justify-end md:pl-14 overflow-hidden">
      <section className=" md:w-1/2 px-6 xs:px-8 sm:pl-14 md:pl-0 pt-20 pb-8 md:py-0 md:max-w-screen-sm flex flex-col gap-4 overflow-hidden">
        <Image
          className="h-[500px] w-[500px] absolute z-0 -top-[150px] xs:-top-[200px] md:-top-[45%] left-[30%] sm:left-[45%] md:left-[20%] lg:left-[25%] 2xl:left-[35%]"
          width={500}
          height={500}
          src="/ArleEscudoSobreAzul.svg"
          alt="Escudo de Arlé"
        />
        <h2 className="text-slate-200 text-start section-title text-shadow z-10">
          {sobre.titulo}
        </h2>
        <p className=" text-slate-300 section-text max-w-lg z-10">
          {sobre.descripcion}
        </p>
        <Link
          className="light-button hidden md:block z-10"
          href="/sobre-nosotros"
        >
          Conócenos
        </Link>
      </section>

      <section className="w-full max-w-full h-[400px] md:w-1/2 overflow-hidden relative group">
        <section
          className="banner-scrollbar flex w-full h-full overflow-x-scroll scroll-smooth snap-x snap-mandatory"
          onScroll={handleScroll}
          ref={bannerRef}
        >
          {sobre.imagenes.map((banner, index) => (
            <React.Fragment key={index + banner.alt}>
              {banner && (
                <GradientImage
                  src={banner.url}
                  alt={banner.alt}
                  layout="fill"
                  imageClassName="object-cover object-center"
                  containerclassName={`snap-center snap-always ${
                    index === 1 && "snap-mandatory"
                  } min-w-full px-2 pt-2 pb-9 flex-col justify-end items-center gap-2.5 inline-flex`}
                ></GradientImage>
              )}
            </React.Fragment>
          ))}
          <div className="sticky px-4 py-6 w-full h-full justify-center flex items-end md:hidden">
            <Link className="light-button" href="/sobre-nosotros">
              Conócenos
            </Link>
          </div>
        </section>

        <ul className="flex absolute z-20 bottom-9 m-auto left-0 right-0 justify-center py-2">
          {sobre.imagenes.map((banner, index) => (
            <li
              key={index}
              className={`w-2.5 h-2.5 rounded-full mx-1.5 cursor-pointer ${
                index === scrollPosition
                  ? "bg-color-bg-surface-1-default"
                  : "bg-[#8f8e94]"
              }`}
              onClick={() => changeScrollPosition(index)}
            />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default AboutArle;
