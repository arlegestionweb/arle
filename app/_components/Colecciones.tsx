import { TColecciones } from "@/sanity/queries/pages/listingQueries";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../_lib/utils";

type ColeccionesProps = { colecciones: TColecciones, className?: string }

const Colecciones = ({ colecciones, className }: ColeccionesProps) => {
  return (
    <section className={cn("bg-color-bg-surface-0-default pt-2 pl-8 lg:px-8 flex flex-col items-center", className)}>
      <h2 className="lg:max-w-mx lg:px-9 w-full text-zinc-800 text-[28px] font-semibold font-lora leading-loose text-center">
        Colecciones
      </h2>
      <ul className="max-w-full no-scrollbar pb-2 flex gap-6 max-w-screen overflow-x-auto">
        {colecciones.map((coleccion, i) => (
            <Link key={i} href={`?coleccion=${coleccion.titulo}`}>
              {coleccion.imagen && (
                <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center">
                  <Image fill src="ArleCircle.svg" alt="circulo Arle"/>
                  <Image
                    src={coleccion.imagen.url}
                    alt={coleccion.imagen.alt || ""}
                    height={137}
                    width={137}
                    className="md:h-[182px] md:w-[182px] object-cover rounded-full "
                    />
                    
                </div>
              )}
            <p className="w-full text-center pt-2 text-neutral-600 text-xl font-bold font-raleway leading-snug truncate">
              {coleccion.titulo.toUpperCase()}
            </p>
            </Link>
        ))}
      </ul>
    </section>
  );
};

export default Colecciones;