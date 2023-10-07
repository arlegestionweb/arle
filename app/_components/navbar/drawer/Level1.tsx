import React from "react";
import SearchInput from "../SearchInput";
import Button from "../../Button";

const Level1 = () => {
  return (
    <section className="grow flex flex-col gap-3">
      <header className="p-4 h-16 flex items-center border-b border-stone-300">
        <h4 className="text-zinc-800 text-xl font-bold font-inter leading-normal">
          Menú
        </h4>
      </header>
      <section className="px-4 flex flex-col gap-3">
        <div className="w-full ">
          <SearchInput className="w-full" />
        </div>
        <section className="">
          <h5 className="text-zinc-800 text-lg font-medium font-inter leading-snug">Productos</h5>
          <ul>
            <li className="h-9 py-3 text-zinc-800 font-inter leading-tight">Perfumes</li>
            <li className="h-9 py-3 text-zinc-800 font-inter leading-tight">Relojes</li>
            <li className="h-9 py-3 text-zinc-800 font-inter leading-tight">Gafas</li>
          </ul>
        </section>
        <section className="py-3">
            {/* //TODO: link */}
          <p className="text-zinc-800 font-inter leading-tight">Acerca de ARLÉ</p>
        </section>
        {/* //TODO: Link */}
        <Button className="text-black font-medium">Pure White Cologne</Button>
      </section>
    </section>
  );
};

export default Level1;
