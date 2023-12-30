import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";
import { camelToTitleCase } from "@/utils/helpers";

const CheckboxSection = ({ options, name }: { options: (string | number)[], name: string }) => {
  const searchParams = useSearchParams();

  return (
    <FilterSection title={camelToTitleCase(name)} active={!!searchParams.get(name)}>
      <InputBox
        key={"todas"}
        name={name}
        title={"Todas"}
        type="checkbox"
        defaultChecked={
          searchParams.get(name)?.includes("todas") ||
          !searchParams.get(name)
        }
        value={"todas"}
        onChange={(e) => {
          if (e.target.checked) {
            document
              .querySelectorAll(`input[name=${name}]:not([value="todas"])`)
              .forEach((checkbox) => {
                (checkbox as HTMLInputElement).checked = false;
              });
          }
        }}
      />

      {options?.map((option) => (
        <InputBox
          key={option}
          name={name}
          title={option.toString()}
          type="checkbox"
          defaultChecked={searchParams.get(name)?.includes(option.toString())}
          value={option}
          onChange={(e) => {
            if (e.target.checked) {
              const todasCheckbox = document.querySelector(
                `input[name=${name}][value="todas"]`
              );
              if (todasCheckbox) {
                (todasCheckbox as HTMLInputElement).checked = false;
              }
            }
          }}
        />
      ))}
    </FilterSection>
  );
};

export default CheckboxSection;
