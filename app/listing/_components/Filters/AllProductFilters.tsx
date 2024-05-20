import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";
import LineaFilter from "./LineaFilter";
import GeneroFilter from "./GeneroFilter";
import MarcaFilters from "./MarcaFilters";
import PrecioFilters from "./PrecioFilters";
import ColeccionDeMarcaFilter from "./ColeccionDeMarcaFilter";
import TipoFilter from "./TipoFilter";

type TAllProductFiltersProps = {
  marcas: string[];
  coleccionesDeMarca: string[];
};

const AllProductFilters = ({
  marcas,
  coleccionesDeMarca,
}: TAllProductFiltersProps) => {
  const searchParams = useSearchParams();

  return (
    <>
      <TipoFilter />
      <LineaFilter />
      <GeneroFilter />
      <MarcaFilters marcas={marcas} />
      <PrecioFilters />
      <ColeccionDeMarcaFilter coleccionesDeMarca={coleccionesDeMarca} />
    </>
  );
};

export default AllProductFilters;
