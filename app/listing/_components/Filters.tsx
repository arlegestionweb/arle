"use client";

import Button from "../../_components/Button";
import { LuSettings2 } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import RedDot from "@/app/_components/RedDot";
import Drawer from "@/app/_components/Drawer";

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
        {/* <BreadCrumbs
          filters={filters}
          searchParams={searchParams}
        /> */}
      </section>
      <FilterMenu
        areFiltersActive={areFiltersActive}
        isFilterOpen={isFilterOpen}
        toggleFilter={toggleFilter}
        searchParams={allParams}
      />
    </>
  );
};

export default Filters;
type FilterMenuProps = {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  areFiltersActive: boolean;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const FilterMenu = ({
  isFilterOpen,
  toggleFilter,
  areFiltersActive,
  searchParams,
}: FilterMenuProps) => {
  console.log({ searchParams });
  return (
    <Drawer isOpen={isFilterOpen} onClose={toggleFilter}>
      <aside
        className={`${
          isFilterOpen ? "" : "hidden"
        } w-[80vw] max-w-[400px] pt-16 h-screen bg-white grid relative`}
      >
        <AiOutlineCloseCircle
          onClick={toggleFilter}
          className="cursor-pointer text-3xl absolute top-5 right-2"
        />
        <FilterSection title="Línea" active>
          <Checkbox
            name="excelencia"
            title="Excelencia"
            description="La cima del Lujo, tu poder en cada detalle"
          />
          <Checkbox
            name="elite"
            title="Elite"
            description="Calidad que inspira Liderazgo"
          />
        </FilterSection>
        {areFiltersActive && (
          <Link
            href="/listing"
            onClick={toggleFilter}
            className="text-3xl font-bold"
          >
            {/* <Button type="submit">Quitar Filtros</Button> */}
          </Link>
        )}
      </aside>
      <div className="w-[10vw] h-screen" onClick={toggleFilter} />
    </Drawer>
  );
};
type CheckboxProps = {
  name: string;
  title: string;
  description: string;
};
const Checkbox = ({ name, title, description }: CheckboxProps) => {
  return (
    <div className="flex gap-3">
      <input type="checkbox" name={name} id="" />
      <label htmlFor={name}>
        <h4>{title}</h4>
        <p className="text-xs">{description}</p>
      </label>
    </div>
  );
};
type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  active?: boolean;
};
const FilterSection = ({
  title,
  children,
  active = false,
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="w-full h-fit px-4 py-6 border-b border-stone-300  flex-col justify-center items-start gap-3">
      <div className="flex justify-between items-center w-full ">
        <h3 className="font-bold relative">
          {title}{" "}
          {active ? (
            <RedDot
              // classNames="absolute -right-4 top-1/2 -translate-y-1/2"
              position="centerRight"
            />
          ) : (
            ""
          )}
        </h3>
        <OpenCloseFilterButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && <>{children}</>}
    </section>
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
          } flex items-center gap-2 text-sm`}
        >
          {!searchParams[filter] ? <></> : `${filter}:`}
          <Link href={`?${filter}=${searchParams[filter]}`}>
            {searchParams[filter]}
          </Link>
        </li>
      ))}
    </ul>
  );
};

type OpenCloseFilterButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};
const OpenCloseFilterButton = ({
  isOpen,
  onClick,
}: OpenCloseFilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-7 h-7 p-[7px] bg-neutral-100 grid place-content-center text-3xl relative"
    >
      {isOpen ? (
        <Line />
      ) : (
        <>
          <Line />
          <Line
            vertical
            classNames=" absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          />
        </>
      )}
    </button>
  );
};

const Line = ({
  classNames = "",
  vertical = false,
}: {
  classNames?: string;
  vertical?: boolean;
}) => {
  return (
    <div
      className={
        (!vertical ? "h-[2px] w-3.5" : "w-[2px] h-3.5") +
        " bg-neutral-600 " +
        classNames
      }
    />
  );
};
