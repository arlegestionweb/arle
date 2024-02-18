"use client";
import { useState } from "react";
import Main from "../_components/Main";
import Link from "next/link";
import { GoChevronLeft } from "react-icons/go";

const Page = () => {
  const [value, setValue] = useState("");
  const handleKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  return (
    <Main extraClasses="bg-white md:mt-[53px] w-full min-h-screen flex flex-col items-center justify-center px-10 pb-10">
      <section className="w-full flex flex-col max-w-screen-xs gap-4">
        <button
          className="flex items-center -ml-1 group"
          onClick={() => window.history.back()}
        >
          <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
          <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
            Volver
          </span>
        </button>
        <h2 className="font-tajawal font-gray-800 font-bold text-2xl">
          Ingresa tu Código de Compra:
        </h2>
        <input
          className="w-full font-sans focus-visible:outline-arle-blue h-9 px-3 bg-white rounded border border-stone-300 max-w-xl"
          type="text"
          name="orden"
          placeholder="Código de Compra"
          onChange={handleKeyDown}
        />
        <Link href={`/orders/${value}`} className={`${value === "" ? "opacity-60 pointer-events-none" : "pointer-events-auto opacity-100"} dark-button button-float`}>
          Buscar
        </Link>
      </section>
    </Main>
  );
};

export default Page;
