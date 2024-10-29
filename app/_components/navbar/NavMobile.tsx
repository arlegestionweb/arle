"use client";
import Burger from "./Burger";
import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RedDot from "../RedDot";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { useCartStore } from "../cart/store";
import Menu from "./menu";
import ArleBasicLogo from "../ArleBasicLogo";
import SubMenuDesktop from "./desktop/SubMenuDesktop";
import SearchInput from "./SearchInput";
import { FaBullseye } from "react-icons/fa6";

type MobileNavBarProps = {
  className?: string;
  marca?: string | null;
};

const MobileNavBar = ({ className, marca }: MobileNavBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearching]);
  
  if (pathname.includes("admin")) return null;
  
  return (
    <nav
      className={`${className} fixed z-30 w-full  bg-color-bg-surface-1-default text-black flex flex-col  border-b border-zinc-200`}
    >
      <section className="flex justify-between items-center px-4 xs:px-8 h-[50px] gap-4">
        <Link href="/">
          <div className="w-[85px]">
            <ArleBasicLogo />
          </div>
        </Link>
        <div className="flex relative items-center gap-4 w-full justify-end">
          <div className={`max-w-xs ${isSearching && 'w-full'}`} ref={searchRef} onClick={()=> setIsSearching(true)}>
            <SearchInput className="w-full" mobile mobileOpen={isSearching} />
          </div>
          <div className={`items-center gap-4 ${isSearching ? 'hidden' : 'flex'}`}>
          <Kart />
          <Burger
            isNavOpen={isNavOpen}
            barColor="bg-[#5D5A88]"
            openNav={() => setIsNavOpen(true)}
            closeNav={() => setIsNavOpen(false)}
            />
          </div>

          <Menu marca={marca} isMenuOpen={isNavOpen} setIsMenu={setIsNavOpen} />
        </div>
      </section>
      <section className="relative z-[11] flex w-full m-0 p-0">
          <SubMenuDesktop marca={marca} />
      </section>
    </nav>
  );
};

export default MobileNavBar;

const Kart = () => {
  const { toggleCart, items } = useCartStore();
  return (
    <div
      className="w-fit h-9 justify-start items-center gap-4 inline-flex cursor-pointer"
      onClick={() => toggleCart()}
    >
      <div className="p-2 bg-color-bg-surface-0-default justify-center items-center flex relative">
        <div className="w-5 h-5 justify-center items-center gap-1 flex">
          <LuShoppingCart className="w-[18px] h-[18px] stroke-gray-600" />
        </div>
        <RedDot active={items.length > 0} position="topRight" />
      </div>
    </div>
  );
};
