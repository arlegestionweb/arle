import { TImages } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import ImageWrapper from "../listing/_components/ImageWrapper";

type Props = {
  images: ({
    url: string;
    alt?: string | null | undefined;
})[];
  index: number;
  isImageOpen: boolean | false;
  closeImage: Function;
};

const ImageModal = ({ images, index, isImageOpen, closeImage }: Props) => {

    const [imageIndex, setImageIndex] = useState<number>(0);

    useEffect(()=> {
        setImageIndex(index);
    }, [isImageOpen])


    const image = images[imageIndex];
  return (
    <div 
      className={`${
        isImageOpen ? "opacity-100 top-0 bottom-0" : "top-[100vh] -bottom-[100vh] opacity-0 pointer-events-none"
      } fixed z-[220] mt-[50px] left-0 top-0 right-0 bottom-0 transition-all duration-500 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center p-5 md:p-10 lg:p-20`}
    >
        <div className="absolute top-0 bottom-0 right-0 left-0" onClick={() => closeImage()}>
        </div>
            
      <section className="w-full h-full relative z-[125] flex items-center justify-center pointer-events-none">

      <button
        onClick={() => closeImage()}
        className={`absolute -top-[20px] -right-[20px] z-20 w-10 h-10 p-[7px] border border-spacing-1 border-neutral-900 opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex pointer-events-auto button-float`}>
        <IoMdClose className="text-xl"/>
      </button>
        
        <button
        onClick={()=>setImageIndex(imageIndex-1)}
        disabled={imageIndex === 0}
        className={`absolute z-20 -left-[20px] top-1/2 transform -translate-y-1/2 w-10 h-10 p-[7px] border border-spacing-1 border-neutral-900 opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex disabled:hidden pointer-events-auto`}>
        <IoIosArrowBack className="text-xl" />
      </button>
        <ImageWrapper
          height={900}
          width={1200}
          quality={85}
          src={image.url}
          alt={image.alt || ""}
          className=" h-full w-auto object-contain pointer-events-auto"
        />
        <button
        onClick={()=>setImageIndex(imageIndex+1)}
        disabled={imageIndex>=images.length-1}
        className={`absolute -right-[20px] top-1/2 transform -translate-y-1/2 w-10 h-10 p-[7px] opacity-80 border border-spacing-1 border-neutral-900 bg-neutral-100 shadow justify-center items-center inline-flex disabled:hidden pointer-events-auto`}>
        <IoIosArrowForward className="text-xl"/>
        </button>
      </section>
    </div>
  );
};

export default ImageModal;
