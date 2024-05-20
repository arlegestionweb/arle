"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Button from "../../Button";
import { useEffect, useState } from "react";
import { TBrand, getAllBrands } from "@/sanity/queries/menu";
import SimpleDropdown from "../../SimpleDropdown";
import { IoIosArrowDown} from "react-icons/io";

const subMenu = [
  {
    title: "Perfumes",
    param: "perfume"
  },
  {
    title: "Gafas",
    param: "gafa"
  },
  {
    title: "Relojes",
    param: "reloj"
  },
];

const SubMenuDesktop = ({marca}: {marca?: string | null}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedProducto = searchParams.get("type");
  const selectedMarca = searchParams.get("marcas");
  const [brandsFilter, setBrandsFilter] = useState(false);
  const toggleBrandsFilter = () => {setBrandsFilter(!brandsFilter)};
  const [brands, setBrands] = useState<TBrand>([])

  useEffect(() => {
    const getBrands = async () => {
      const brands = await getAllBrands();
      const sortedBrands = brands?.sort((a, b) => a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase()));
      console.log(sortedBrands);
      setBrands(sortedBrands);
    }

    getBrands();
  },[])

  if (pathname.includes("listing") || pathname === "/" ) 
  return (
    <section className="bg-gray-100 hidden md:flex mt-[53px] md:h-[36px] px-8 items-center justify-center">
      <section className="py-0 gap-2 -ml-5 w-full h-full flex items-center max-w-screen-xl">
        <Link
          href={`/listing`}
          className={`px-2 py-0.5 flex justify-center items-center 
          ${pathname.includes("listing") && !selectedMarca && !selectedProducto ? "border border-black pointer-events-none" : ""}`}>
            <p className="text-gray-700 font-inter text-sm font-medium hover:text-gray-500">Todos</p>
          </Link>
        {subMenu.map((item, index) => (
          <Link
          href={`/listing?type=${item.param}`}
          key={item.title + index}
          className={`px-3 py-0.5 flex justify-center items-center 
          ${selectedProducto?.includes(item.param) ? "border border-black pointer-events-none" : ""}`}>
            <p className="text-gray-700 font-inter text-sm font-medium hover:text-gray-500">{item.title}</p>
          </Link>
        ))}
        {marca && (
          <Link
          href={`/listing?marcas=${marca}`}
          className={`px-2 py-0.5 flex justify-center items-center 
          ${selectedMarca?.includes(marca) ? "border border-black pointer-events-none" : ""}`}>
            <p className="text-gray-700 font-inter text-sm font-medium hover:text-gray-500">{marca}</p>
          </Link>
        )}
        <Button className={`text-gray-700 font-inter text-sm flex items-center gap-0.5 border-none bg-transparent font-medium p-0  ${!brandsFilter && "hover:text-gray-500" }`} type="button" onClick={toggleBrandsFilter} >
              Marcas
              <IoIosArrowDown className="h-4 w-4" width={14} height={14} />
              <SimpleDropdown options={brands} isOpen={brandsFilter} onClose={() => setBrandsFilter(false)} />
        </Button>
      </section>
    </section>
  );
  return null
};

export default SubMenuDesktop;