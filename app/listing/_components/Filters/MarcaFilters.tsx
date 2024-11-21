import CheckboxSection from "./CheckBoxSection";

const MarcaFilters = ({ marcas }: { marcas: string[] }) => {
  return <CheckboxSection name="marcas" options={marcas.sort((a, b) =>  a.toLowerCase().localeCompare(b.toLowerCase()))} feminine />;
};

export default MarcaFilters;
