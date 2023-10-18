import { useState } from "react";

type CheckboxProps = {
  name: string;
  title: string;
  description?: string;
  checked?: boolean;
};
const Checkbox = ({ name, title, description, checked = false }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked)
  return (
    <div className="flex gap-3">
      <input type="checkbox" name={name} id="" checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
      <label htmlFor={name}>
        <h4>{title}</h4>
        {description && <p className="text-xs">{description}</p>}
      </label>
    </div>
  );
};

export default Checkbox;