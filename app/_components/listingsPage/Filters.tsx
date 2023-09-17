"use client";

import Button from "../Button";
import { LuSettings2 } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Filters = ({ areFiltersActive }: { areFiltersActive: boolean }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  return (
    <>
      <section className="flex gap-3 mb-5">
        <div onClick={toggleFilter}>
          <Button className="flex items-center gap-2" active={areFiltersActive}>
            <FiFilter />
            Filtros
          </Button>
        </div>
        <Button className="flex items-center gap-2">
          <LuSettings2 /> Sort by: {"Recents"}
        </Button>
      </section>
      <div
        className={`${
          isFilterOpen ? "w-screen" : "w-0"
        } fixed z-5 top-0 left-0 transition-all h-screen bg-black bg-opacity-50 flex`}
      >
        <div
          className={`${
            isFilterOpen ? "" : "hidden"
          } w-[90vw] h-screen bg-white grid place-content-center relative`}
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
              <Button>Quitar Filtros</Button>
            </Link>
          )}
        </div>
        <div className="w-[10vw] h-screen" onClick={toggleFilter} />
      </div>
    </>
  );
};

export default Filters;
