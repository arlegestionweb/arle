import SearchInput from "../SearchInput";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { useRouter } from "next/navigation";
import Spinner from "../../Spinner";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { TBrand, getAllBrands } from "@/sanity/queries/menu";

type ModalContentProps = {
  marca?: string | null;
  setIsMenu: (arg0: boolean) => void;
  isMenuOpen: boolean;
  subtitle: string;
  items: { name: string }[];
  setSelectedItems: (arg0: any) => void;
  setCurrentScreen: Dispatch<SetStateAction<number>>;
  marcasFilter: boolean;
  setMarcasFilter: (arg0: boolean) => void;
  selectedItems: { name: string }[];
  currentScreen: number;
  bottomSection: boolean;
  search: boolean;
};

const ModalContent = ({
  marca,
  selectedItems,
  currentScreen,
  setIsMenu,
  isMenuOpen,
  marcasFilter, 
  setMarcasFilter,
  items,
  setSelectedItems,
  setCurrentScreen,
  subtitle,
  bottomSection,
  search,
}: ModalContentProps) => {
  const [productType, gender] = selectedItems.map((item) => item.name);
  const [brands, setBrands] = useState<TBrand>([]);
  const [allBrands, setAllBrands] = useState(false);

  useEffect(() => {
    if( marcasFilter ){
      const getBrands = async () => {
        const brands = await getAllBrands();
        const sortedBrands = brands?.sort((a, b) => a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase()));
        setBrands(sortedBrands);
      }
      getBrands();
    }
    else setAllBrands(false);
  },[marcasFilter])

  const { push } = useRouter();
  const linkToAll =
    currentScreen === 0
      ? "/listing"
      : currentScreen === 2
        ? `/listing?type=${productType}&genero=${gender}`
        : `/listing?type=${subtitle === "perfumes" ? "perfume" : subtitle?.toLowerCase()
        }`;
  return (
    <section
      className={`w-screen max-w-[400px] h-full flex-col flex relative no-scrollbar transition-all`}
    >
      <section className="py-[18px] px-6 flex w-full flex-col gap-[12px] small-scrollbar">
        {search && (
          <Suspense>
            <div className="md:hidden pb-4">
              <SearchInput className="w-full" onSearch={() => setIsMenu(false)} />
            </div>
          </Suspense>
        )}
        <h2 className="text-zinc-800 text-lg font-medium font-tajawal leading-snug capitalize cursor-default pb-4">
          {subtitle === "perfume" ? "perfumes" : subtitle}
        </h2>
        
        { !marcasFilter && items.length > 0 ? (
          <ul className="flex flex-col gap-[15px]">
            {items.map((item) => (
              <li 
                className="cursor-pointer items-center flex gap-2 group"
                key={item.name}
                onClick={() => {
                  if (currentScreen === 2) {
                    setIsMenu(false);
                    push(
                      `/listing?type=${productType}&genero=${gender}&marcas=${item.name}`,
                      { scroll: false }
                    );
                  } else {
                    setSelectedItems((prev: { name: string }[]) => [
                      ...prev,
                      item,
                    ]);
                  }
                }}
              >
                {currentScreen === 2 && <GoArrowUpRight className="w-5 h-5" />}
                <h3 className="capitalize text-gray-800 text-base font-normal font-tajawal leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
                  {item.name === "perfume" ? "perfumes" : item.name}
                </h3>
              </li>
            ))}
            {currentScreen === 0 && (
              <li className="cursor-pointer items-center flex gap-2 group"
              onClick={() => {setMarcasFilter(true); setCurrentScreen(1);}}>
                  <h3 className="capitalize text-gray-800 text-base font-normal font-tajawal leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
                    marcas
                  </h3>
              </li>
            )}
            <li className="">
              <Link
                href={linkToAll}
                className="flex items-center gap-2 group"
                onClick={() => setIsMenu(false)}
              >
                <GoArrowUpRight className="w-5 h-5" />
                <h3 className="capitalize text-gray-800 text-base font-normal font-tajawal leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
                  ver todos
                </h3>
              </Link>
            </li>
          </ul>
        ) : ( !marcasFilter &&
          <Spinner />
        )}
        {marcasFilter && brands && brands?.length > 0 ? (
          <ul className="flex flex-col gap-[15px]">
            {!allBrands ? brands.filter(option => option.sugerida === true).map((option, index) => 
        (
          <li key={index + option.titulo } onClick={()=> {setIsMenu(false); setMarcasFilter(false)}} className="px-2 group w-fit min-w-full">
          <Link href={`/listing?marcas=${option.titulo}`} scroll={false} >
          <p className="whitespace-nowrap text-gray-800 text-base font-normal font-tajawal leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
          {option.titulo}
          </p>
          </Link>
          </li>
        )): brands.map((option, index) => (
              <li key={index + option.titulo } onClick={()=> {setIsMenu(false); setMarcasFilter(false)}} className="px-2 group w-fit min-w-full">
              <Link href={`/listing?marcas=${option.titulo}`} scroll={false} >
              <p className="whitespace-nowrap text-gray-800 text-base font-normal font-tajawal leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
              {option.titulo}
              </p>
              </Link>
              </li>
            )
          )}
          {marcasFilter && !allBrands && (
            <li className="px-2 group w-fit min-w-full cursor-pointer" onClick={()=> setAllBrands(true)}>
            <p className="whitespace-nowrap text-gray-800 text-base font-normal font-tajawal leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
            Ver todas...
            </p>
            </li>
          )}
          </ul>
        ) : ( marcasFilter &&
          <Spinner />
        )}
      </section>
      {bottomSection && (
        <section className="pb-6 px-6 w-full basis-full flex flex-col gap-4">
          {marca && (
            <Link
              href={`/listing?marcas=${marca}`}
              className="w-full flex justify-center border-black border py-1 button-float"
              onClick={() => setIsMenu(false)}
            >
              <p className="text-black text-base font-medium font-inter leading-normal ">
                {marca}
              </p>
            </Link>
          )}

          <footer className="flex flex-col w-full basis-full justify-end gap-4">
            <Link
              href={"/sobre-nosotros"}
              className="flex items-center gap-2 group"
              onClick={() => setIsMenu(false)}
            >
              <GoArrowUpRight className="w-5 h-5" />
              <p className="text-zinc-800 text-base font-normal font-tajawal leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
                Acerca de ARLÉ
              </p>
            </Link>
            <Link
              href={"/estadodecompra"}
              className="flex items-center gap-2 group"
              onClick={() => setIsMenu(false)}
            >
              <GoArrowUpRight className="w-5 h-5" />
              <p className="text-zinc-800 text-base font-normal font-tajawal leading-tight underline-offset-2 group-hover:underline group-hover:text-gray-600">
                Estado de Compra
              </p>
            </Link>
          </footer>
        </section>
      )}
    </section>
  );
};

export default ModalContent;
