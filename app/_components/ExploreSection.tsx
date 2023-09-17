import { type } from "os";
import React from "react";
import GradientImage from "./GradientImage";

type ExploreSectionProps = {
  section: {
    titulo: string;
    descripcion: string;
    imagen: {
      alt: string;
      url: string;
    };
  };
};

function ExploreSection({
  section: { titulo, descripcion, imagen },
}: ExploreSectionProps) {
  return (
    <section className="w-screen h-[377px] relative">
      <GradientImage
        src={imagen.url}
        alt={imagen.alt}
        layout="fill"
        imageClassName="fit object-cover object-top"
        containerclassName="px-2 pt-2 pb-9 flex-col justify-end items-center gap-2.5 inline-flex">
        <div className="sticky z-10 self-stretch h-[114px] flex-col justify-center items-center gap-2.5 flex">
          <h2 className="self-stretch text-center text-white text-[32px] font-semibold font-['Lora'] uppercase leading-[38.40px]">
            {titulo}
          </h2>
          <p>{descripcion}</p>
          <button className="w-[104px] h-11 px-4 py-[8.50px] bg-white justify-center items-center gap-1 inline-flex">
            <span className="text-zinc-800 text-lg font-medium leading-[27px]">
                Explorar
            </span>
            </button>
        </div>
      </GradientImage>
    </section>
  );
}

export default ExploreSection;
