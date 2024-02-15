import { ComponentPropsWithoutRef, ReactNode } from "react";
import RedDot from "./RedDot";
import { cn } from "../_lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const buttonsVariants = cva("px-6 py-1 relative font-inter font-normal text-base disabled:opacity-40", {
  variants: {
    labelType: {
      light: "bg-white text-gray-800 border border-black ",
      lightSmall: "bg-white text-gray-800 border border-black px-3 py-[2px] text-sm md:text-base",
      gray: "bg-gray-100 text-gray-800 ",
      dark: "bg-black text-gray-100 ",
    },
  },
  defaultVariants: {
    labelType: "light",
  },
});

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonsVariants> & {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    active?: boolean;
  };

const Button = ({
  children,
  active,
  className = "",
  labelType,
  ...rest
}: ButtonProps) => {
  return (
    <button className={cn(buttonsVariants({ labelType }), className)} {...rest}>
      {children}
      {active && <RedDot />}
    </button>
  );
};

export default Button;
