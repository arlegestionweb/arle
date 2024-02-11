import React from "react";
import GradientImage from "../GradientImage";
import Link from "next/link";

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

const typeParamFromTitle = (title: string) => {
  if (title.includes("perfume")) return "perfume";
  if (title.includes("reloj")) return "reloj";
  if (title.includes("gafa")) return "gafa";
};

function ExploreSection({
  section: { titulo, descripcion, imagen },
}: ExploreSectionProps) {
  return (
    <section className=" max-w-screen h-[60vh] relative">
      <GradientImage
        src={imagen.url}
        alt={imagen.alt}
        layout="fill"
        imageClassName="fit object-cover object-top"
        containerclassName="flex justify-center items-end"
      >
        <div className="sticky z-10 flex-col justify-center items-center mb-14 gap-2.5 flex w-full default-paddings">
          <h2 className="lux-title font-extralight text-4xl xs:text-[40px] tracking-wide text-center text-white">
            {titulo}
          </h2>
          <p className="text-center text-white normal-subtitle">
            {descripcion}
          </p>
          <Link
            href={`/listing?type=${typeParamFromTitle(
              titulo.toLowerCase().trim()
            )}`}
            className="light-button max-w-xs"
          >
            Explorar
          </Link>
        </div>
      </GradientImage>
    </section>
  );
}

export default ExploreSection;
