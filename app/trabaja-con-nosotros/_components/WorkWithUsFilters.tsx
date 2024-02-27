"use client"

import Button from "@/app/_components/Button";
import Dropdown, { TDropdownOption } from "@/app/_components/Dropdown";
import { createUrl, makeNewParams } from "@/app/_lib/utils";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";

const WorkWithUsFilters = ({ areasLaborales, sedes }: {
  areasLaborales: TDropdownOption[];
  sedes: TDropdownOption[];
}) => {
  const searchParams = useSearchParams();
  const [isAreasLaboralesOpen, setIsAreasLaboralesOpen] = useState(false);
  const [isSedesOpen, setIsSedesOpen] = useState(false);

  const areasLaboralesButtonRef = useRef<HTMLButtonElement | null>(null);
  const sedesButtonRef = useRef<HTMLButtonElement | null>(null);

  const toggleAreasLaborales = () => {
    // event.preventDefault();
    setIsAreasLaboralesOpen(!isAreasLaboralesOpen)
  };


  const areasLaboralesWithLinkWithSearchparams = areasLaborales.map(areaLaboral => ({
    ...areaLaboral,
    // href: createUrl("/trabaja-con-nosotros", makeNewParams(searchParams, { areaLaboral: areaLaboral.value }))
    href: createUrl("/trabaja-con-nosotros", makeNewParams("areaLaboral", areaLaboral.value, searchParams))
  }));


  // adds "todas option to areaLaboral"
  areasLaboralesWithLinkWithSearchparams.push({
    label: "Todas",
    value: "",
    href: createUrl("/trabaja-con-nosotros", makeNewParams("areaLaboral", "", searchParams))
  });


  const sedesWithLinkWithSearchparams = sedes.map(sede => ({
    ...sede,
    // href: createUrl("/trabaja-con-nosotros", makeNewParams(searchParams, { sede: sede.value }))
    href: createUrl("/trabaja-con-nosotros", makeNewParams("sede", sede.value, searchParams))
  }));
  // adds "todas option to sedes"
  sedesWithLinkWithSearchparams.push({
    label: "Todas",
    value: "",
    href: createUrl("/trabaja-con-nosotros", makeNewParams("sede", "", searchParams))
  });

  const toggleSedes = () => {
    setIsSedesOpen(!isSedesOpen)
  };

  return (
    <aside className="flex gap-4 flex-wrap">
      <Button
        ref={areasLaboralesButtonRef}
        className="flex items-center gap-1 relative text-ellipsis whitespace-nowrap"
        labelType={"lightSmall"}
        type="button"
        onClick={toggleAreasLaborales}
      >
        <LuSettings2 className="h-3 w-3" width={14} height={14} />
        Areas Laborales: {areasLaborales.find(option => option.value === searchParams.get("areaLaboral"))?.label || "Todas"}
        <Dropdown
          options={areasLaboralesWithLinkWithSearchparams}
          isOpen={isAreasLaboralesOpen}
          onClose={() => setIsAreasLaboralesOpen(false)}
        // buttonClicked={isAreasLaboralesOpen}
        />
      </Button>
      <Button
        ref={sedesButtonRef}
        className="flex items-center gap-1 relative text-ellipsis whitespace-nowrap"
        labelType={"lightSmall"}
        type="button"
        onClick={toggleSedes}
      >
        <IoLocationOutline className="text-lg sm:text-xl" />
        Sedes: {sedes?.find(option => option.value === searchParams.get("sede"))?.label || "Todas"}
        <Dropdown
          options={sedesWithLinkWithSearchparams}
          isOpen={isSedesOpen}
          onClose={() => setIsSedesOpen(false)}
          ignoreRef={sedesButtonRef}
        />
      </Button>

    </aside>
  );
}

export default WorkWithUsFilters;