"use client";

import Button from "@/app/_components/Button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";

import FilterMenu from "./FilterMenu";
import { TCaja } from "@/sanity/queries/pages/zodSchemas/reloj";
// import { MarcaType } from "@/app/_components/types";


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

type FiltersProps = {
  areFiltersActive: boolean;
  // searchParams: {
  //   [key: string]: string | string[] | undefined;
  // };
  marcas: string[];
  coleccionesDeMarca: string[];
  relojFilters: TRelojFilters;
  perfumeFilters: TPerfumeFilters;
}
const Filters = ({
  areFiltersActive,
  marcas,
  coleccionesDeMarca,
  relojFilters,
  perfumeFilters
}: FiltersProps
) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const allParams: { [key: string]: any } = {};

  searchParams.forEach((value, param) => {
    if (!allParams[param]) {
      allParams[param] = [];
    }
    allParams[param].push(value);
  });

  // console.log("All Params:", allParams);

  // console.log("here", searchParams.values())
  // const search = searchParams.get("search");
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // const filters = Object.keys(searchParams).map((key) => {
  //   return key;
  // });

  
  return (
    <>
      <section className="flex flex-col mb-5">
        <div className="flex gap-3">
          <div onClick={toggleFilter}>
            <Button
              className="flex items-center gap-2"
              active={areFiltersActive}
            >
              <FiFilter />
              Filtros
            </Button>
          </div>
          <Button className="flex items-center gap-2">
            <LuSettings2 /> Sort by: {"Recents"}
          </Button>
        </div>
        {/* <BreadCrumbs filters={filters} searchParams={allParams} /> */}
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
      />
    </>
  );
};

export default Filters;