import Link from "next/link";
import Button from "@/app/_components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/app/_lib/utils";
import { useRef } from "react";
import AllProductFilters from "./AllProductFilters";
import RelojFilters from "./RelojFilters";
import type { TGafaFilters, TPerfumeFilters, TRelojFilters } from ".";
import PerfumeFilters from "./PerfumeFilters";
import GafaFilters from "./GafaFilters.tsx";
import { useClickOutside } from "@/app/_lib/hooks";
import { IoCloseSharp } from "react-icons/io5";

type TypeSearchParams = {
  [key: string]: string | string[] | undefined;
};
type FilterMenuProps = {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  areFiltersActive: boolean;
  searchParams: TypeSearchParams;
  marcas: string[];
  coleccionesDeMarca: string[];
  relojFilters: TRelojFilters;
  perfumeFilters: TPerfumeFilters;
  gafaFilters: TGafaFilters;
};
const FilterMenu = ({
  isFilterOpen,
  toggleFilter,
  areFiltersActive,
  marcas,
  coleccionesDeMarca,
  relojFilters,
  perfumeFilters,
  gafaFilters,
}: // searchParams,
  FilterMenuProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const { push } = useRouter();
  const searchParams = useSearchParams();
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = e.target as HTMLFormElement;

    const newParams = new URLSearchParams(searchParams.toString());

    const checkboxValues: string[] = [];
    val.querySelectorAll("input").forEach((input) => {
      if (input.type === "checkbox" && input.checked) {
        if (newParams.has(input.name)) {
          checkboxValues.push(input.value);
          newParams.set(input.name, checkboxValues.join("& "));
        } else {
          newParams.set(input.name, input.value);
        }
      }
      if (input.type === "radio" && input.checked) {
        newParams.set(input.name, input.value);
      }

      if (
        (input.name === "minPrice" || input.name === "maxPrice") &&
        input.value !== ""
      ) {
        newParams.set(input.name, input.value);
      }
    });

    push(createUrl("/listing", newParams));
    toggleFilter();
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  useClickOutside(formRef, () => {
    if (!isFilterOpen) return;
    toggleFilter();
  });

  return (
    <div
      className={`${isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    } fixed z-[78] top-0 left-0 transition-all duration-500 w-screen h-full bg-black bg-opacity-50 backdrop-blur-md`}
    >
      <aside
        className={`${isFilterOpen ? "left-0" : "-left-[400px]"
      } w-screen fixed top-0 z-[80] mt-[50px] md:mt-[53px] bottom-0 max-h-[calc(100%-53px)] max-w-[400px] flex flex-col bg-white transition-all duration-300 ease-out overflow-hidden`}
      >
          <header className="flex justify-between items-center px-6 min-h-[60px] border-b border-gray-300">
          <h1 className=" capitalize text-arle-blue text-base font-semibold font-inter cursor-default">
              Filtros
            </h1>
          <IoCloseSharp
            className="cursor-pointer w-5 h-5"
            onClick={toggleFilter}
          />
          </header>
        <form className="w-full h-[calc(100%-60px)] flex flex-col justify-between" onSubmit={onFormSubmit} ref={formRef}>
          <section className="w-full basis-full flex flex-col justify-start overflow-y-scroll no-scrollbar">

          {!searchParams.get("type") && (
            <AllProductFilters
            marcas={marcas}
            coleccionesDeMarca={coleccionesDeMarca}
            />
            )}

          {searchParams.get("type")?.includes("reloj") && (
            <RelojFilters
            marcas={marcas}
            coleccionesDeMarca={coleccionesDeMarca}
            relojFilters={relojFilters}
            />
            )}
          {searchParams.get("type")?.includes("gafa") && (
            <GafaFilters
            coleccionesDeMarca={coleccionesDeMarca}
            marcas={marcas}
            gafaFilters={gafaFilters}
            />
            )}
          {searchParams.get("type")?.includes("perfume") && (
            <PerfumeFilters
            marcas={marcas}
            coleccionesDeMarca={coleccionesDeMarca}
            perfumeFilters={perfumeFilters}
            />
            )}
          </section>

          <footer className=" w-screen max-w-[400px] border-t border-gray-300 flex justify-end gap-4 px-6 py-4">
            {areFiltersActive && (
              <Link href="/listing" onClick={toggleFilter}>
                <Button labelType={"gray"}>Reestablecer</Button>
              </Link>
            )}
            <Button type="submit" labelType={"dark"} >Aplicar</Button>
          </footer>
        </form>
      </aside>
      <div
        className="w-[10vw] h-screen"
        onClick={() => {
          toggleFilter();
          resetForm();
        }}
      />
    </div>
  );
};

export default FilterMenu;
