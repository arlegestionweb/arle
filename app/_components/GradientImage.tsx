import Image from "next/image";
import React from "react";

type GradientImageProps = {
  src: string;
  alt: string;
  layout: string;
  height?: number;
  width?: number;
  imageClassName?: string;
  containerclassName?: string
  children?: React.ReactNode;
  gradientOff?: boolean;
};

function GradientImage({src, alt, layout, height, width, imageClassName, containerclassName, children, gradientOff}: GradientImageProps) {
  return (
    <div className={`relative h-full w-full ${containerclassName}`}>
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 400}
        className={`object-cover absolute h-full w-full ${imageClassName}`}
      />
      {/* Gradient */}
      {!gradientOff && (
        <div className="w-full h-full left-0 bottom-0 absolute bg-gradient-to-t from-black to-transparent opacity-70" />
      )}

      {/* content */}
      {children}
    </div>
  );
}

export default GradientImage;
