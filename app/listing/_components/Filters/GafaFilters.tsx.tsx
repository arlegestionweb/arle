import { TGafaFilters } from ".";
import CheckboxSection from "./CheckBoxSection";
import ColeccionDeMarcaFilter from "./ColeccionDeMarcaFilter";
import GeneroFilter from "./GeneroFilter";
import LineaFilter from "./LineaFilter";
import MarcaFilters from "./MarcaFilters";
import PrecioFilters from "./PrecioFilters";

const GafaFilters = ({
  marcas,
  coleccionesDeMarca,
  gafaFilters,
}: {
  marcas: string[];
  coleccionesDeMarca: string[];
  gafaFilters: TGafaFilters;
}) => {
  return (
    <>
      <LineaFilter />
      <GeneroFilter />
      <MarcaFilters marcas={marcas} />
      <PrecioFilters />
      <ColeccionDeMarcaFilter coleccionesDeMarca={coleccionesDeMarca} />
      <CheckboxSection name="tiposDeGafas" options={gafaFilters.tiposDeGafas} />
      <CheckboxSection
        name="estilosDeGafas"
        options={gafaFilters.estilosDeGafas}
      />
      <CheckboxSection
        name="coloresDeLasMonturas"
        options={gafaFilters.coloresDeLasMonturas.map((color) => color.nombre)}
      />
      <CheckboxSection
        name="coloresDeLosLentes"
        options={gafaFilters.coloresDeLosLentes.map((color) => color.nombre)}
      />
      <CheckboxSection
        name="formasDeLasMonturas"
        options={gafaFilters.formasDeLasMonturas}
      />
      <CheckboxSection
        name="materialesDeLasMonturas"
        options={gafaFilters.materialesDeLasMonturas}
      />
    </>
  );
};

export default GafaFilters;
