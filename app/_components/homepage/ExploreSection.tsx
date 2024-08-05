import React from "react";
import GradientImage from "../GradientImage";
import Link from "next/link";

type ExploreSectionProps = {
  section: {
    titulo: string;
    descripcion: string;
    imagen: {
      alt?: string | null | undefined;
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
    <section className=" max-w-screen h-[55vh] md:h-[60vh] lg:h-[70] relative">
      <GradientImage
        src={imagen.url}
        alt={imagen.alt || ""}
        layout="fill"
        width={2000}
        height={1000}
        quality={100}
        imageClassName="object-cover object-center"
        containerclassName="flex justify-center items-end"
      >
        <div className="sticky z-10 flex-col justify-center items-center mb-14 gap-2.5 flex w-full default-paddings">
          <h1 className="lux-title font-extralight text-4xl xs:text-[40px] tracking-wide text-center text-white">
            {titulo}
          </h1>
          <h3 className="text-center text-white normal-subtitle">
            {descripcion}
          </h3>
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
