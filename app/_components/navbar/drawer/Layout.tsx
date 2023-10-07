import React from "react";
import { HiChevronLeft } from "react-icons/hi2";

type LayoutProps = {
  volver?: () => void;
  children: React.ReactNode;
};

const Layout = ({ volver, children }: LayoutProps) => {
  return (
    <section className={"fixed animate-slide-in lg:animate-slide-in-right top-0 h-screen w-screen lg:w-80 bg-white shadow-2xl"}>
      <header className="p-4 h-16 flex items-center border-b border-stone-300">
        <h4
          className="cursor-pointer text-black text-base font-medium font-inter leading-[21px] flex items-center gap-1"
          onClick={() => volver && volver()}>
          <HiChevronLeft size={20}/>
          Volver
        </h4>
      </header>
      <section className="px-4 flex flex-col">{children}</section>
    </section>
  );
};

export default Layout;
