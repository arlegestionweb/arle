import { cn } from "@/app/_lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import React from "react";

const infoVariants = cva(
  "",
  {
    variants: {
      labelType: {
        dark: "text-gray-100 bg-arle-blue",
        light: "text-gray-800 bg-white",
      },
    },
    defaultVariants: {
      labelType: "dark",
    },
  }
);

type InfoProps = {
  titulo?: string;
  subTitulo?: string;
  descripcion?: string;
  alt?: string;
  url?: string;
  DescriptionComp?: JSX.Element;
  ImageComp?: JSX.Element | null;
  className?: string;
} & VariantProps<typeof infoVariants>;

const InfoSection = (props: InfoProps) => {
  return (
    <section className={cn(infoVariants({ labelType: props.labelType }),"w-screen flex justify-center lg:px-20")}>
      <section
        className={cn(
          "lg:max-w-mx w-full flex flex-col lg:flex-row items-center lg:justify-center gap-2 pt-8 lg:pb-8",
          props.className
        )}
      >
        <section className="default-paddings lg:px-0 w-full lg:w-1/2 lg:h-full flex flex-col justify-center items-center gap-2">
          {!props.DescriptionComp ? (
            <section className="w-full flex flex-col gap-3">
              <h2 className="w-full text-3xl font-jomolhari leading-none">
                {props.titulo}
              </h2>
              {props.subTitulo && (
                <h3 className="w-full text-2xl font-jomolhari opacity-80 leading-none font-light">
                  {props.subTitulo}
                </h3>
              )}
              <p className="opacity-90 w-full text-lg font-light font-tajawal leading-tight">
                {props.descripcion}
              </p>
            </section>
          ) : (
            <>{props.DescriptionComp}</>
          )}
        </section>
        {!props.DescriptionComp && !props.ImageComp ? (
          <div className="relative  w-[90%] mb-8 lg:mb-0 lg:w-1/2 h-64 sm:h-72 md:h-80 lg:h-72 lg:aspect-video ">
            <Image
              alt={props.alt || ""}
              src={props.url || ""}
              height={500}
              width={500}
              className="object-contain w-full h-full"
            />
          </div>
        ) : props.ImageComp && (
            <div className="relative w-full lg:w-1/2  lg:min-h-72">
            {props.ImageComp}
            </div>
          )}
      </section>
    </section>
  );
};

export default InfoSection;
