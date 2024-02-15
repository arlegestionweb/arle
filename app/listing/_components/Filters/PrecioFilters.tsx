import { useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import InputBox from "./InputBox";

const PrecioFilters = () => {
  const searchParams = useSearchParams();

  return (
    <FilterSection
      title="Precio"
      active={!!searchParams.get("minPrice") || !!searchParams.get("maxPrice")}
    >
      <div className="flex gap-2 justify-between pt-2">
        <InputBox
          type="number"
          name="minPrice"
          className="w-full px-3 py-1.5 font-inter text-sm text-black bg-white rounded border border-stone-300"
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
          className="w-full px-3 py-1.5 font-inter text-sm text-black bg-white rounded border border-stone-300"
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
  );
};

export default PrecioFilters;
