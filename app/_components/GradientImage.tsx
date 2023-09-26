import Image from "next/image";
import React from "react";

type GradientImageProps = {
  src: string;
  alt: string;
  layout: string;
  imageClassName?: string;
  containerclassName?: string
  children?: React.ReactNode;
};

function GradientImage({src, alt, layout, imageClassName, containerclassName, children}: GradientImageProps) {
  return (
    <div className={`relative h-full w-full ${containerclassName}`}>
      <Image
        src={src}
        alt={alt}
        fill
        objectFit="cover"
        className={imageClassName}
      />
      {/* Gradient */}
      <div className="w-full h-full left-0 bottom-0 absolute bg-gradient-to-t from-black to-transparent opacity-90" />

      {/* content */}
      {children}
    </div>
  );
}

export default GradientImage;
