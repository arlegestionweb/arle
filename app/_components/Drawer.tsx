import { useEffect, useRef } from "react";
import { cn } from "../_lib/utils";

type DrawerProps = {
  isOpen?: boolean;
  onClose?: (callback?: () => void) => void;
  animation?: "right" | "left";
  children: React.ReactNode | React.ReactNode[];
};

const Drawer = ({
  isOpen,
  onClose,
  animation = "left",
  children,
}: DrawerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className={cn(
          "fixed z-40 w-screen bg-black duration-300 opacity-40 transition-opacity h-screen left-0 top-0 ",
          !isOpen && "hidden animate-fade-out"
        )}
        onClick={e => {
          onClose && onClose();
        }}
      />
      <section
        className={cn(
          `fixed z-40 top-0 ease-in-out duration-200 transition-all h-screen bg-color-bg-surface-1-default w-screen md:w-80`,
          [
            animation === "right"
              ? ["right-[-150%]", isOpen ? "right-0" : "right-[-150%]"]
              : ["left-[-150%]", isOpen ? "left-0" : " left-[-150%]"],
          ]
        )}>
        {/* Seccion inicial */}
        {children}
      </section>
    </>
  );
};

export default Drawer;
