import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";
import Button from "@/app/_components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/sanity/lib/utils";

type TypeSearchParams = {
  [key: string]: string | string[] | undefined;
};
type FilterMenuProps = {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  areFiltersActive: boolean;
  searchParams: TypeSearchParams;
};
const FilterMenu = ({
  isFilterOpen,
  toggleFilter,
  areFiltersActive,
}: // searchParams,
FilterMenuProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  console.log({ searchParams });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("running");
    const val = e.target as HTMLFormElement;

    const newParams = new URLSearchParams(searchParams.toString());
    // console.log({newparamsBefore: newParams.toString()})

    val.querySelectorAll("input").forEach((input) => {
      if (input.checked) {
        console.log(input.name, input.value);
        newParams.set(input.name, input.value);
      }
    });

    push(createUrl("/listing", newParams));
    toggleFilter();
  };
  return (
    <div
      className={`${
        isFilterOpen ? "w-screen" : "w-0"
      } fixed z-10 top-[60px] left-0 transition-all h-screen bg-black bg-opacity-50 flex`}
    >
      <aside
        className={`${
          isFilterOpen ? "" : "hidden"
        } w-[80vw] max-w-[400px] h-screen bg-white flex-col relative`}
      >
        <form onSubmit={onFormSubmit}>
          <header className="flex justify-end p-4">
            <AiOutlineCloseCircle
              onClick={toggleFilter}
              className="cursor-pointer text-3xl"
            />
          </header>
          <FilterSection
            title="Tipo de Producto"
            active={!!searchParams.get("producto")}
          >
            <InputBox
              name="producto"
              title="Gafas"
              defaultChecked={searchParams.get("producto")?.includes("gafa")}
              type="radio"
              value={"gafa"}
            />
            <InputBox
              name="producto"
              title="Reloj"
              defaultChecked={searchParams.get("producto")?.includes("reloj")}
              type="radio"
              value={"reloj"}
            />
            <InputBox
              name="producto"
              title="Perfume"
              defaultChecked={searchParams.get("producto")?.includes("perfume")}
              type="radio"
              value={"perfume"}
            />
          </FilterSection>
          <FilterSection title="Línea" active={!!searchParams.get("linea")}>
            <InputBox
              name="linea"
              title="Excelencia"
              description="La cima del Lujo, tu poder en cada detalle"
              type="radio"
              defaultChecked={searchParams.get("linea")?.includes("excelencia")}
              value={"excelencia"}
            />
            <InputBox
              name="linea"
              title="Elite"
              description="Calidad que inspira Liderazgo"
              type="radio"
              defaultChecked={searchParams.get("linea")?.includes("elite")}
              value={"elite"}
            />
          </FilterSection>
          <FilterSection title="Género" active={!!searchParams.get("genero")}>
            <InputBox
              name="genero"
              title="Mujer"
              type="radio"
              defaultChecked={searchParams.get("genero")?.includes("mujer")}
            />
            <InputBox
              name="genero"
              title="Hombre"
              type="radio"
              defaultChecked={searchParams.get("genero")?.includes("hombre")}
            />
          </FilterSection>
          <footer className="flex justify-evenly py-5">
            <Button type="submit">Aplicar Filtros</Button>
            {areFiltersActive && (
              <Link href="/listing" onClick={toggleFilter}>
                <Button type="submit">Quitar Filtros</Button>
              </Link>
            )}
          </footer>
        </form>
      </aside>
      <div className="w-[10vw] h-screen" onClick={toggleFilter} />
    </div>
  );
};

export default FilterMenu;
