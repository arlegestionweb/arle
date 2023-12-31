import { cn } from "@/app/_lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import React from "react";

const infoVariants = cva(
  "min-h-[40vh] h-auto pt-6 lg:py-12 text-color-bg-surface-1-default lg:flex gap-6 items-center",
  {
    variants: {
      labelType: {
        dark: "text-color-bg-surface-1-default bg-slate-900",
        light: "text-slate-900 ",
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
  DesciptionComp?: JSX.Element;
  ImageComp?: JSX.Element;
  className?: string;
} & VariantProps<typeof infoVariants>;

const  InfoSection = (props: InfoProps) => {
  return (
    <section
      className={cn(
        infoVariants({ labelType: props.labelType }),
        props.className
      )}>
      <section className="px-4 w-full lg:h-full flex flex-col justify-center items-center gap-2 pb-5 flex-1">
        {!props.DesciptionComp ? (
          <>
            <h2 className="w-full text-2xl font-semibold font-crimson leading-7">
              {props.titulo}
            </h2>
            {props.subTitulo && (
              <h3 className="w-full text-xl font-semibold font-crimson leading-[23px]">
                {props.subTitulo}
              </h3>
            )}
            <p className="basis-0 opacity-95 w-full text-lg font-normal font-tajawal leading-snug">
              {props.descripcion}
            </p>
          </>
        ) : (
          <>{props.DesciptionComp}</>
        )}
      </section>
      {!props.ImageComp ? (
        <div className="relative w-full h-64 lg:min-h-72 flex-1">
          <Image
            alt={props.alt || ""}
            src={props.url || ""}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative w-full min-h-64 lg:min-h-72 flex-1">
          {props.ImageComp}
        </div>
      )}
    </section>
  );
};

export default InfoSection;
