import Image from "next/image";
import { ColeccionType } from "./types";
import Link from "next/link";

const Colecciones = ({ colecciones }: { colecciones: ColeccionType[] }) => {

  return (
    <section className=" bg-neutral-100 pl-8 lg:px-8">
      <h2 className="self-stretch text-zinc-800 text-[28px] font-semibold font-lora leading-loose">
        Colecciones
      </h2>
      <ul className=" flex justify-between gap-4 max-w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
        {colecciones.map(coleccion => (
          <li
            key={coleccion.titulo}
            className="w-[159px] h-[197px] md:w-72 md:h-[326px] snap-always snap-center">
            <Link href={`?coleccion=${coleccion.titulo}`}>
              <div className="relative w-[159px] h-[159px] md:w-72 md:h-72">
                <Image
                  src={coleccion.imagen.url}
                  alt={coleccion.imagen.alt}
                  fill
                  objectFit="cover"
                />
              </div>
            </Link>
            <p className="pt-4 text-neutral-600 text-lg font-semibold font-raleway leading-snug">
              {coleccion.titulo}
            </p>
          </li>
        ))}
      </ul>

     
    </section>
  );
};

export default Colecciones;
