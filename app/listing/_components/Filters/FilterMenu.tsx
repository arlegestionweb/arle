import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "@/app/_components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/app/_lib/utils";
import { useRef } from "react";
import AllProductFilters from "./AllProductFilters";
import RelojFilters from "./RelojFilters";
import type { TGafaFilters, TPerfumeFilters, TRelojFilters } from ".";
import PerfumeFilters from "./PerfumeFilters";
import GafaFilters from "./GafaFilters.tsx";

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
  // console.log({ searchParams });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("running");
    const val = e.target as HTMLFormElement;

    const newParams = new URLSearchParams(searchParams.toString());

    const checkboxValues: string[] = [];
    val.querySelectorAll("input").forEach((input) => {
      if (input.type === "checkbox" && input.checked) {
        // console.log(input.name, input.value);
        if (newParams.has(input.name)) {
          checkboxValues.push(input.value);
          newParams.set(input.name, checkboxValues.join("& "));
        } else {
          newParams.set(input.name, input.value);
        }
      }
      if (input.type === "radio" && input.checked) {
        // console.log(input.dataset)
        newParams.set(input.name, input.value);
      }

      if (
        (input.name === "minPrice" || input.name === "maxPrice") &&
        input.value !== ""
      ) {
        newParams.set(input.name, input.value);
      }
    });

    // newParams.forEach((value, key) => console.log(key, value));
    push(createUrl("/listing", newParams));
    toggleFilter();
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div
      className={`${
        isFilterOpen ? "w-screen" : "w-0"
      } fixed z-50 top-[60px] left-0 transition-all h-screen bg-black bg-opacity-50 flex`}
    >
      <aside
        className={`${
          isFilterOpen ? "" : "hidden"
        } w-[80vw] max-w-[400px] max-h-[calc(100vh-60px)] bg-white flex-col relative overflow-y-scroll`}
      >
        <form onSubmit={onFormSubmit} ref={formRef}>
          <header className="flex justify-end p-4">
            <AiOutlineCloseCircle
              onClick={toggleFilter}
              className="cursor-pointer text-3xl"
            />
          </header>
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

          <footer className="flex justify-evenly py-5">
            <Button type="submit">Aplicar Filtros</Button>
            {areFiltersActive && (
              <Link href="/listing" onClick={toggleFilter}>
                <Button>Quitar Filtros</Button>
              </Link>
            )}
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
