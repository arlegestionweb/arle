import { cn } from "@/app/_lib/utils";
import Image from "next/image";
import React from "react";

type InfoProps = {
  titulo?: string;
  descripcion?: string;
  alt?: string;
  url?: string;
  DesciptionComp?: JSX.Element;
  ImageComp?: JSX.Element;
  className?: string;
};

const InfoSection = (props: InfoProps) => {
  return (
    <section
      className={cn(
        "min-h-[40vh] h-auto pt-6 lg:py-12 text-color-bg-surface-1-default lg:flex gap-6 items-center",
        props.className
      )}>
      <section className="px-4 flex flex-col gap-2 pb-5 flex-1">
        {!props.DesciptionComp ? (
          <>
            <h2 className="text-2xl font-semibold font-crimson leading-7">
              {props.titulo}
            </h2>
            <p className="grow shrink basis-0 opacity-95 text-lg font-normal font-tajawal leading-snug">
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
        <div className="relative w-full min-h-64 lg:min-h-72 flex-1">{props.ImageComp}</div>
      )}
    </section>
  );
};

export default InfoSection;
