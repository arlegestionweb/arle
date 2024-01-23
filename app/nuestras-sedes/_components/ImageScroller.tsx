"use client"
import Image from "next/image";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoConstructOutline } from "react-icons/io5";

interface MyImage {
    url: string;
}
interface Props {
    images: MyImage[];
}

const ImageScroller = ({images}: Props) => {

    
    const carouselRef = useRef<HTMLDivElement>(null);
    
    const [scroll, setScroll] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);

    const selectedImage = Math.round((scroll-(width*0.2+8.4))/(width*0.4));
    
    
    const handleScroll = () => {
        if(carouselRef.current){
            setScroll(carouselRef.current.scrollLeft);
        }
    }
    useLayoutEffect(() => {
            handleScroll();
        carouselRef.current?.addEventListener('scroll', handleScroll);
        return() => {
            carouselRef.current?.removeEventListener('scroll', handleScroll);
        }
    },[]);

    const handleWidth = () => {
        if(window.innerWidth){
            setWidth(window.innerWidth)
        }
    }

    useLayoutEffect(() => {
        handleWidth();
        window.addEventListener('resize', handleWidth);
        return() => {
            window.removeEventListener('resize', handleWidth);
        }
    }, [])
    
    if(!images) return null    
    
    return (
        <section ref={carouselRef} className={`w-full h-[calc(0.4*100vw)] flex items-center overflow-x-auto snap-mandatory snap-x`}>
                <span className="px-[calc(100vw/4)]"/>
                {images.map((item, i) => (
                    <Image className={`h-full w-[calc(0.4*100vw)] snap-center object-cover scale-75 transition-all ${selectedImage == i ? 'scale-95' : ''}`} key={i} width={500} height={500} src={item.url} alt={`imagen de sede Arle`} />
                ))}
                <span className="px-[calc(100vw/4)]"/>
        </section>

    )
}

export default ImageScroller