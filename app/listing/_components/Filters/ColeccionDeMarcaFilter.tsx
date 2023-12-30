import CheckboxSection from "./CheckBoxSection";

const ColeccionDeMarcaFilter = ({
  coleccionesDeMarca,
}: {
  coleccionesDeMarca: string[];
}) => {

  return (
    <CheckboxSection name="coleccionesDeMarca" options={coleccionesDeMarca} feminine />
  );
};

export default ColeccionDeMarcaFilter;
