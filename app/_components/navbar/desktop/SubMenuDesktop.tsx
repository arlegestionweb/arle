"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
];

const SubMenuDesktop = ({marca}: {marca?: string | null}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedProducto = searchParams.get("type");
  const selectedMarca = searchParams.get("marcas");


  if (pathname.includes("listing") || pathname === "/") 
  return (
    <section className="bg-color-bg-surface-0-default flex mt-[60px] h-[42px] px-8 items-center justify-center">
      <section className="py-2 gap-2 -ml-5 w-full h-full flex items-center max-w-screen-xl">
      {subMenu.map(item => (
        <Link
        href={`/listing?type=${item.param}`}
        key={item.title}
        className={`px-3 py-0.5 flex justify-center items-center 
        ${selectedProducto?.includes(item.param) ? "border border-black" : ""}`}>
          <p className="text-black font-medium">{item.title}</p>
        </Link>
      ))}
      {marca && (
        <Link
        href={`/listing?marcas=${marca}`}
        className={`px-3 py-0.5 flex justify-center items-center 
        ${selectedMarca?.includes(marca) ? "border border-black" : ""}`}>
          <p className="text-black font-medium">{marca}</p>
        </Link>
      )}
      </section>
    </section>
  );
  return null
};

export default SubMenuDesktop;