import Image from "next/image";
import Button from "../Button";
import { LuSettings2 } from "react-icons/lu";
import {FiFilter} from "react-icons/fi";

const Filters = ({ areFiltersActive }: { areFiltersActive: boolean }) => {
  return (
    <section className="flex gap-3 mb-5">
      <Button className="flex items-center gap-2" active={areFiltersActive}>
        <FiFilter />
        Filtros
      </Button>
      <Button className="flex items-center gap-2">
        <LuSettings2 /> Sort by: {"Recents"}
      </Button>
    </section>
  );
};

export default Filters;
