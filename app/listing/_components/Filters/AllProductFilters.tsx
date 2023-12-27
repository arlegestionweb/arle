import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";
import LineaFilter from "./LineaFilter";

type TAllProductFiltersProps = {
  marcas: string[];
  coleccionesDeMarca: string[];
};

const AllProductFilters = ({
  marcas,
  coleccionesDeMarca,
}: TAllProductFiltersProps) => {
  const searchParams = useSearchParams();

  return (
    <>
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
      <LineaFilter />
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
                .querySelectorAll('input[name="marca"]:not([value="todas"])')
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
    </>
  );
};

export default AllProductFilters;
