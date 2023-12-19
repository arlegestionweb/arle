import { Stack, TextInput } from "@sanity/ui";
import { useEffect, useState } from "react";
import {set, unset} from 'sanity'
import { formatNumber } from "@/app/_lib/utils";


const ColombianPrice = ({ elementProps, onChange, value }) => {
  const [number, setNumber] = useState("");

  const handleChange = (event) => {
    const newValue = +event.target.value
      .split("$ ")
      .join("")
      .split(".")
      .join("")
      .split("'")
      .join("");
    if (isNaN(newValue)) {
      return;
    }
    const formattedNumber = formatNumber(newValue);
    setNumber(formattedNumber);
    onChange(formattedNumber ? set(formattedNumber) : unset())
    // onChange({ ...event, target: { ...event.target, value: formattedNumber } });
  };
  
  useEffect(() => {
    setNumber(value || "");
  }, []);

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={`$ ${number}`}
      />
    </Stack>
  );
};

export default ColombianPrice;