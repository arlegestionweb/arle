import Link from "next/link";
import { cn } from "../_lib/utils";
import { THomeSection } from "@/sanity/queries/pages/homepageQuery";
import ImageWrapper from "../listing/_components/ImageWrapper";

type ColeccionesProps = { colecciones: THomeSection[], className?: string }

const Colecciones = ({ colecciones, className }: ColeccionesProps) => {
  return (
    <section className={cn("bg-zinc-100 flex flex-col items-center py-1 gap-1", className)}>
      <h2 className="w-full text-gray-800 lux-title text-xl md:text-2xl drop-shadow-none text-center font-extralight ">
        Colecciones
      </h2>
      <ul className="no-scrollbar flex justify-start gap-2 sm:gap-4 px-2 sm:px-8 pb-0 max-w-full overflow-x-scroll overflow-y-hidden mb-0">
        {colecciones?.map((coleccion) => (
          <li
            key={coleccion.titulo}
            className="w-[100px] sm:w-[120px]"
          >
            <Link href={`/listing?coleccion=${coleccion.titulo}`} className="group" >
              {coleccion.imagen && (
                <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] flex items-center justify-center overflow-hidden ">
                  <ImageWrapper height={120}
                    width={120} className="absolute z-10 w-full h-full" src="ArleCircle.svg" alt="circulo Arle"/>
                    <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] overflow-hidden rounded-full absolute bg-white justify-center items-center flex z-0">
                  <ImageWrapper
                    src={coleccion.imagen.url}
                    alt={coleccion.imagen.alt || ""}
                    height={500}
                    width={500}
                    imageClassname="object-contain group-hover:w-[180px] group-hover:h-[180px] transition-all duration-500 z-0 w-[110px] h-[110px] rounded-full"
                    />
                    </div>
                    
                </div>
              )}
            <p className="text-center mt-1.5 text-gray-600 text-sm md:text-base font-normal font-tajawal truncate !leading-none group-hover:text-gray-500 group-hover:underline underline-offset-2 whitespace-normal tracking-tighter">
              {coleccion.titulo}
            </p>
            </Link>
            </li>
        ))}
      </ul>
    </section>
  );
};

export default Colecciones;