import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";

const LineaFilter = () => {
  const searchParams = useSearchParams();

  return (
    <FilterSection
      title="Línea"
      active={
        !!searchParams.get("linea") && searchParams.get("linea") !== "todos"
      }
    >
      <InputBox
        name="linea"
        title="Todos"
        description="Ver todos los productos"
        type="radio"
        defaultChecked={
          searchParams.get("linea")?.includes("todos") ||
          !searchParams.get("linea")
        }
        value={"todos"}
      />
      <InputBox
        name="linea"
        title="Excelencia"
        description="La cima del Lujo, tu poder en cada detalle"
        type="radio"
        defaultChecked={searchParams.get("linea")?.includes("premium")}
        value={"premium"}
      />
      <InputBox
        name="linea"
        title="Elite"
        description="Calidad que inspira Liderazgo"
        type="radio"
        defaultChecked={searchParams.get("linea")?.includes("lujo")}
        value={"lujo"}
      />
    </FilterSection>
  );
};

export default LineaFilter;
