import React, { useEffect, useState } from "react";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import SearchInput from "../SearchInput";
import Button from "../../Button";
import Layout from "./Layout";
import { MenuItem } from "../../types";
import Drawer from "../../Drawer";
import Link from "next/link";
import { getBrandsByProductTypeAndGender } from "@/sanity/queries/menu";

type DrawerProps = {
  isOpen?: boolean;
  onClose?: (callback?: () => void) => void;
  animation?: "right" | "left";
};

const productTypes = [
  { label: "Perfumes", param: "type=perfume"},
  { label: "Relojes", param: "type=reloj" },
  { label: "Gafas", param: "type=gafa" },
];

const genders = [
  { label: "Hombre", param: "gender=hombre" },
  { label: "Mujer", param: "gender=mujer" },
  { label: "Unisex", param: "gender=unisex" },
];

const brands = [
  { label: "Brand 1", param: "marcas=brand1" },
  { label: "Brand 2", param: "marcas=brand2" },
  // add more brands here
];

export type TProductType = "perfume" | "reloj" | "gafa";

export type TGender = "hombre" | "mujer" | "unisex";

function MenuDrawer({ isOpen, onClose, animation = "right" }: DrawerProps) {
  const [menuBrands, setMenuBrands] = useState<string[]>([]);
  console.log({menuBrands})
  const items: MenuItem = {
    label: "Productos",
    title: "Productos",
    href: "/listing",
  subMenu: productTypes.map(productType => ({
      param: `${productType.param}`,
      label: productType.label,
      title: productType.label,
      subMenu: genders.map(gender => ({
        param: gender.param,
        label: gender.label,
        title: `${productType.label} ${gender.label}`,
        subMenu: menuBrands.map(brand => ({
          param: `marcas=${brand}`,
          label: brand,
          title: `${productType.label} ${gender.label} ${brand}`,
        })),
      })),
    })),
  };

  const [menu, setMenu] = useState<MenuItem>(items);
  const [menuStack, setMenuStack] = useState<MenuItem[]>([menu]);
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  useEffect(() => {
    const fetchBrands = async () => {
      if (menuStack.length < 3) return;
      console.log({menuStack})
      const productType = menuStack[1]?.param?.split("=")[1] as TProductType;
      const gender = menuStack[2]?.param?.split("=")[1] as TGender;


      const newBrands = await getBrandsByProductTypeAndGender(productType, gender)
      console.log({productType, gender, menuStack, newBrands})

      if (!newBrands) return;
      if (newBrands.length === 0) return;

      setMenuBrands(newBrands);
      const updatedMenu = { ...menu };
      const productTypeItem = updatedMenu?.subMenu?.find(item => item.param === `${productType.param}`);
      const genderItem = productTypeItem?.subMenu.find(item => item.param === gender.param);
  
      if (genderItem) {
        genderItem.subMenu = newBrands.map(brand => ({
          param: `marcas=${brand}`,
          label: brand,
          title: `${productType.label} ${gender.label} ${brand}`,
        }));
      }
  
      setMenu(updatedMenu);
    }

    fetchBrands();
  }, [menuStack])
  const handleItemClick = (item: MenuItem) => {
    if (item.subMenu) {
      setCurrentLevel(currentLevel + 1);
      setMenuStack([...menuStack, item]);

      setMenu(item);
    }
  };

  const handleBack = () => {
    // Regresar al menú anterior (nivel anterior)
    if (currentLevel > 0 && menuStack) {
      setMenu(menuStack[currentLevel - 1]);
      setMenuStack(menuStack.slice(0, currentLevel));
      setCurrentLevel(currentLevel - 1);
    }
  };



  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={(callback) => {
          onClose && onClose();
          callback && callback();
        }}
        animation={animation}>
        <section className="pl-4 md:px-0 grow flex flex-col gap-3 ">
          <header className="p-6 h-16 flex items-center border-b border-stone-300">
            <h4 className="text-zinc-800 text-xl font-bold font-inter leading-normal">
              Menú
            </h4>
          </header>
          <section className="px-6 flex flex-col gap-3">
            <div className="w-full ">
              <SearchInput className="w-full" />
            </div>
            <section className="">
              <h5 className="text-zinc-800 text-lg font-medium font-inter leading-snug">
                Productos
              </h5>
              <ul>
                {items.subMenu &&
                  (items.subMenu as MenuItem[]).map((item, index) => (
                    <li
                      key={index}
                      className="cursor-pointer h-9 py-3 text-zinc-800 font-inter leading-tight"
                      onClick={() => handleItemClick(item)}>
                      {item.label}
                    </li>
                  ))}
              </ul>
            </section>
            <section className="py-3">
              {/* //TODO: link */}
              <p className="text-zinc-800 font-inter leading-tight">
                Acerca de ARLÉ
              </p>
            </section>
            {/* //TODO: Link */}
            <Button className="text-black font-medium">
              Pure White Cologne
            </Button>
          </section>
        </section>

        <Layout volver={handleBack} isOpen={currentLevel > 0} isMenuClose={isOpen}>
          <h5 className="py-3 text-zinc-800 text-lg font-medium font-inter leading-snug">
            {menuStack[1] && (menuStack[1].title || menuStack[1].label)}
          </h5>
          <SubMenu
            items={menuStack[1] && [...(menuStack[1].subMenu as MenuItem[])]}
            handleItemClick={handleItemClick}></SubMenu>
        </Layout>

        <Layout volver={handleBack} isOpen={currentLevel > 1} isMenuClose={isOpen}>
          <h5 className="py-3 text-zinc-800 text-lg font-medium font-inter leading-snug">
            {menu.title || menu.label}
          </h5>
          <SubMenu
            items={menu?.subMenu as MenuItem[]}
            handleItemClick={handleItemClick}
            Icon={() => <HiMiniArrowUpRight size={20} />}
            isLink={true}
          />
        </Layout>
      </Drawer>
    </>
  );
}

const SubMenu = ({
  items,
  handleItemClick,
  Icon,
  isLink = false,
}: {
  items: MenuItem[];
  handleItemClick: (item: MenuItem) => void;
  Icon?: React.FC;
  isLink?: boolean;
}) => {
  return (
    <ul className="h-2.5">
      {items?.map((item, index) => (
        <li
          key={index}
          className="cursor-pointer h-9 py-3 text-zinc-800 font-inter leading-tight flex gap-2 items-center"
          onClick={() => handleItemClick(item)}>
          {Icon && <Icon />}
          {isLink ? <Link href={`/listing?marcas=${item.label.toLowerCase()}`}>{item.label}</Link> : (
            <span>{item.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuDrawer;
