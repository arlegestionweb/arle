import { Stack, TextInput } from "@sanity/ui";
import { useEffect, useState } from "react";
import {set, unset} from 'sanity'

function formatNumber(number) {
  let numStr = number.toString();
  let result = "";
  let count = 0;

  for (let i = numStr.length - 1; i >= 0; i--) {
    count++;
    result = numStr[i] + result;
    if (count === 3 && i !== 0) {
      result = "." + result;
      count = 0;
    }
  }
  return result;
}

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
