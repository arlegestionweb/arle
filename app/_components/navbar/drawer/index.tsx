import { cn } from "@/app/_lib/utils";
import React from "react";
import Level1 from "./Level1";

type DrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
  animation?: "slide-in" | "slide-in-right";
};

function Drawer({ isOpen, onClose, animation = "slide-in" }: DrawerProps) {
  return (
    <div
      className="fixed z-40 w-screen bg-black bg-opacity-40 left-0 top-0 flex justify-end animate-fade-in"
      onClick={e => {
        e.stopPropagation();
        onClose && onClose();
      }}>
      <section
        className={cn(
          `top-0 h-screen bg-white w-screen right-0 md:w-80`,
          animation === "slide-in-right"
            ? "animate-slide-in-right"
            : " animate-slide-in"
        )}
        onClick={e => e.stopPropagation()}>

          <Level1/>


        </section>
    </div>
  );
}

export default Drawer;
