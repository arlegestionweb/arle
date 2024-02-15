import Image from "next/image";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { THomeSection } from "@/sanity/queries/pages/homepageQuery";

type ColeccionesProps = { colecciones: THomeSection[], className?: string }

const Colecciones = ({ colecciones, className }: ColeccionesProps) => {
  return (
    <section className={cn("bg-zinc-100 flex flex-col items-center py-1 gap-1", className)}>
      <h2 className="w-full text-gray-800 lux-title text-xl md:text-2xl drop-shadow-none text-center font-extralight ">
        Colecciones
      </h2>
      <ul className="no-scrollbar flex justify-start gap-4 px-8 max-w-full overflow-x-scroll overflow-y-hidden">
        {colecciones?.map((coleccion) => (
          <li
            key={coleccion.titulo}
            className="w-[120px]"
          >
            <Link href={`/listing?coleccion=${coleccion.titulo}`} className="group" >
              {coleccion.imagen && (
                <div className="relative w-[120px] h-[120px] flex items-center justify-center overflow-hidden">
                  <Image height={120}
                    width={120} className="absolute z-10 w-full h-full" src="ArleCircle.svg" alt="circulo Arle"/>
                    <div className="w-[110px] h-[110px] overflow-hidden rounded-full absolute justify-center items-center flex z-0">
                  <Image
                    src={coleccion.imagen.url}
                    alt={coleccion.imagen.alt || ""}
                    height={110}
                    width={110}
                    className="object-cover group-hover:w-[130px] group-hover:h-[130px] transition-all duration-500 z-0 w-[110px] h-[110px] rounded-full "
                    />
                    </div>
                    
                </div>
              )}
            <p className="text-center mt-1.5 text-gray-600 text-md md:text-xl font-normal font-tajawal truncate leading-none group-hover:text-gray-500">
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