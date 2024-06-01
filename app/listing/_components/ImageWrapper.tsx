import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImageWrapperProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "alt" | "ref" | "height" | "width" | "loading" | "src" | "srcSet"> & {
    src: string;
    alt?: string | null | undefined;
    height: number;
    width: number;
    quality?: number;
    imageClassname?: string;
  };
const ImageWrapper = ({ src, alt, height, width, quality, imageClassname, ...rest }: ImageWrapperProps) => {

  if (!src) return; 

  const isSanityImage = src.includes("sanity");

  if (isSanityImage) {
    return (
      <picture
                className={`${imageClassname} object-contain absolute h-full w-full object-center `}
              >
                <source
                  sizes={`(max-width: 608px) ${width ? `${width}px` : `85vw`}, 608px`}
                  srcSet={`
                    ${src}?fit=max&q=${quality || 80}&w=1280&fm=webp 1280w,
                    ${src}?fit=max&q=${quality || 80}&w=640&fm=webp 640w,
                    ${src}?fit=max&q=${quality || 80}&w=320&fm=webp 320w,
                  `}
                  type="image/webp"
                />
      <img
        {...rest}
        src={src}
        alt={alt || ""}
        height={height}
        width={width}
        className={`${imageClassname} object-contain absolute h-full w-full object-center `}
      />
      </picture>
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