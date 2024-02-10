import MenuModal from "../../MenuModal";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/app/_lib/hooks";
import SearchInput from "../SearchInput";
import Link from "next/link";
import { GoArrowUpRight, GoChevronLeft } from "react-icons/go";
import Button from "../../Button";
import ModalContent from "./ModalContent";
import { getBrandsByProductTypeAndGender } from "@/sanity/queries/menu";
import Image from "next/image";

export type TProductType = "perfume" | "reloj" | "gafa";

export type TGender = "hombre" | "mujer" | "unisex";

const firstScreenItems: Item[] = [
  { name: "perfume" },
  { name: "relojes" },
  { name: "gafas" },
];

const secondScreenItems: Item[] = [
  { name: "mujer" },
  { name: "hombre" },
  { name: "unisex" },
];

type Item = {
  name: string;
};
const Menu = ({
  marca,
  isMenuOpen,
  setIsMenu,
}: {
  marca?: string | null;
  isMenuOpen: boolean;
  setIsMenu: (arg0: boolean) => void;
}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [thirdScreenItems, setThirdScreenItems] = useState<Item[]>([]);

  useEffect(() => {
    if (selectedItems.length <= 1) return;

    const [productType, gender] = selectedItems.map((item) => item.name);

    // console.log({ productType, gender })
    const fetchBrands = async () => {
      const brands = await getBrandsByProductTypeAndGender(
        productType as TProductType,
        gender as TGender
      );
      setThirdScreenItems(brands?.map((brand) => ({ name: brand })) || []);
    };
    fetchBrands();
  }, [selectedItems]);

  const menuRef = useRef(null);

  const closeMenu = () => {
    setSelectedItems([]);
    setCurrentScreen(0);
    setIsMenu(false);
  };

  useClickOutside(menuRef, closeMenu);

  const selectItems = (items: Item[]) => {
    setSelectedItems(items);
    setCurrentScreen((currentScreen) => currentScreen + 1); // Increment current screen
  };

  const goBack = () => {
    setSelectedItems(selectedItems.slice(0, -1)); // Remove the last item

    setCurrentScreen((currentScreen) => currentScreen - 1);
  };

  return (
    <>
      {/* <MenuModal isMenuOpen={isMenuOpen} closeMenu={closeMenu} side="right" /> */}
      <div
        className={`${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } fixed z-[100] top-[0px] left-0 items-end transition-all duration-1000 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md flex flex-col overflow-hidden`}
      />
      <div
        className={`${
          isMenuOpen ? "right-0" : "-right-[400px]"
        } w-screen fixed top-0 items-end z-[102] max-w-[400px] h-screen flex flex-col bg-white transition-all duration-700 overflow-hidden`}
        ref={menuRef}
      >
        <header className="w-full h-16 border-b border-stone-300 px-4 flex items-center justify-between">
          {currentScreen > 0 ? (
            <button className="flex items-center" onClick={goBack}>
              <GoChevronLeft className="w-5 h-5" />
              <span className="text-gray-700 text-base font-semibold font-inter leading-[21px] underline-offset-2 hover:underline hover:text-gray-600">
                Volver
              </span>
            </button>
          ) : (
            <h1 className="ml-3 capitalize text-arle-blue text-base font-semibold font-inter cursor-default">
              Menú
            </h1>
          )}
          <IoCloseSharp
            className="cursor-pointer w-5 h-5"
            onClick={() => setIsMenu(false)}
          />
        </header>
        <div className={`flex overflow-x-hidden w-full`}>
          <div
            style={{
              transform: `translateX(-${currentScreen * 100}%)`,
              transition: "transform 0.45s ease-out",
            }}
          >
            <ModalContent
              marca={marca}
              currentScreen={currentScreen}
              isMenuOpen={isMenuOpen}
              items={firstScreenItems}
              setIsMenu={setIsMenu}
              subtitle="Productos"
              setSelectedItems={selectItems}
              selectedItems={selectedItems}
              bottomSection={true}
            />
          </div>
          <div
            style={{
              transform: `translateX(-${currentScreen * 100}%)`,
              transition: "transform 0.45s ease-out",
            }}
          >
            <ModalContent
              marca={marca}
              currentScreen={currentScreen}
              isMenuOpen={isMenuOpen}
              items={secondScreenItems}
              setIsMenu={setIsMenu}
              subtitle={selectedItems[0]?.name}
              setSelectedItems={selectItems}
              bottomSection={false}
              selectedItems={selectedItems}
            />
          </div>
          <div
            style={{
              transform: `translateX(-${currentScreen * 100}%)`,
              transition: "transform 0.45s ease-out",
            }}
          >
            <ModalContent
              marca={marca}
              currentScreen={currentScreen}
              isMenuOpen={isMenuOpen}
              items={thirdScreenItems}
              setIsMenu={setIsMenu}
              subtitle={selectedItems[1]?.name}
              setSelectedItems={selectItems}
              bottomSection={false}
              selectedItems={selectedItems}
            />
          </div>
        </div>
        <footer className="fixed bottom-0 w-screen max-w-[400px] h-16 border-t border-stone-300 flex items-center justify-center">
          {currentScreen === 2 ? (
            <Image
              className="opacity-80"
              src="/ArleBasicLogo.svg"
              alt="IsoLogo de Arlé"
              width={100}
              height={30}
            />
          ) : (
            <Image
              className="opacity-80"
              src="/isoLogoDark.svg"
              alt="IsoLogo de Arlé"
              width={60}
              height={30}
            />
          )}
        </footer>
      </div>
    </>
  );
};

export default Menu;
