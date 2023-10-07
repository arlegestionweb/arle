import { ComponentPropsWithoutRef, ReactNode } from "react";
import RedDot from "./RedDot";
import { cn } from "../_lib/utils";
type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}
const Button = ({children, active, className = ""}: ButtonProps) => {
  return (
    <button className={cn(`px-3 py-1.5 border border-black relative`, className)}>
      {children}
      {active && (
        <RedDot />
      )}
    </button>
  );
}

export default Button;