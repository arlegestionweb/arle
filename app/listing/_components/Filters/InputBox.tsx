import { type ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  title?: string;
  description?: string;
  units?: string;
  // className?: string;
  capitalize?: boolean;
};
const InputBox = ({ title, description, units, capitalize = false, ...rest }: InputProps) => {
  // const [isChecked, setIsChecked] = useState(checked)
  return (
    <label
      className="flex gap-3 items-center py-[1px]"
      // onClick={() => setIsChecked(!isChecked)}
    >
      <input {...rest} />
      <div>
        {title && <h4 className={`font-inter font-normal text-sm text-gray-800 cursor-pointer hover:text-gray-600 ${capitalize ? "capitalize" : ""}`}>{title} {units ? units : ""}</h4>}
        {description && <p className="font-inter font-light text-xs text-gray-800">{description}</p>}
      </div>
    </label>
  );
};

export default InputBox;