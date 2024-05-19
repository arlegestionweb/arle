import React from "react";

type GradientImageProps = {
  src: string;
  alt: string;
  layout: string;
  height?: number;
  width?: number;
  imageClassName?: string;
  containerclassName?: string;
  children?: React.ReactNode;
  gradientOff?: boolean;
  specialOpacity?: number;
  quality?: number;
};

function GradientImage({
  src,
  alt,
  layout,
  height,
  width,
  imageClassName,
  containerclassName,
  children,
  gradientOff,
  specialOpacity,
  quality,
}: GradientImageProps) {
  return (
    <div className={`relative h-full w-full ${containerclassName}`}>
      <picture className={`object-cover absolute h-full w-full ${imageClassName}`}>
        <source
          sizes={`(max-width: 608px) ${width ? `${width}px` : `85vw`}, 608px`}
          srcSet={`
            ${src}?fit=max&q=${quality || 80}&w=1920&fm=webp 1920w,
            ${src}?fit=max&q=${quality || 80}&w=1280&fm=webp 1280w,
            ${src}?fit=max&q=${quality || 80}&w=640&fm=webp 640w,
            ${src}?fit=max&q=${quality || 80}&w=320&fm=webp 320w,
          `}
          type="image/webp"
        />
        <img
          src={src}
          alt={alt || ""}
          width={width || 800}
          height={height || 400}
          loading="lazy"
          decoding="async"
          className={`object-cover absolute h-full w-full ${imageClassName}`}
        />
      </picture>
      {/* Gradient */}
      {!gradientOff && (
        <div className={`w-full h-full left-0 bottom-0 absolute bg-gradient-to-t from-black to-transparent opacity-70`} />
      )}

      {/* content */}
      {children}
    </div>
  );
}

export default GradientImage;
