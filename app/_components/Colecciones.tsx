import { TColecciones } from "@/sanity/queries/pages/listingQueries";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../_lib/utils";

type ColeccionesProps = { colecciones: TColecciones, className?: string }

const Colecciones = ({ colecciones, className }: ColeccionesProps) => {
  return (
    <section className={cn("bg-[#f5f5f5] pl-8 lg:px-8 lg:flex lg:flex-col lg:items-center", className)}>
      <h2 className="lg:max-w-[1280px] lg:px-9 w-full text-zinc-800 text-[28px] font-semibold font-lora leading-loose">
        Colecciones
      </h2>
      <ul className="no-scrollbar pb-10 flex justify-start md:gap-4 max-w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
        {colecciones.map((coleccion) => (
          <li
            key={coleccion.titulo}
            className="w-[159px] h-[197px] mr-4 md:m-0 md:w-72 md:h-[326px] snap-always snap-center"
          >
            <Link href={`?coleccion=${coleccion.titulo}`}>
              {coleccion.imagen && (
                <div className="relative w-[159px] h-[159px] md:w-72 md:h-72">
                  <Image
                    src={coleccion.imagen.url}
                    alt={coleccion.imagen.alt || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </Link>
            <p className="pt-4 text-neutral-600 text-xl font-bold font-raleway leading-snug">
              {coleccion.titulo.toUpperCase()}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Colecciones;
