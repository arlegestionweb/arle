"use client";
import Image from "next/image";
import Burger from "./Burger";
import { useState } from "react";

const MobileNavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="h-[70px] w-full px-[24px] bg-white text-black flex justify-between items-center">
      <Image src={"/arlé-logo.png"} width={76} height={22} alt="logo" />
      <div className="flex items-center gap-5">
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
            <Image
              src="/icons/kart.png"
              layout="fill"
              alt="kart"
              // onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
          </div>
        </div>
        <RedDot />
      </div>
    </div>
  );
};

const RedDot = () => {
  return (
    <div className="absolute -top-1 -left-1">
      <div className="w-2 h-2 relative">
        <div className="w-2 h-2 left-0 top-0 absolute bg-red-700 rounded-full" />
      </div>
    </div>
  );
};

const MobileSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <div
      className={`${
        isSearchOpen ? "w-fit" : "w-10"
      } h-10 relative cursor-pointer`}
    >
      <div
        className={` ${
          isSearchOpen ? "w-fit border-black px-10" : "w-10 border-gray-300"
        } h-10 left-0 top-0  bg-white rounded-full border  flex items-center `}
      >
        {isSearchOpen && (
          <input
            className="focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
          />
        )}
      </div>
      <div className="w-[19.20px] h-[19.20px] px-[1.60px] pt-[1.31px] pb-[1.89px] left-[10.40px] top-[10.40px] absolute justify-center items-center inline-flex">
        <div className="w-4 h-4 relative">
          <Image
            src="/icons/Search.png"
            layout="fill"
            alt="search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
        </div>
      </div>
    </div>
  );
};
