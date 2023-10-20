"use client";

import Button from "@/app/_components/Button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";
import BreadCrumbs from "./BreadCrumbs";
import FilterMenu from "./FilterMenu";
import { MarcaType } from "@/app/_components/types";

type FiltersProps = {
  areFiltersActive: boolean;
  // searchParams: {
  //   [key: string]: string | string[] | undefined;
  // };
  marcas: MarcaType[];
}
const Filters = ({
  areFiltersActive,
  marcas
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

  const filters = Object.keys(searchParams).map((key) => {
    return key;
  });

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
        <BreadCrumbs filters={filters} searchParams={allParams} />
      </section>
      <FilterMenu
        areFiltersActive={areFiltersActive}
        isFilterOpen={isFilterOpen}
        toggleFilter={toggleFilter}
        searchParams={allParams}
        marcas={marcas}
      />
    </>
  );
};

export default Filters;
