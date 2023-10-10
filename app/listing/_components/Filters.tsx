"use client";

import Button from "../../_components/Button";
import { LuSettings2 } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Drawer from "../../_components/Drawer";
// import Drawer from "../Drawer";
import { useSearchParams } from "next/navigation";

const Filters = ({
  areFiltersActive,
}: // searchParams = {},
{
  areFiltersActive: boolean;
  // searchParams: {
  //   [key: string]: string | string[] | undefined;
  // };
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const allParams: { [key: string]: any } = {};
  
  searchParams.forEach((value, param) => {
    if (!allParams[param]) {
      allParams[param] = [];
    }
    allParams[param].push(value);
  });
  
  console.log("All Params:", allParams);

  // console.log("here", searchParams.values())
  const search = searchParams.get("search");
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filters = Object.keys(searchParams).map(key => {
    return key;
  });

  return (
    <>
      <section className="flex flex-col mb-5">
        <div className="flex gap-3">
          <div onClick={toggleFilter}>
            <Button
              className="flex items-center gap-2"
              active={areFiltersActive}>
              <FiFilter />
              Filtros
            </Button>
          </div>
          <Button className="flex items-center gap-2">
            <LuSettings2 /> Sort by: {"Recents"}
          </Button>
        </div>
        {/* <BreadCrumbs
          filters={filters}
          searchParams={searchParams}
        /> */}
      </section>
      <Drawer
        isOpen={isFilterOpen}
        onClose={toggleFilter}>
        <div
          className={`w-80 h-screen bg-color-bg-surface-1-default grid place-content-center relative`}>
          <AiOutlineCloseCircle
            onClick={toggleFilter}
            className="cursor-pointer text-3xl absolute top-10 right-10"
          />
          {areFiltersActive && (
            <Link
              href="/listing"
              onClick={toggleFilter}
              className="text-3xl font-bold">
              <Button>Quitar Filtros</Button>
            </Link>
          )}
        </div>

        <div
          className="w-[10vw] h-screen"
          onClick={toggleFilter}
        />
      </Drawer>
    </>
  );
};

export default Filters;
type FilterMenuProps = {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  areFiltersActive: boolean;
};
const FilterMenu = ({isFilterOpen, toggleFilter, areFiltersActive}: FilterMenuProps) => {
  return (
    <div
      className={`${
        isFilterOpen ? "w-screen" : "w-0"
      } fixed z-10 top-[60px] left-0 transition-all h-screen bg-black bg-opacity-50 flex`}
    >
      <div
        className={`${
          isFilterOpen ? "" : "hidden"
        } w-[80vw] max-w-[400px] h-screen bg-white grid place-content-center relative`}
      >
        <AiOutlineCloseCircle
          onClick={toggleFilter}
          className="cursor-pointer text-3xl absolute top-10 right-10"
        />
        {areFiltersActive && (
          <Link
            href="/listing"
            onClick={toggleFilter}
            className="text-3xl font-bold"
          >
            <Button type="submit">Quitar Filtros</Button>
          </Link>
        )}
      </div>
      <div className="w-[10vw] h-screen" onClick={toggleFilter} />
    </div>
  );
};
const BreadCrumbs = ({
  filters,
  searchParams,
}: {
  filters: string[];
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  return (
    <ul className="flex mt-2">
      {filters?.map((filter, index) => (
        <li
          key={filter}
          className={`${
            index >= 1 ? "ml-2" : ""
          } flex items-center gap-2 text-sm`}>
          {!searchParams[filter] ? <></> : `${filter}:`}
          <Link href={`?${filter}=${searchParams[filter]}`}>
            {searchParams[filter]}
          </Link>
        </li>
      ))}
    </ul>
  );
};
