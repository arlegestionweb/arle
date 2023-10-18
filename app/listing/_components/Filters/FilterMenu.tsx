import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FilterSection from "./FilterSection";
import Checkbox from "./Checkbox";
import Button from "@/app/_components/Button";

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
    <div
      className={`${
        isFilterOpen ? "w-screen" : "w-0"
      } fixed z-10 top-[60px] left-0 transition-all h-screen bg-black bg-opacity-50 flex`}
    >
      <aside
        className={`${
          isFilterOpen ? "" : "hidden"
        } w-[80vw] max-w-[400px] pt-16 h-screen bg-white flex-col relative`}
      >
        <AiOutlineCloseCircle
          onClick={toggleFilter}
          className="cursor-pointer text-3xl absolute top-5 right-2"
        />
        <FilterSection title="Tipo de Producto" active={!!searchParams["producto"]}>
          <Checkbox
            name="gafa"
            title="Gafas"
            checked={searchParams["producto"]?.includes("gafa")}
            />
          <Checkbox
            name="reloj"
            title="Reloj"
            checked={searchParams["producto"]?.includes("reloj")}
          />
          <Checkbox
            name="perfume"
            title="Perfume"
            checked={searchParams["producto"]?.includes("perfume")}
          />
        </FilterSection>
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
            <Button type="submit">Quitar Filtros</Button>
          </Link>
        )}
      </aside>
      <div className="w-[10vw] h-screen" onClick={toggleFilter} />
    </div>
  );
};

export default FilterMenu;