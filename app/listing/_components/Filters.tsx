"use client";

import Button from "../../_components/Button";
import { LuSettings2 } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Drawer from "../../_components/Drawer";

const Filters = ({
  areFiltersActive,
  searchParams = {},
}: {
  areFiltersActive: boolean;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
