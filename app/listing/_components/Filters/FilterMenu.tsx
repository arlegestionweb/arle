import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";
import Button from "@/app/_components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/app/_lib/utils";
import { useRef } from "react";

type TypeSearchParams = {
  [key: string]: string | string[] | undefined;
};
type FilterMenuProps = {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  areFiltersActive: boolean;
  searchParams: TypeSearchParams;
  marcas: string[];
  coleccionesDeMarca: string[];
};
const FilterMenu = ({
  isFilterOpen,
  toggleFilter,
  areFiltersActive,
  marcas,
  coleccionesDeMarca,
}: // searchParams,
FilterMenuProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const { push } = useRouter();
  const searchParams = useSearchParams();
  // console.log({ searchParams });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("running");
    const val = e.target as HTMLFormElement;

    const newParams = new URLSearchParams(searchParams.toString());

    const checkboxValues: string[] = [];
    val.querySelectorAll("input").forEach((input) => {
      if (input.type === "checkbox" && input.checked) {
        // console.log(input.name, input.value);
        if (newParams.has(input.name)) {
          checkboxValues.push(input.value);
          newParams.set(input.name, checkboxValues.join("& "));
        } else {
          newParams.set(input.name, input.value);
        }
      }
      if (input.type === "radio" && input.checked) {
        // console.log(input.dataset)
        newParams.set(input.name, input.value);
      }

      if (
        (input.name === "minPrice" || input.name === "maxPrice") &&
        input.value !== ""
      ) {
        newParams.set(input.name, input.value);
      }
    });

    newParams.forEach((value, key) => console.log(key, value));
    push(createUrl("/listing", newParams));
    toggleFilter();
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div
      className={`${
        isFilterOpen ? "w-screen" : "w-0"
      } fixed z-50 top-[60px] left-0 transition-all h-screen bg-black bg-opacity-50 flex`}
    >
      <aside
        className={`${
          isFilterOpen ? "" : "hidden"
        } w-[80vw] max-w-[400px] max-h-[calc(100vh-60px)] bg-white flex-col relative overflow-y-scroll`}
      >
        <form onSubmit={onFormSubmit} ref={formRef}>
          <header className="flex justify-end p-4">
            <AiOutlineCloseCircle
              onClick={toggleFilter}
              className="cursor-pointer text-3xl"
            />
          </header>
          <FilterSection
            title="Tipo de Producto"
            active={
              !!searchParams.get("type") && searchParams.get("type") !== "todos"
            }
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
              title="Reloj"
              defaultChecked={searchParams.get("type")?.includes("reloj")}
              type="radio"
              value={"reloj"}
            />
            <InputBox
              name="type"
              title="Perfume"
              defaultChecked={searchParams.get("type")?.includes("perfume")}
              type="radio"
              value={"perfume"}
            />
          </FilterSection>
          <FilterSection
            title="Línea"
            active={
              !!searchParams.get("linea") &&
              searchParams.get("linea") !== "todos"
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
          <FilterSection
            title="Género"
            active={
              !!searchParams.get("genero") &&
              searchParams.get("genero") !== "todos"
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
          <FilterSection title="Marcas" active={!!searchParams.get("marca")}>
            <InputBox
              key={"todas"}
              name="marca"
              title={"Todas"}
              type="checkbox"
              defaultChecked={
                searchParams.get("marca")?.includes("todas") ||
                !searchParams.get("marca")
              }
              value={"todas"}
              onChange={(e) => {
                if (e.target.checked) {
                  document
                    .querySelectorAll(
                      'input[name="marca"]:not([value="todas"])'
                    )
                    .forEach((checkbox) => {
                      (checkbox as HTMLInputElement).checked = false;
                    });
                }
              }}
            />

            {marcas?.map((marca) => (
              <InputBox
                key={marca}
                name="marca"
                title={marca}
                type="checkbox"
                defaultChecked={searchParams.get("marca")?.includes(marca)}
                value={marca}
                onChange={(e) => {
                  if (e.target.checked) {
                    const todasCheckbox = document.querySelector(
                      'input[name="marca"][value="todas"]'
                    );
                    if (todasCheckbox) {
                      (todasCheckbox as HTMLInputElement).checked = false;
                    }
                  }
                }}
              />
            ))}
          </FilterSection>

          <FilterSection
            title="Precio"
            active={
              !!searchParams.get("minPrice") || !!searchParams.get("maxPrice")
            }
          >
            <div className="flex gap-2 justify-between pt-2">
              <InputBox
                type="number"
                name="minPrice"
                className="w-full px-3 py-1.5 font-inter text-black bg-white rounded border border-stone-300"
                placeholder="Mínimo"
                min={0}
                defaultValue={
                  searchParams.get("minPrice")
                    ? Number(searchParams.get("minPrice"))
                    : undefined
                }
              />
              <InputBox
                type="number"
                name="maxPrice"
                className="w-full px-3 py-1.5 font-inter text-black bg-white rounded border border-stone-300"
                placeholder="Máximo"
                min={0}
                defaultValue={
                  searchParams.get("maxPrice")
                    ? Number(searchParams.get("maxPrice"))
                    : undefined
                }
              />
            </div>
          </FilterSection>
          <FilterSection
            title="Colecciones de Marca"
            active={
              !!searchParams.get("coleccionesDeMarca") &&
              !searchParams.get("coleccionesDeMarca")?.includes("todas")
            }
          >
            <InputBox
              key={"todas"}
              name="coleccionesDeMarca"
              title={"Todas"}
              type="checkbox"
              defaultChecked={
                searchParams.get("coleccionesDeMarca")?.includes("todas") ||
                !searchParams.get("coleccionesDeMarca")
              }
              value={"todas"}
              onChange={(e) => {
                if (e.target.checked) {
                  document
                    .querySelectorAll(
                      'input[name="coleccionesDeMarca"]:not([value="todas"])'
                    )
                    .forEach((checkbox) => {
                      (checkbox as HTMLInputElement).checked = false;
                    });
                }
              }}
            />
            {coleccionesDeMarca?.map((coleccion) => (
              <InputBox
                key={coleccion}
                name="coleccionesDeMarca"
                title={coleccion}
                type="checkbox"
                defaultChecked={searchParams
                  .get("coleccionesDeMarca")
                  ?.includes(coleccion)}
                value={coleccion}
                onChange={(e) => {
                  if (e.target.checked) {
                    const todasCheckbox = document.querySelector(
                      'input[name="coleccionesDeMarca"][value="todas"]'
                    );
                    if (todasCheckbox) {
                      (todasCheckbox as HTMLInputElement).checked = false;
                    }
                  }
                }}
              />
            ))}
          </FilterSection>
          <footer className="flex justify-evenly py-5">
            <Button type="submit">Aplicar Filtros</Button>
            {areFiltersActive && (
              <Link href="/listing" onClick={toggleFilter}>
                <Button>Quitar Filtros</Button>
              </Link>
            )}
          </footer>
        </form>
      </aside>
      <div
        className="w-[10vw] h-screen"
        onClick={() => {
          toggleFilter();
          resetForm();
        }}
      />
    </div>
  );
};

export default FilterMenu;
