"use client";
import { TPopUpBanner } from "@/sanity/queries/siteSettings";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../_lib/hooks";
import ImageWrapper from "../listing/_components/ImageWrapper";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

type PopupProps = {
  popup: TPopUpBanner;
};

const PopUpBanner = function ({ popup }: PopupProps) {
	
	const [isOpen, setIsOpen] = useState(false);
	
  useEffect(() => {
    const checkAndSetBanner = () => {
      if( typeof window !== 'undefined'){
        const lastOpened = localStorage.getItem('bannerLastOpened');
        const now = new Date().getTime();
        const twoHours = 20 * 60 * 1000; // 20 minutos en milisegundos
        
        // Convierte lastOpened a número si existe
        const lastOpenedTime = lastOpened ? Number(lastOpened) : 0;
        
        if (!lastOpened || now - lastOpenedTime > twoHours) {
          // Si nunca se ha abierto o han pasado más de 2 horas, abre el banner
          setTimeout(() => {
            setIsOpen(true);
            localStorage.setItem('bannerLastOpened', now.toString()); // Guarda el timestamp actual como string
          }, 500);
        }
      }
    };

    checkAndSetBanner();
  }, []);

	
  const bannerRef = useRef(null);
	
  const closeBanner = () => {
		setIsOpen(false);
  };
	
  useClickOutside(bannerRef, closeBanner);
	
	const pathname = usePathname();
	if (pathname.includes("admin") || pathname.includes("mass-uploads")) return;
	
  if (popup.opciones)
    return (
      <>
        {isOpen && (
          <section className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
            <section
              className="w-[85vw] h-[85vw] max-w-[500px] max-h-[500px] bg-white relative"
              ref={bannerRef}
            >
              <button
                onClick={() => closeBanner()}
                className={`absolute -top-[20px] -right-[20px] z-20 w-10 h-10 p-[7px] border border-spacing-1 border-neutral-900 opacity-80 bg-neutral-100 shadow justify-center items-center inline-flex pointer-events-auto button-float`}
              >
                <IoMdClose className="text-xl" />
              </button>
              <ImageWrapper
                height={1000}
                width={1000}
                quality={100}
                src={popup.opciones.imagen.url}
                alt={popup.opciones.imagen.alt || ""}
                className=" h-full w-full object-contain object-center pointer-events-auto"
              />
							<Link
								className="absolute border border-neutral-900 bottom-[12%] w-[60vw] left-0 right-0 mx-auto light-button button-float z-20"
								href={popup.opciones.link}
								onClick={() => closeBanner()}
							>
								{popup.opciones.boton}
							</Link>
            </section>
          </section>
        )}
      </>
    );
};

export default PopUpBanner;
