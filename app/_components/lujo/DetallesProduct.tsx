"use client";
import { cn } from "@/app/_lib/utils";
import { useState } from "react";

type DetallesProductoProps = {
  notasOlfativas?: {
    notasDeBase: string[];
    notasDeSalida: string[];
    familiaOlfativa: string;
    notasDeCorazon: string[];
  };
  ingredientes?: string[];
  infoAdicional?: string;
};

const DetallesProducto = ({
  notasOlfativas,
  infoAdicional,
  ingredientes,
}: DetallesProductoProps) => {
  const [activeSection, setActiveSection] = useState("notasOlfativas");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <section className="w-full h-full">
      <nav className="no-scrollbar pt-4 flex md:justify-center justify-start overflow-x-auto overflow-y-hidden snap-x snap-mandatory w-full p-2">
        {notasOlfativas && (
          <h4
            onClick={() => handleSectionChange("notasOlfativas")}
            className={cn(
              `px-4 py-2 border-b-2  whitespace-nowrap border-zinc-700`,
              activeSection === "notasOlfativas" && "border-white"
            )}>
            Notas olfativas
          </h4>
        )}
        {ingredientes && (
          <h4
            onClick={() => handleSectionChange("ingredientes")}
            className={`px-4 py-2 border-b-2   whitespace-nowrap ${
              activeSection === "ingredientes"
                ? "border-white"
                : "border-zinc-700"
            }`}>
            Ingredientes
          </h4>
        )}
        {infoAdicional && (
          <h4
            onClick={() => handleSectionChange("infoAdicional")}
            className={`px-4 py-2 border-b-2  whitespace-nowrap ${
              activeSection === "infoAdicional"
                ? "border-white"
                : "border-zinc-700"
            }`}>
            Info adicional
          </h4>
        )}
      </nav>

      <section className="mt-4">
        {activeSection === "notasOlfativas" ? (
          <>
            {notasOlfativas && (
              <section>
                <div className="pb-5">
                  <h4 className="w-72 text-neutral-200 text-lg font-bold font-tajawal leading-snug">
                    Notas De Base
                  </h4>
                  <p className="w-72 text-zinc-100 text-lg font-normal font-tajawal leading-snug">
                    {notasOlfativas.notasDeBase.join(" ")}
                  </p>
                </div>
                <div className="pb-5">
                  <h4 className="w-72 text-neutral-200 text-lg font-bold font-tajawal leading-snug">
                    Notas De Salida
                  </h4>
                  <p className="w-72 text-zinc-100 text-lg font-normal font-tajawal leading-snug">
                    {notasOlfativas.notasDeBase.join(" ")}
                  </p>
                </div>
                <div className="pb-5">
                  <h4 className="w-72 text-neutral-200 text-lg font-bold font-tajawal leading-snug">
                    Familia Olfativa
                  </h4>
                  <p className="w-72 text-zinc-100 text-lg font-normal font-tajawal leading-snug">
                    {notasOlfativas.notasDeBase.join(" ")}
                  </p>
                </div>
                <div className="pb-5">
                  <h4 className="w-72 text-neutral-200 text-lg font-bold font-tajawal leading-snug">
                    Notas De Corazon
                  </h4>
                  <p className="w-72 text-zinc-100 text-lg font-normal font-tajawal leading-snug">
                    {notasOlfativas.notasDeBase.join(" ")}
                  </p>
                </div>
              </section>
            )}
          </>
        ) : activeSection === "ingredientes" ? (
          <>
            {ingredientes &&
              ingredientes.map(ingrediente => (
                <p
                  className="w-72 text-zinc-100 text-lg font-normal font-tajawal leading-snug"
                  key={ingrediente}>
                  {ingrediente}
                </p>
              ))}
          </>
        ) : (
          <>
            {infoAdicional && (
              <p className="w-72 text-zinc-100 text-lg font-normal font-tajawal leading-snug">
                {infoAdicional}
              </p>
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default DetallesProducto;
