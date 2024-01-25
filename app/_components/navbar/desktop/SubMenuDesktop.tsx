"use client";
import { createUrl, makeNewParams } from "@/app/_lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const subMenu = [
  {
    title: "Perfumes",
    param: "perfume"
  },
  {
    title: "Relojes",
    param: "reloj"
  },
  {
    title: "Gafas",
    param: "gafa"
  },
  {
    title: "Destacados",
    param: "destacado"
  },
];

const SubMenuDesktop = () => {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const selectedProducto = searchParams.get("type");
  
  return (
    <section className="bg-color-bg-surface-0-default flex mt-[60px] h-[42px] px-8 items-center justify-center">
      <section className="py-2 gap-2 -ml-5 w-full h-full flex items-center max-w-screen-xl">
      {subMenu.map(item => (
        <Link
        href={createUrl("/listing", makeNewParams("type", item.param, newParams))}
        key={item.title}
        className={`px-3 py-0.5 flex justify-center items-center 
        ${selectedProducto?.includes(item.param) ? "border border-black" : ""}`}>
          <p className="text-black font-medium">{item.title}</p>
        </Link>
      ))}
      </section>
    </section>
  );
};

export default SubMenuDesktop;