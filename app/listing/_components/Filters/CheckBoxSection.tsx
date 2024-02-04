import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";
import { camelToTitleCase, normalizeName } from "@/utils/helpers";

const CheckboxSection = ({
  options,
  name,
  feminine = false,
  units
}: {
  options: (string | number)[];
  name: string;
  feminine?: boolean;
  units? : string;
}) => {
  const searchParams = useSearchParams();

  const allTitle = feminine ? "todas" : "todos";

  // if (name === "marcas") {
  //   console.log({marcas: searchParams.get("marcas")})
  // }

  return (
    <FilterSection
      title={camelToTitleCase(name)}
      active={!!searchParams.get(normalizeName(name))}
    >
      <InputBox
        key={allTitle}
        name={normalizeName(name)}
        title={camelToTitleCase(allTitle)}
        type="checkbox"
        checked={
          searchParams.get(name)?.includes(allTitle) || !searchParams.get(name)
        }
        value={allTitle}
        onChange={(e) => {
          if (e.target.checked) {
            document
              .querySelectorAll(`input[name=${normalizeName(name)}]:not([value=${allTitle}])`)
              .forEach((checkbox) => {
                (checkbox as HTMLInputElement).checked = false;
              });
          }
        }}
      />

      {options?.map((option) => (
        <InputBox
          key={option}
          name={normalizeName(name)}
          title={option.toString()}
          type="checkbox"
          defaultChecked={searchParams.get(normalizeName(name))?.includes(option.toString())}
          value={option}
          onChange={(e) => {
            if (e.target.checked) {
              const todasCheckbox = document.querySelector(
                `input[name=${normalizeName(name)}][value=${allTitle}]`
              );
              if (todasCheckbox) {
                (todasCheckbox as HTMLInputElement).checked = false;
              }
            }
          }}
          units={units}
        />
      ))}
    </FilterSection>
  );
};

export default CheckboxSection;
