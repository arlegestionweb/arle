"use client"
import Link from "next/link";
import Main from "./_components/Main";
import SuccessIcon from "./_components/SuccessIcon";

export default function NotFound (){
  return (
    <Main extraClasses="bg-white md:mt-[53px] w-full min-h-screen flex flex-col items-center justify-center px-10 pb-10">

      <SuccessIcon failiure/>
      <h1 className="pt-3 font-tajawal font-bold text-4xl leading-none text-gray-800 text-center">Error 404: Página no encontrada</h1>

      <section className="flex flex-col gap-1 max-w-screen-xs text-sm md:text-base">

      <h2 className="font-tajawal font-medium text-xl md:text-2xl text-gray-800">Lo sentimos.</h2>
      <h2>Parece que hubo un error encontrando el url de la página que buscas.</h2>
      <p>Por favor inténtalo de nuevo.</p>
      
      <Link href="/listing" className="mt-4 dark-button button-float">Explorar Productos</Link>

      </section>


    </Main>
  );
}