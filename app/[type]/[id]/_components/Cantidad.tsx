"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "./Icons";

type CantidadProps = {
  cantidad?: number;
  anadirACantidad?: () => void;
  restarACantidad?: () => void;
};

const Cantidad = ({ cantidad: cantidadProp, anadirACantidad: anadirACantidadProp, restarACantidad: restarACantidadProp }: CantidadProps) => {
  const [cantidadState, setCantidadState] = useState(1);

  const anadirACantidadState = () => {
    setCantidadState((cantidad) => cantidad + 1);
  };

  const restarACantidadState = () => {
    if (cantidadState === 1) return;
    setCantidadState((cantidad) => cantidad - 1);
  };

  const cantidad = cantidadProp ?? cantidadState;
  const anadirACantidad = anadirACantidadProp ?? anadirACantidadState;
  const restarACantidad = restarACantidadProp ?? restarACantidadState;
  
  return (
    <div className="flex flex-col">
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
