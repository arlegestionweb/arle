import { ComponentPropsWithoutRef, ReactNode } from "react";
import RedDot from "./RedDot";
import { cn } from "../_lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const buttonsVariants = cva(
  "px-3 py-1.5 border border-black relative",
  {
    variants: {
      labelType: {
        light: "bg-white text-black",
        dark: "bg-black text-[#CFCFCF]",
      },
    },
    defaultVariants: {
      labelType: "light",
    },
  }
);

type ButtonProps = ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonsVariants> & {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}

const Button = ({children, active, className = "", labelType}: ButtonProps) => {
  return (
    <button className={cn(buttonsVariants({labelType}), className)}>
      {children}
      {active && (
        <RedDot />
      )}
    </button>
  );
}

export default Button;