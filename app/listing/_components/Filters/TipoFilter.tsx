import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";


const TipoFilter = () => {
    const searchParams = useSearchParams();

  return (
    <FilterSection
        title="Tipo de Producto"
        active={
          !!searchParams.get("type") && searchParams.get("type") !== "todos"
        }
        initialOpen
      >
        <InputBox
          name="type"
          title="Todos"
          defaultChecked={
            searchParams.get("type")?.includes("todos") ||
            !searchParams.get("type")
          }
          type="radio"
          value={"todos"}
        />
        <InputBox
          name="type"
          title="Gafas"
          defaultChecked={searchParams.get("type")?.includes("gafa")}
          type="radio"
          value={"gafa"}
        />
        <InputBox
          name="type"
          title="Perfumes"
          defaultChecked={searchParams.get("type")?.includes("perfume")}
          type="radio"
          value={"perfume"}
        />
        <InputBox
          name="type"
          title="Relojes"
          defaultChecked={searchParams.get("type")?.includes("reloj")}
          type="radio"
          value={"reloj"}
        />
      </FilterSection>
  )
}

export default TipoFilter;