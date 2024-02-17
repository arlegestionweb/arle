"use client";

import { responsiveTextFont } from "@sanity/ui";
import { ComponentPropsWithoutRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

type CantidadProps = {
  cantidad?: number;
  anadirACantidad?: () => void;
  restarACantidad?: () => void;
  max?: number;
};

const Cantidad = ({
  cantidad: cantidadProp,
  anadirACantidad: anadirACantidadProp,
  restarACantidad: restarACantidadProp,
  max
}: CantidadProps) => {
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
    <div className="flex flex-wrap items-center gap-2">
      <p className="leading-none font-tajawal text-gray-600 cursor-default">Cantidad: </p>
      <div className="flex h-7 border rounded border-stone-300 w-fit overflow-hidden">
        <BotonDeCantidad onClick={restarACantidad} disabled={cantidad <= 1}>
          <FaMinus className="text-xs" />
        </BotonDeCantidad>
        <span className="px-5 pt-2 pb-1 place-content-center  text-neutral-700 text-sm font-normal font-inter leading-none">
          {cantidad}
        </span>
        <BotonDeCantidad onClick={anadirACantidad} disabled={max ? cantidad >= max : false}>
          <FaPlus className="text-xs" />
        </BotonDeCantidad>
      </div>
    </div>
  );
};

export default Cantidad;

const BotonDeCantidad = ({
  children,
  onClick,
  ...rest
}: ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className="h-full px-2 bg-gray-200 flex justify-center items-center disabled:text-gray-400 "
    >
      {children}
    </button>
  );
};
