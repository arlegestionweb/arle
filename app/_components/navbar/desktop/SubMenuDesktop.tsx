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
    <section className="flex mt-[60px] h-[52px] px-8 py-2 gap-3 bg-background items-center">
      {subMenu.map(item => (
        <Link
          href={createUrl("/listing", makeNewParams("type", item.param, newParams))}
          key={item.title}
          className={`px-3 py-1.5 flex justify-center items-center 
                    ${selectedProducto?.includes(item.param) ? "border border-black" : ""}`}>
          <p className="text-black font-medium">{item.title}</p>
        </Link>
      ))}
    </section>
  );
};

export default SubMenuDesktop;