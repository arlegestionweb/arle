"use client";
import Image from "next/image";
import Burger from "./Burger";
import { useState } from "react";
import { usePathname } from "next/navigation";
import RedDot from "../RedDot";
import Link from "next/link";
import MenuDrawer from "./menuDrawer";
import { LuShoppingCart } from "react-icons/lu";

type MobileNavBarProps = {
  className?: string;
};

const MobileNavBar = ({ className }: MobileNavBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("admin")) return;

  return (
    <nav
      className={`${className} fixed z-30 h-[60px] w-full px-[24px] bg-color-bg-surface-1-default text-black flex justify-between items-center`}
    >
      <Link href="/">
        <Image src={"/ArleBasicLogo.svg"} width={80} height={30} alt="logo" />
      </Link>
      <div className="flex relative items-center gap-5 w-fit">
        <Kart />
        <Burger
          isNavOpen={isNavOpen}
          barColor="bg-[#5D5A88]"
          onClickHandler={() => setIsNavOpen(!isNavOpen)}
        />
        
        <MenuDrawer isOpen={isNavOpen}/>
      </div>
    </nav>
  );
};

export default MobileNavBar;

const Kart = () => {
  return (
    <div className="w-fit h-9 justify-start items-center gap-4 inline-flex cursor-pointer">
      <div className="p-2 bg-color-bg-surface-0-default justify-center items-center flex relative">
        <div className="w-5 h-5 justify-center items-center gap-1 flex">
            <LuShoppingCart className="w-[18px] h-[18px]" />
        </div>
        <RedDot position="topRight"/>
      </div>
    </div>
  );
};


