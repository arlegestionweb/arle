"use client";

import Button from "@/app/_components/Button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";

import FilterMenu from "./FilterMenu";
import { createUrl, makeNewParams } from "@/app/_lib/utils";
import BreadCrumbs, { TBreadCrumb } from "./BreadCrumbs";
import Dropdown, { TDropdownOption } from "@/app/_components/Dropdown";
import { useRouter } from 'next/navigation'



type TColor = {
  nombre: string;
  color: string;
};

export type TRelojFilters = {
  tiposDeReloj: string[];
  estilosDeReloj: string[];
  coloresDeLaCaja: TColor[];
  coloresDelPulso: TColor[];
  materialDelPulsoDeReloj: string[];
  cajas: {
    diametros: number[];
    materiales: string[];
    cristales: string[];
  };
  tiposDeMovimiento: string[];
};

export type TPerfumeFilters = {
  tamanos: number[];
  concentraciones: string[];
  sets: boolean[];
  familiasOlfativas: string[];
}
export type TGafaFilters = {
  tiposDeGafas: string[];
  estilosDeGafas: string[];
  coloresDeLasMonturas: TColor[];
  coloresDeLosLentes: TColor[];
  formasDeLasMonturas: string[];
  materialesDeLasMonturas: string[];
}

type FiltersProps = {
  areFiltersActive: boolean;
  marcas: string[];
  coleccionesDeMarca: string[];
  relojFilters: TRelojFilters;
  perfumeFilters: TPerfumeFilters;
  gafaFilters: TGafaFilters;
}


const Filters = ({
  areFiltersActive,
  marcas,
  coleccionesDeMarca,
  relojFilters,
  perfumeFilters,
  gafaFilters
}: FiltersProps
) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const searchParams = useSearchParams();
  const allParams: { [key: string]: any } = {};

  const { push } = useRouter()

  searchParams.forEach((value, param) => {
    if (!allParams[param]) {
      allParams[param] = [];
    }
    allParams[param].push(value);
  });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleSorting = () => {
    setIsSortingOpen(!isSortingOpen)
  }


  const breadCrumbs: TBreadCrumb[] = []

  const paramOrder = ['type', 'linea', 'genero', 'marcas']; // the order in which the params should be displayed in the breadcrumbs

  Object.keys(allParams).forEach((key) => {
    allParams[key].forEach((value: string, index: number) => {
      if (value === "todos") return;
      let href = '?';
      paramOrder.forEach((paramKey) => {
        if (paramOrder.indexOf(paramKey) > paramOrder.indexOf(key)) return;
        allParams[paramKey]?.forEach((paramValue: string) => {
          href += `${encodeURIComponent(paramKey)}=${encodeURIComponent(paramValue)}&`;
        });
      });
      if (key === "sort" || key === "maxPrice" || key === "minPrice" || value === "todas" || key === "currentPage" || key === "prodsPerPage") return
      breadCrumbs.push({
        param: key,
        label: `${value === "reloj" ? "relojes" : value === "premium" ? "élite" : value === "lujo" ? "excelencia" : value === "gafa" ? "gafas" : value === "perfume" ? "perfumes" : key === "marcas" ? value : value}`,
        href: href.slice(0, -1), // remove the trailing '&'
      });
    });
  });
  const sortingOptions: TSortingOption[] = [
    { label: "Aleatorio", value: "aleatorio" , href: createUrl("/listing", makeNewParams("sort", "aleatorio", searchParams)) },
    { label: "Recientes", value: "recientes", href: createUrl("/listing", makeNewParams("sort", "recientes", searchParams)) },
    { label: "Mayor precio", value: "precio_mayor_menor", href: createUrl("/listing", makeNewParams("sort", "precio_mayor_menor", searchParams)) },
    { label: "Menor precio", value: "price_menor_mayor", href: createUrl("/listing", makeNewParams("sort", "price_menor_mayor", searchParams)) },
  ];


  const prodsPerPageOptions = [
    12,
    24,
    36
  ]

  const handleProdsPerPageChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    push(
      createUrl("/listing", makeNewParams("prodsPerPage", event.currentTarget.value, searchParams))
    );
  };


  return (
    <>
      <section className="flex flex-col md:flex-row gap-1 pb-2.5 md:gap-3 w-full md:pb-4">
        <section className="flex items-center gap-3 ">
          <Button
            className="flex items-center gap-1"
            active={areFiltersActive}
            onClick={toggleFilter}
            type="button"
            labelType={"lightSmall"}
          >
            <FiFilter className="h-3 w-3" width={14} height={14} />
            Filtros
          </Button>
          <Button className="flex items-center gap-1 relative text-ellipsis whitespace-nowrap" labelType={"lightSmall"} type="button" onClick={toggleSorting} >
            <LuSettings2 className="h-3 w-3" width={14} height={14} />
            Ordenar por: {sortingOptions.find(option => option.value === searchParams.get("sort"))?.label || "Aleatorio"}
            <Dropdown options={sortingOptions} isOpen={isSortingOpen} onClose={() => setIsSortingOpen(false)} />
          </Button>
        </section>
        <BreadCrumbs breadCrumbs={breadCrumbs} />
        {/* <label htmlFor="">
          Productos por página:
        </label>
        <select onChange={(e) => handleProdsPerPageChanged(e)}>
          {prodsPerPageOptions.map((option, index) => (
            <option key={`option-${index}`}>
              {option}
            </option>
          ))}
        </select> */}
      </section>
      <FilterMenu
        areFiltersActive={areFiltersActive}
        isFilterOpen={isFilterOpen}
        toggleFilter={toggleFilter}
        searchParams={allParams}
        marcas={marcas}
        coleccionesDeMarca={coleccionesDeMarca}
        relojFilters={relojFilters}
        perfumeFilters={perfumeFilters}
        gafaFilters={gafaFilters}
      />
    </>
  );
};

export default Filters;


export type TSortingOption = TDropdownOption & {
  value: "recientes" | "precio_mayor_menor" | "price_menor_mayor" | "aleatorio";
}
