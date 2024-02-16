import RedDot from "@/app/_components/RedDot";
import { useState } from "react";

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  active?: boolean;
};
const FilterSection = ({
  title,
  children,
  active = false,
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(active);
  return (
    <section className={`w-full h-fit px-6 py-3 border-b border-gray-300  flex-col justify-center items-start gap-3 group ${!isOpen && "cursor-pointer"}`} onClick={() => !isOpen && setIsOpen(true)}>
      <section className={`flex justify-between items-center w-full ${isOpen && "pb-2"}`}>
        <h3 className={`font-inter font-normal text-gray-700 text-sm relative underline-offset-2 ${!isOpen && "group-hover:text-gray-600 group-hover:underline"}`}>
          {title} {active ? <RedDot position="centerRight" /> : ""}
        </h3>
        <OpenCloseFilterButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </section>
      {isOpen && <>{children}</>}
    </section>
  );
};

type OpenCloseFilterButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};
const OpenCloseFilterButton = ({
  isOpen,
  onClick,
}: OpenCloseFilterButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-7 h-7 p-[7px] bg-neutral-100 grid place-content-center text-3xl relative"
    >
      {!isOpen && <Line />}
      <Line
        vertical={!isOpen}
        classNames="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

const Line = ({
  classNames = "",
  vertical = false,
}: {
  classNames?: string;
  vertical?: boolean;
}) => {
  return (
    <div
      className={
        (!vertical ? "h-[2px] w-3.5" : "w-[2px] h-3.5") +
        " bg-neutral-600 duration-200 " +
        classNames
      }
    />
  );
};

export default FilterSection;
