import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";
import { useEffect, useState } from "react";

const GeneroFilter = () => {
  const searchParams = useSearchParams();
  const options = ["unisex", "mujer", "hombre"];
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const newCheckedState: { [key: string]: boolean } = {};
    options.forEach((option) => {
      newCheckedState[option] = searchParams.get("genero")?.includes(option) || false;
    });
    setCheckedState(newCheckedState);
  }, [searchParams]);


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
      {options.map((option) => (
        <InputBox
          key={option}
          name="genero"
          title={option}
          type="radio"
          value={option}
          capitalize
          checked={!!checkedState[option]}
        />
      ))}
    </FilterSection>
  );
};

export default GeneroFilter;
