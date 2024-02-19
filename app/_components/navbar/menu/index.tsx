import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/app/_lib/hooks";
import { GoChevronLeft } from "react-icons/go";
import ModalContent from "./ModalContent";
import { getBrandsByProductTypeAndGender } from "@/sanity/queries/menu";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import ArleBasicLogo from "../../ArleBasicLogo";

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
        } fixed z-[100] top-0 left-0 transition-all duration-500 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-md`}
      />
      <section
        className={`${
          isMenuOpen ? "right-0" : "-right-[400px]"
        } w-screen fixed top-0 z-[102] max-w-[400px] bottom-0 flex flex-col bg-white transition-all duration-[350ms] ease-out overflow-hidden`}
        ref={menuRef}
      >
        <header className="w-full h-16 border-b border-gray-300 px-4 flex items-center justify-between">
          {currentScreen > 0 ? (
            <button className="flex items-center group" onClick={goBack}>
              <GoChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-500" />
              <span className="text-gray-700 text-base font-semibold font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-600">
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
        <div className={`flex overflow-x-hidden basis-full w-full h-full`}>
          <div
            style={{
              transform: `translateX(-${currentScreen * 100}%)`,
              transition: "transform 0.4s ease-out",
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
              search={true}
            />
          </div>
          <div
            style={{
              transform: `translateX(-${currentScreen * 100}%)`,
              transition: "transform 0.4s ease-out",
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
              search={false}
            />
          </div>
          <div
            style={{
              transform: `translateX(-${currentScreen * 100}%)`,
              transition: "transform 0.4s ease-out",
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
              search={false}
            />
          </div>
        </div>
        <footer className=" w-screen max-w-[400px] h-16 border-t border-stone-300 flex items-center justify-center">
          {currentScreen === 2 ? (
            <div className="w-[5.5rem]">
            <ArleBasicLogo />
          </div>
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
      </section>
    </>
  );
};

export default Menu;
