import { MouseEventHandler } from "react";

interface BurgerProps {
  openNav?: () => void;
  closeNav?: () => void;
  isNavOpen: boolean;
  barColor?: string;
}

const Burger = ({ openNav, closeNav, isNavOpen, barColor }: BurgerProps) => {
  return (
    <div
      className="flex justify-center items-center"
      onClick={() => {
        if (isNavOpen) {
          closeNav && closeNav();
        } else {
          openNav && openNav();
        }
      }}
    >
      <div className="relative grid place-content-center z-50 gap-[7px]  cursor-pointer ">
        <Bar
          barColor={barColor}
          width={isNavOpen ? "w-6 translate-x-20" : "w-6"}
        />
        <Bar
          width={isNavOpen ? "w-6 translate-x-20" : "w-6"}
          barColor={barColor}
        />
        <Bar
          barColor={barColor}
          width={isNavOpen ? "w-6 translate-x-20" : "w-6"}
        />
      </div>
    </div>
  );
};
interface BarProps {
  width?: string;
  rotateZ?:
    | "rotate-45 translate-y-3"
    | "-rotate-45 -translate-y-2"
    | "rotate-0";
  barColor?: string;
}
const Bar = ({
  width = "w-10",
  rotateZ = "rotate-0",
  barColor = "bg-orange-300",
}: BarProps) => {
  return (
    <div
      className={`${width} ${rotateZ} transition-all duration-700 h-[2px]  ${barColor} rounded-md`}
    />
  );
};
export default Burger;
