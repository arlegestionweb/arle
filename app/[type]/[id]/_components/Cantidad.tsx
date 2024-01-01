"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "./Icons";

const Cantidad = () => {
  const [cantidad, setCantidad] = useState(1);

  const anadirACantidad = () => {
    setCantidad((cantidad) => cantidad + 1);
  };

  const restarACantidad = () => {
    if (cantidad === 1) return;
    setCantidad((cantidad) => cantidad - 1);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">Cantidad</h3>
      <div className="flex items-center border rounded border-stone-300 w-fit overflow-hidden">
        <BotonDeCantidad onClick={restarACantidad}>
          <MinusIcon />
        </BotonDeCantidad>
        <span className="w-[6ch] grid place-content-center h-11 py-[5px] border border-stone-300 text-center text-neutral-700 text-lg font-normal font-inter leading-[27px]">
          {cantidad}
        </span>
        <BotonDeCantidad onClick={anadirACantidad}>
          <PlusIcon />
        </BotonDeCantidad>
      </div>
    </div>
  );
};

export default Cantidad;

const BotonDeCantidad = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-[46px] h-11 px-4 bg-zinc-200 flex justify-center items-center "
    >
      {children}
    </button>
  );
};
