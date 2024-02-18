"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GiCardJackClubs } from "react-icons/gi";

interface MyImage {
  url: string;
}
interface Props {
  images: MyImage[];
}

const ImageScroller = ({ images }: Props) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [scroll, setScroll] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);

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
      setWidth(window.innerWidth);
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

  // useEffect(() => {
  //   if(width>450){
  //     setPercentage(0.6);
  //     console.log("yes or not")
  //   } else setPercentage(0.4);
  // }, [width])

  if (!images) return null;

  return (
    <section
      ref={carouselRef}
      className={`w-full flex overflow-x-auto scrollbar-hide snap-mandatory snap-x`}
    >
      <section className="flex"> 
      <span className="px-[calc(100vw/4)]" />
      { images.map((item, i) => (
        <section 
        key={i + item.url}
        className={`w-[60vw] xs:w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] aspect-square flex`}>
        <Image
          onClick={() =>
            carouselRef?.current?.scrollTo({ left: i * imageWidth + (imageWidth/2) + 2.3 ,
              behavior: "smooth"})
            }
            className={`h-full snap-center object-cover scale-75 transition-all w-full] ${
              selectedImage === i ? "scale-100 cursor-default" : "cursor-pointer"
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
