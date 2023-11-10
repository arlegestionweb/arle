"use client";
import Image from "next/image";
import Burger from "./Burger";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RedDot from "../RedDot";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineEnter } from "react-icons/ai";
import MenuDrawer from "./menuDrawer";

type MobileNavBarProps = {
  className?: string;
};

const MobileNavBar = ({ className }: MobileNavBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("admin")) return;

  return (
    <nav
      className={`${className} fixed z-30 h-[70px] w-full px-[24px] bg-white text-black flex justify-between items-center`}
    >
      <Image src={"/arlé-logo.png"} width={76} height={22} alt="logo" />
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
      <div className="p-2.5 bg-neutral-100 justify-center items-center flex relative">
        <div className="w-4 h-4 justify-center items-center gap-1 flex">
          <div className="w-4 h-4 relative">
            <FiShoppingCart />
          </div>
        </div>
        <RedDot />
      </div>
    </div>
  );
};


