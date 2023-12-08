import React, { useCallback, useEffect, useState } from "react";
import { Select } from "@sanity/ui";
import sanityClient from "@/sanity/sanityClient";
import { set, useFormValue } from "sanity";

const ColeccionDeMarcaInput = (props) => {
  const [colecciones, setColecciones] = useState([]);
  const { value, onChange } = props;

  const docId = String(useFormValue(["_id"])).replace("drafts.", "");

  useEffect(() => {
    const fetchColecciones = async () => {
      const { colecciones } = await sanityClient.fetch(
        `*[_id == "${docId}"][0]{"colecciones": marca -> colecciones}`
      );
      setColecciones(colecciones);
    };

    fetchColecciones();
  }, []);
  const handleChange = useCallback(
    (event) => {
      const value = event.target.value;
      onChange(value ? set(value) : set(null));
    }, [onChange]);

  return (
    <Select id="coleccionDeMarca" value={value} onChange={handleChange}>
      <option value="">None</option>
      {colecciones.map((coleccion) => (
        <option key={coleccion} value={coleccion}>
          {coleccion}
        </option>
      ))}
    </Select>
  );
};

export default ColeccionDeMarcaInput;
