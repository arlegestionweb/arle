import CheckboxSection from "./CheckBoxSection";

const MarcaFilters = ({ marcas }: { marcas: string[] }) => {
  return <CheckboxSection name="marcas" options={marcas} />;
};

export default MarcaFilters;
