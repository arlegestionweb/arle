"use client";

import Link from "next/link";
import { useState } from "react";

const InputButton = () => {
    const [value, setValue] = useState("");
  const handleKeyDown = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  return (
    <section className="flex flex-col gap-4">
      <input
        className="w-full font-sans focus-visible:outline-arle-blue h-9 px-3 bg-white rounded border border-stone-300 max-w-xl"
        type="text"
        name="orden"
        placeholder="Código de Compra"
        onChange={handleKeyDown}
      />
      <Link
        href={`/orders/${value}`}
        className={`${
          value === ""
            ? "opacity-60 pointer-events-none"
            : "pointer-events-auto opacity-100"
        } dark-button button-float`}
      >
        Buscar
      </Link>
    </section>
  );
};

export default InputButton;
