import Image from 'next/image';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageWrapperProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "alt" | "ref" | "height" | "width" | "loading" | "src" | "srcSet"> & {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
const ImageWrapper = ({ src, alt, height, width, ...rest }: ImageWrapperProps) => {
  const isSanityImage = src.includes("sanity");

  if (isSanityImage) {
    return (
      <Image
        {...rest}
        src={src}
        alt={alt}
        height={height}
        width={width}
      />
    );
  }

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      height={height}
      width={width}
    />
  );
};

export default ImageWrapper;