"use client";
import Image from "next/image";
import Burger from "./Burger";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RedDot from "../RedDot";
import { FiShoppingCart, FiSearch } from "react-icons/fi";

type MobileNavBarProps = {
  className?: string;
};

const MobileNavBar = ({ className }: MobileNavBarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.includes("admin")) return;

  return (
    <nav
      className={`${className} h-[70px] w-full px-[24px] bg-white text-black flex justify-between items-center`}
    >
      <Image src={"/arlé-logo.png"} width={76} height={22} alt="logo" />
      <div className="flex relative items-center gap-5 w-fit">
        <MobileSearch />
        <Kart />
        <Burger
          isNavOpen={isNavOpen}
          barColor="bg-[#5D5A88]"
          onClickHandler={() => setIsNavOpen(!isNavOpen)}
        />
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

const MobileSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    // if (isSearchOpen) {
    inputRef.current?.focus();
    // }
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div
      className={`${
        isSearchOpen ? "w-32" : "w-10"
      } h-10 relative cursor-pointer`}
    >
      <div
        className={` ${
          isSearchOpen
            ? "border-black pl-8 pr-4 w-full"
            : "w-10 border-gray-300"
        } h-10 left-0 top-0  bg-white rounded-full border  flex items-center `}
      >
        {/* {isSearchOpen && ( */}
        <input
          className={`${isSearchOpen ? "w-full" : "w-0"} focus:outline-none`}
          value={searchText}
          ref={inputRef}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
        />
        {/* )} */}
      </div>
      <div className="w-[19.20px] h-[19.20px] px-[1.60px] pt-[1.31px] pb-[1.89px] left-[10.40px] top-[10.40px] absolute justify-center items-center inline-flex">
        <div className="w-4 h-4 relative">
          <FiSearch onClick={onClickHandler} />
        </div>
      </div>
    </div>
  );
};
