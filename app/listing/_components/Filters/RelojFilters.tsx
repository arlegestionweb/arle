import { TRelojFilters } from ".";
import ColeccionDeMarcaFilter from "./ColeccionDeMarcaFilter";
import GeneroFilter from "./GeneroFilter";
import LineaFilter from "./LineaFilter";
import MarcaFilters from "./MarcaFilters";
import PrecioFilters from "./PrecioFilters";
import CheckboxSection from "./CheckBoxSection";

const RelojFilters = ({
  marcas,
  coleccionesDeMarca,
  relojFilters,
}: {
  marcas: string[];
  coleccionesDeMarca: string[];
  relojFilters: TRelojFilters;
}) => {
  return (
    <>
      <LineaFilter />
      <GeneroFilter />
      <MarcaFilters marcas={marcas} />
      <PrecioFilters />
      <ColeccionDeMarcaFilter coleccionesDeMarca={coleccionesDeMarca} />
      <CheckboxSection
        name="tiposDeReloj"
        options={relojFilters.tiposDeReloj}
      />
      <CheckboxSection
        name="estilosDeReloj"
        options={relojFilters.estilosDeReloj}
      />
      <CheckboxSection
        name="coloresDeLaCaja"
        options={relojFilters.coloresDeLaCaja.map(color => color.nombre)}
      />
      <CheckboxSection
        name="coloresDelPulso"
        options={relojFilters.coloresDelPulso.map(color => color.nombre)}
      />
      <CheckboxSection
        name="materialDelPulso"
        options={relojFilters.materialDelPulsoDeReloj}
      />
      <CheckboxSection
        name="materialesDeLasCajas"
        options={relojFilters.cajas.materiales}
      />
      <CheckboxSection
        name="tiposDeMovimiento"
        options={relojFilters.tiposDeMovimiento}
      />
      <CheckboxSection
        name="TamañoDeLaCaja"
        options={relojFilters.cajas.diametros}
      />
    </>
  );
};

export default RelojFilters;
