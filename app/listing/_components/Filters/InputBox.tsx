import { type ComponentPropsWithoutRef } from "react";


type InputProps = ComponentPropsWithoutRef<"input"> & {
  title: string;
  description?: string;
  // className?: string;
}
const InputBox = ({ title, description, ...rest}: InputProps) => {
  // const [isChecked, setIsChecked] = useState(checked)
  return (
    <label className="flex gap-3 items-center" 
    // onClick={() => setIsChecked(!isChecked)}
    >
      <input 
      // checked={isChecked}
       {...rest} />
      <div>
        <h4>{title}</h4>
        {description && <p className="text-xs">{description}</p>}
      </div>
    </label>
  );
};

export default InputBox;