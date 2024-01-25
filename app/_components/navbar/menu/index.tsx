import MenuModal from "../../MenuModal";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/app/_lib/hooks";
import SearchInput from "../SearchInput";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import Button from "../../Button";
import ModalContent from "./ModalContent";
import { getBrandsByProductTypeAndGender } from "@/sanity/queries/menu";
import { TGender, TProductType } from "../menuDrawer";

type Item = {
  name: string;
}

const firstScreenItems: Item[] = [
  { name: "perfumes" },
  { name: "relojes" },
  { name: "gafas" },
]

const secondScreenItems: Item[] = [
  { name: "mujer" },
  { name: "hombre" },
  { name: "unisex" },
  { name: "todos" }
]

const Menu = ({ isMenuOpen, setIsMenu }: {
  isMenuOpen: boolean;
  setIsMenu: (arg0: boolean) => void;
}) => {

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [thirdScreenItems, setThirdScreenItems] = useState<Item[]>([]);

  // const thirdScreenItems: Item[] = [
  //   { name: "brand 1" },
  //   { name: "brand 2" },
  //   { name: "brand 3" },
  //   { name: "brand 4" }
  // ]

  useEffect(() => {
    if (selectedItems.length <= 1) return;


    const [productType, gender] = selectedItems.map(item => item.name);

    // console.log({ productType, gender })
    const fetchBrands = async () => {
      const brands = await getBrandsByProductTypeAndGender(productType as TProductType, gender as TGender)
      setThirdScreenItems(brands?.map(brand => ({ name: brand })) || [])

    }
    fetchBrands()

  }, [selectedItems])

  const menuRef = useRef(null);

  const closeMenu = () => {
    setSelectedItems([])
    setCurrentScreen(0)
    setIsMenu(false)
  };


  useClickOutside(menuRef, closeMenu);

  const selectItems = (items: Item[]) => {
    setSelectedItems(items);
    setCurrentScreen(currentScreen => currentScreen + 1); // Increment current screen
  };

  const goBack = () => {
    setSelectedItems(selectedItems.slice(0, -1)); // Remove the last item


    setCurrentScreen(currentScreen => currentScreen - 1);

  }

  return (
    <MenuModal isMenuOpen={isMenuOpen} closeMenu={closeMenu} side="right" >
      <div className={`flex overflow-x-hidden w-[80vw] max-w-[400px]`} ref={menuRef}
      // style={{ transform: `translateX(-${currentScreen * 100}%)`, transition: 'transform 0.3s ease-out' }}

      >

        <div style={{ transform: `translateX(-${currentScreen * 100}%)`, transition: 'transform 0.3s ease-out' }}>
          <ModalContent isMenuOpen={isMenuOpen} items={firstScreenItems} setIsMenu={setIsMenu}
            title="Menú" subtitle="Productos" setSelectedItems={selectItems}
          />
        </div>
        <div style={{ transform: `translateX(-${currentScreen * 100}%)`, transition: 'transform 0.3s ease-out' }}>
          <ModalContent onBackButtonClick={goBack} isMenuOpen={isMenuOpen} items={secondScreenItems} setIsMenu={setIsMenu}
            title="Menú" subtitle={selectedItems[0]?.name || "menu"} setSelectedItems={selectItems} withBackButton
          />
        </div>
        <div style={{ transform: `translateX(-${currentScreen * 100}%)`, transition: 'transform 0.3s ease-out' }}>
          <ModalContent onBackButtonClick={goBack} isMenuOpen={isMenuOpen} items={thirdScreenItems} setIsMenu={setIsMenu} withBackButton
            title="Menú" subtitle={selectedItems[1]?.name || "menu"} setSelectedItems={selectItems}
          />
        </div>
      </div>
    </MenuModal >
  );
}

export default Menu;