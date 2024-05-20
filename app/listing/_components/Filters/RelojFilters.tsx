import { TRelojFilters } from ".";
import ColeccionDeMarcaFilter from "./ColeccionDeMarcaFilter";
import GeneroFilter from "./GeneroFilter";
import LineaFilter from "./LineaFilter";
import MarcaFilters from "./MarcaFilters";
import PrecioFilters from "./PrecioFilters";
import CheckboxSection from "./CheckBoxSection";
import TipoFilter from "./TipoFilter";

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
      <TipoFilter />
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
        name="coloresDeLasCajas"
        options={relojFilters.coloresDeLaCaja.map(color => color.nombre)}
      />
      <CheckboxSection
        name="coloresDeLosPulsos"
        options={relojFilters.coloresDelPulso.map(color => color.nombre)}
      />
      <CheckboxSection
        name="materialDeLosPulsos"
        options={relojFilters.materialDelPulsoDeReloj}
      />
      <CheckboxSection
        name="materialesDeLasCajas"
        options={relojFilters.cajas.materiales}
      />
      <CheckboxSection
        name="tiposDeMovimientos"
        options={relojFilters.tiposDeMovimiento}
      />
      <CheckboxSection
        name="tamañosDeLasCajas"
        options={relojFilters.cajas.diametros}
      />
    </>
  );
};

export default RelojFilters;
