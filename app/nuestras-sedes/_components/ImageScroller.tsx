"use client";
import ImageModal from "@/app/_components/ImageModal";
import ImageWrapper from "@/app/listing/_components/ImageWrapper";
import { TImages } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  images: TImages;
}

const ImageScroller = ({ images }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [scroll, setScroll] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [isImageOpen, setImageOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const selectedImage = Math.round(
    ((scroll - (imageWidth/2) + 2.3 )/ (imageWidth)
    ));

  const handleScroll = () => {
    if (carouselRef.current) {
      setScroll(carouselRef.current.scrollLeft);
    }
  };
  useLayoutEffect(() => {
    const carRef = carouselRef.current;
    handleScroll();
    carRef?.addEventListener("scroll", handleScroll);
    return () => {
      carRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWidth = () => {
    const carRef = carouselRef.current;
    if (window.innerWidth) {
      carRef && setImageWidth(carRef.clientHeight)
    }
  };

  useLayoutEffect(() => {
    handleWidth();
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  if (!images) return null;

  return (
    <section
      ref={carouselRef}
      className={`w-full flex overflow-x-auto scrollbar-hide snap-mandatory snap-x`}
    >
      <section className="flex"> 
      <ImageModal images={images} index={imageIndex} isImageOpen={isImageOpen} closeImage={()=>setImageOpen(false)}  />
      <span className="px-[calc(100vw/4)]" />
      { images.map((item, i) => (
        <section 
        key={i + item.url}
        className={`w-[60vw] xs:w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] aspect-square flex relative`}>
        <ImageWrapper
          onClick={() =>{
            carouselRef?.current?.scrollTo({ left: i * imageWidth + (imageWidth/2) + 2.3 ,
              behavior: "smooth"});
              if(selectedImage === i){
                setImageIndex(i)
                setImageOpen(true);
              }
          }}
            imageClassname={`snap-center object-cover scale-75 transition-all ease-out w-full h-full ${
              selectedImage === i ? "scale-95 cursor-zoom-in" : "cursor-pointer"
            }`}
            width={500}
            height={500}
            src={item.url}
            alt={`imagen de sede Arle`}
            />
            </section>
      ))}
      <span className="px-[calc(100vw/4)]" />
      </section>
    </section>
  );
};

export default ImageScroller;
