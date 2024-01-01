import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";

const GeneroFilter = () => {
  const searchParams = useSearchParams();

  return (
    <FilterSection
      title="Género"
      active={
        !!searchParams.get("genero") && searchParams.get("genero") !== "todos"
      }
    >
      <InputBox
        name="genero"
        title="Todos"
        type="radio"
        value={"todos"}
        defaultChecked={
          searchParams.get("genero")?.includes("todos") ||
          !searchParams.get("genero")
        }
      />
      <InputBox
        name="genero"
        title="Unisex"
        type="radio"
        value={"unisex"}
        defaultChecked={searchParams.get("genero")?.includes("unisex")}
      />
      <InputBox
        name="genero"
        title="Mujer"
        type="radio"
        value={"mujer"}
        defaultChecked={searchParams.get("genero")?.includes("mujer")}
      />
      <InputBox
        name="genero"
        title="Hombre"
        type="radio"
        value={"hombre"}
        defaultChecked={searchParams.get("genero")?.includes("hombre")}
      />
    </FilterSection>
  );
};

export default GeneroFilter;
