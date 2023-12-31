import { TPerfumeFilters } from ".";
import CheckboxSection from "./CheckBoxSection";
import ColeccionDeMarcaFilter from "./ColeccionDeMarcaFilter";
import GeneroFilter from "./GeneroFilter";
import LineaFilter from "./LineaFilter";
import MarcaFilters from "./MarcaFilters";
import PrecioFilters from "./PrecioFilters";

const PerfumeFilters = ({
  marcas,
  coleccionesDeMarca,
  perfumeFilters
}: {
  marcas: string[];
  coleccionesDeMarca: string[];
  perfumeFilters: TPerfumeFilters;
}) => {
  return (
    <>
      <LineaFilter />
      <GeneroFilter />
      <MarcaFilters marcas={marcas} />
      <PrecioFilters />
      <ColeccionDeMarcaFilter coleccionesDeMarca={coleccionesDeMarca} />
      <CheckboxSection
        name="tamañosDePerfume"
        options={perfumeFilters.tamanos}
        units="ml"
      />
      <CheckboxSection
        name="concentraciónDePerfume"
        options={perfumeFilters.concentraciones}
        feminine
      />
      <CheckboxSection
        name="familiasOlvativas"
        options={perfumeFilters.familiasOlfativas}
        feminine
      />
      <CheckboxSection
        name="parteDeUnSet"
        options={perfumeFilters.sets.map(set => set ? "Sí" : "No")}
      />
    </>
  );
};

export default PerfumeFilters;