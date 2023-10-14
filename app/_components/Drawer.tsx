import { useRef } from "react";
import { cn } from "../_lib/utils";

type DrawerProps = {
  isOpen?: boolean;
  onClose?: ( callback?: ()=> void ) => void;
  animation?: "right" | "left";
  children: React.ReactNode | React.ReactNode[];
};

const Drawer = ({
  isOpen,
  onClose,
  animation = "right",
  children,
}: DrawerProps) => {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className={cn(
        "fixed z-40 w-screen bg-black left-0 top-0 flex justify-end transition-all",
        isOpen
          ? "bg-opacity-40 0.2s ease-out"
          : "bg-opacity-0 0.2s ease-out"
      )}
      onClick={e => {
        e.stopPropagation();
        if(!isOpen) ref.current?.classList.add("hidden");
        onClose && onClose(()=>{
        });
      }}>
      <section
        className={cn(
          `top-0 translate-x-[100%] h-screen bg-white w-screen md:w-80`,
          [
            isOpen
              ? "translate-x-0 animate-slide-in-right"
              : "translate-x-[100%] animate-slide-out-right",
          ]
        )}
        onClick={e => e.stopPropagation()}>
        {/* Seccion inicial */}
        {children}
      </section>
    </section>
  );
};

export default Drawer;
