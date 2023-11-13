import { cn } from "../_lib/utils";
import { BsMagic } from "react-icons/bs";

// TODO crear variantes

type LabelsProps = {
  label: string;
  className?: string;
};

const Labels = ({ label, className }: LabelsProps) => {
  return (
    <div
      className={cn(
        "absolute top-0 bg-[#fff] flex p-1 md:p-2 gap-1 items-center border-2 border-[#bebebe]",
        className
      )}>
      <BsMagic/>
      <span className="font-tajawal font-medium text-[0.7rem] md:text-base leading-5 capitalize">
        {label}
      </span>
    </div>
  );
};

export default Labels;
