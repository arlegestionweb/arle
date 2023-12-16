"use client"
import { useState } from "react";

const DetallesProducto = () => {
  const [activeSection, setActiveSection] = useState("notasOlfativas");

  const handleSectionChange = (section: any) => {
    setActiveSection(section);
  };

  return (
    <section className="w-full h-full">
      <nav className="pt-4 flex justify-center">
        <h4
          onClick={() => handleSectionChange("notasOlfativas")}
          className={`px-4 py-2 border-b-2 ${
            activeSection === "notasOlfativas" ? "border-white" : "border-zinc-700"
          }`}
        >
          Notas olfativas
        </h4>
        <h4
          onClick={() => handleSectionChange("ingredientes")}
          className={`px-4 py-2 border-b-2 ${
            activeSection === "ingredientes" ? "border-white" : "border-zinc-700"
          }`}
        >
          Ingredientes
        </h4>
        <h4
          onClick={() => handleSectionChange("infoAdicional")}
          className={`px-4 py-2 border-b-2 ${
            activeSection === "infoAdicional" ? "border-white" : "border-zinc-700"
          }`}
        >
          Info adicional
        </h4>
      </nav>

      <section style={{ display: activeSection === "notasOlfativas" ? "block" : "none" }}>
        Contenido de Notas olfativas
      </section>
      <section style={{ display: activeSection === "ingredientes" ? "block" : "none" }}>
        Contenido de Ingredientes
      </section>
      <section style={{ display: activeSection === "infoAdicional" ? "block" : "none" }}>
        Contenido de Info adicional
      </section>
    </section>
  );
};

export default DetallesProducto;
