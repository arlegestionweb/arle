import { cn } from "@/app/_lib/utils";
import React from "react";
import { HiChevronLeft } from "react-icons/hi2";

type LayoutProps = {
  volver?: () => void;
  isOpen?: boolean;
  isMenuClose?: boolean;
  children: React.ReactNode;
};

const Layout = ({ volver, isOpen, isMenuClose, children }: LayoutProps) => {
  return (
    <section
      className={cn(
        "fixed top-0  h-screen duration-500 transition-all w-screen lg:w-80 bg-color-bg-surface-1-default shadow-2xl",
        ["right-[150%]", isOpen && isMenuClose ? "right-0" : "right-[-150%]"]
      )}>
      <header className="p-4 h-16 flex items-center border-b border-stone-300">
        <h4
          className="cursor-pointer text-black text-base font-medium font-inter leading-[21px] flex items-center gap-1"
          onClick={() => volver && volver()}>
          <HiChevronLeft size={20} />
          Volver
        </h4>
      </header>
      <section className="pl-6 pr-4 lg:px-4 flex flex-col">{children}</section>
    </section>
  );
};

export default Layout;
