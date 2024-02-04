import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";
import { camelToTitleCase, normalizeName } from "@/utils/helpers";
import { useEffect, useState } from "react";

const CheckboxSection = ({
  options,
  name,
  feminine = false,
  units
}: {
  options: (string | number)[];
  name: string;
  feminine?: boolean;
  units?: string;
}) => {
  const searchParams = useSearchParams();

  const allTitle = feminine ? "todas" : "todos";

  // if (name === "marcas") {
  //   console.log({marcas: searchParams.get("marcas")})
  // }
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const newCheckedState: { [key: string]: boolean } = {};
    options?.forEach((option) => {
      newCheckedState[option] = searchParams.get(normalizeName(name))?.includes(option.toString()) || false;
    });
    setCheckedState(newCheckedState);
  }, [searchParams, name, options]);

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

      {options?.map((option) => {
        if (name === "marcas") {
          console.log({ option, checked: searchParams.get(normalizeName(name))?.includes(option.toString()) })
        }
        return (
          <InputBox
            key={option}
            name={normalizeName(name)}
            title={option.toString()}
            type="checkbox"
            checked={checkedState[option] || false}
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
        )
      })}
    </FilterSection>
  );
};

export default CheckboxSection;
