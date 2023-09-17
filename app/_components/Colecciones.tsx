
import Image from "next/image";
import { ColeccionType } from "./types";
import Link from "next/link";

const Colecciones = ({ colecciones }: { colecciones: ColeccionType[] }) => {

  return (
    <section className="grid bg-neutral-100 px-5">
      <h2 className="self-stretch text-zinc-800 text-[28px] font-semibold font-['Lora'] leading-loose">
        Colecciones
      </h2>
      <ul className="flex gap-4 max-w-screen overflow-x-scroll overflow-y-hidden">
        {colecciones.map((coleccion) => (
          <li key={coleccion.titulo} className="grid w-[159px] h-[197px]">
            <Link href={`?coleccion=${coleccion.titulo}`}>
              <Image
                src={coleccion.imagen.url}
                alt={coleccion.imagen.alt}
                width={159}
                height={177}
                className="object-cover min-w-[159px]"
              />
            </Link>
            {coleccion.titulo}
          </li>
        ))}
      </ul>

     
    </section>
  );
};

export default Colecciones;
