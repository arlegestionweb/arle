"use client";
import Image from "next/image";
import Burger from "./Burger";
import { useState } from "react";
import { usePathname } from "next/navigation";
import RedDot from "../RedDot";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { useCartStore } from "../cart/store";
import Menu from "./menu";

type MobileNavBarProps = {
  className?: string;
  marca?: string | null;
};

const MobileNavBar = ({ className, marca }: MobileNavBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("admin")) return;

  return (
    <nav
      className={`${className} fixed z-30 h-[50px] w-full px-4 xs:px-8 bg-color-bg-surface-1-default text-black flex justify-between items-center border-b border-zinc-200`}
    >
      <Link href="/">
        <Image src={"/ArleBasicLogo.svg"} width={80} height={30} alt="logo" />
      </Link>
      <div className="flex relative items-center gap-5 w-fit">
        <Kart />
        <Burger
          isNavOpen={isNavOpen}
          barColor="bg-[#5D5A88]"
          openNav={() => setIsNavOpen(true)}
          closeNav={() => setIsNavOpen(false)}
        />

        <Menu marca={marca} isMenuOpen={isNavOpen} setIsMenu={setIsNavOpen} />
      </div>
    </nav>
  );
};

export default MobileNavBar;

const Kart = () => {
  const {toggleCart, items} = useCartStore();
  return (
    <div className="w-fit h-9 justify-start items-center gap-4 inline-flex cursor-pointer" onClick={() => toggleCart()}>
      <div className="p-2 bg-color-bg-surface-0-default justify-center items-center flex relative">
        <div className="w-5 h-5 justify-center items-center gap-1 flex">
            <LuShoppingCart className="w-[18px] h-[18px] stroke-gray-600" />
        </div>
        <RedDot  active={items.length > 0} position="topRight"/>
      </div>
    </div>
  );
};


