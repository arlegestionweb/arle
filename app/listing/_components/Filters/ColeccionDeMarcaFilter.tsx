import CheckboxSection from "./CheckBoxSection";

const ColeccionDeMarcaFilter = ({
  coleccionesDeMarca,
}: {
  coleccionesDeMarca: string[];
}) => {

  return (
    <CheckboxSection name="coleccionesDeMarca" options={coleccionesDeMarca} />
  );
};

export default ColeccionDeMarcaFilter;
