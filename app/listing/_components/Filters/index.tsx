"use client";

import Button from "@/app/_components/Button";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";

import FilterMenu from "./FilterMenu";
import Link from "next/link";
import { createUrl, makeNewParams } from "@/app/_lib/utils";
import BreadCrumbs, { TBreadCrumb } from "./BreadCrumbs";


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

export type TSortingOption = {
  label: string;
  value: "recientes" | "precio_mayor_menor" | "price_menor_mayor"
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

  searchParams.forEach((value, param) => {
    if (!allParams[param]) {
      allParams[param] = [];
    }
    allParams[param].push(value);
  });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const breadCrumbs: TBreadCrumb[] = []

  const paramOrder = ['type', 'genero', 'marcas']; // the order in which the params should be displayed in the breadcrumbs

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
      breadCrumbs.push({
        param: key,
        label: `${value === "reloj" ? "relojes" : value === "premium" ? "excelencia" : value === "lujo" ? "elite" : value === "gafa" ? "gafas" : value === "perfume" ? "perfumes" : value}`,
        href: href.slice(0, -1), // remove the trailing '&'
      });
    });
  });
  console.log({ allParams, breadCrumbs })
  const sortingOptions: TSortingOption[] = [
    { label: "Recientes", value: "recientes" },
    { label: "Precio: Mayor a Menor", value: "precio_mayor_menor" },
    { label: "Precio: Menor to Mayor", value: "price_menor_mayor" },
  ];
  return (
    <>
      <section className="flex flex-col mb-5 max-w-full">
        <section className="flex gap-3 flex-wrap max-w-full">
          <section className="flex items-center gap-3 w-full ">

            <Button
              className="flex items-center gap-2"
              active={areFiltersActive}
              onClick={toggleFilter}
              type="button"
            >
              <FiFilter />
              Filtros
            </Button>
            <Button className="flex items-center gap-2 relative overflow-hidden text-ellipsis whitespace-nowrap max-w-full" type="button" onClick={() => setIsSortingOpen(!isSortingOpen)} >
              <LuSettings2 /> Ordenar por: {sortingOptions.find(option => option.value === searchParams.get("sort"))?.label || "Recients"}
              <Dropdown options={sortingOptions} isOpen={isSortingOpen} onClose={() => setIsSortingOpen(false)} />
            </Button>
          </section>
          <BreadCrumbs breadCrumbs={breadCrumbs} />
        </section>
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


const Dropdown = ({ options, isOpen, onClose }: {
  options: TSortingOption[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event.target instanceof Node && dropdownRef.current.contains(event.target)) {
        return;
      }
      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <ul ref={dropdownRef} className="absolute top-full translate-y-1 left-0 min-w-full w-fit text-left flex flex-col z-30 bg-white border border-black">
      {options.map((option) => {
        return (
          <li key={option.value} className="hover:bg-slate-100 px-2 w-fit min-w-full">
            <Link href={createUrl("/listing", makeNewParams("sort", option.value, searchParams))} scroll={false}>
              <p className="whitespace-nowrap">
                {option.label}
              </p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}