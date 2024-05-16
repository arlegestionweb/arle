import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageWrapperProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "alt" | "ref" | "height" | "width" | "loading" | "src" | "srcSet"> & {
    src: string;
    alt?: string | null | undefined;
    height: number;
    width: number;
    quality?: number;
  };
const ImageWrapper = ({ src, alt, height, width, quality, ...rest }: ImageWrapperProps) => {

  if (!src) return; 

  const isSanityImage = src.includes("sanity");

  if (isSanityImage) {
    return (
      <img
        {...rest}
        src={src}
        alt={alt || ""}
        height={height}
        width={width}
        // quality={quality || 80}
      />
    );
  }

  return (
    <img
      {...rest}
      src={src}
      alt={alt || ""}
      height={height}
      width={width}
    />
  );
};

export default ImageWrapper;