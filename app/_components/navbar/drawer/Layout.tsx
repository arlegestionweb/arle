import React from "react";

type LayoutProps = {
  volver?: () => void;
  children: React.ReactNode;
};

const Layout = ({ volver, children }: LayoutProps) => {
  return (
    <section className="fixed animate-slide-in-right top-0 h-screen w-80 bg-white">
      <header className="p-4 h-16 flex items-center border-b border-stone-300">
        <h4
          className="cursor-pointer text-black text-base font-medium font-inter leading-[21px]"
          onClick={() => volver && volver()}>
          Volver
        </h4>
      </header>
      <section className="px-4 flex flex-col gap-3">{children}</section>
    </section>
  );
};

export default Layout;
