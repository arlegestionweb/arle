import Image from "next/image";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { THomeSection } from "@/sanity/queries/pages/homepageQuery";

type ColeccionesProps = { colecciones: THomeSection[], className?: string }

const Colecciones = ({ colecciones, className }: ColeccionesProps) => {
  return (
    <section className={cn("bg-zinc-100 flex flex-col items-center py-1 gap-1", className)}>
      <h2 className="w-full text-gray-800 lux-title text-3xl drop-shadow-none text-center font-extralight ">
        Colecciones
      </h2>
      <ul className="no-scrollbar flex justify-start gap-4 px-8 max-w-full overflow-x-scroll overflow-y-hidden">
        {colecciones?.map((coleccion) => (
          <li
            key={coleccion.titulo}
            className="w-[120px]"
          >
            <Link href={`/listing?coleccion=${coleccion.titulo}`} >
              {coleccion.imagen && (
                <div className="relative w-[120px] h-[120px] flex items-center justify-center">
                  <Image fill src="ArleCircle.svg" alt="circulo Arle"/>
                  <Image
                    src={coleccion.imagen.url}
                    alt={coleccion.imagen.alt || ""}
                    height={110}
                    width={110}
                    className="object-cover rounded-full "
                    />
                    
                </div>
              )}
            <p className="text-center mt-1.5 text-gray-600 text-xl font-normal font-tajawal truncate leading-none">
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