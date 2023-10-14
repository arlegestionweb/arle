import React, { useState } from "react";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import SearchInput from "../SearchInput";
import Button from "../../Button";
import Layout from "./Layout";

type DrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
  animation?: "slide-in" | "slide-in-right";
};

interface MenuItem {
  label: string;
  subMenu?: MenuItem[] | MenuItem;
}

const items: MenuItem = {
  label: "Productos",
  subMenu: [
    {
      label: "Perfumes",
      subMenu: [
        {
          label: "Hombre",
          subMenu: [
            {
              label: "Perfume Hombre",
            },
          ],
        },
        {
          label: "Mujer",
          subMenu: [
            {
              label: "Perfume Mujer",
            },
          ],
        },
      ],
    },
    {
      label: "Relojes",
      subMenu: [
        {
          label: "Hombre",
          subMenu: [
            {
              label: "Reloj Hombre",
            },
          ],
        },
        {
          label: "Mujer",
          subMenu: [
            {
              label: "Reloj Mujer",
            },
          ],
        },
      ],
    },
    {
      label: "Gafas",
      subMenu: [
        {
          label: "Hombre",
          subMenu: [
            {
              label: "Gafas Hombre",
            },
          ],
        },
        {
          label: "Mujer",
          subMenu: [
            {
              label: "Gafas Mujer",
            },
          ],
        },
      ],
    },
  ],
};

function Drawer({ isOpen, onClose, animation = "slide-in" }: DrawerProps) {
  const [menu, setMenu] = useState<MenuItem>(items);
  const [MenuStack, setMenuStack] = useState<MenuItem[]>([menu]);
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  const handleItemClick = (item: MenuItem) => {
    if (item.subMenu) {
      setCurrentLevel(currentLevel + 1);
      setMenuStack([...MenuStack, item]);

      setMenu(item);
    } else {
      // TODO: si no hay submenu, hacer algo
      console.log(`Hiciste clic en: ${item.label}`);
    }
  };

  const handleBack = () => {
    // Regresar al menú anterior (nivel anterior)
    if (currentLevel > 0 && MenuStack) {
      setMenu(MenuStack[currentLevel - 1]);
      setMenuStack(MenuStack.slice(0, currentLevel));
      setCurrentLevel(currentLevel - 1);
    }
  };

  return (
    <section
      className="fixed z-40 w-screen bg-black bg-opacity-40 left-0 top-0 flex justify-end animate-fade-in"
      onClick={e => {
        e.stopPropagation();
        onClose && onClose();
      }}>
      <section
        className="top-0 h-screen bg-white w-screen right-0 md:w-80 animate-slide-in lg:animate-slide-in-right"
        onClick={e => e.stopPropagation()}>
        {/* Seccion inicial */}

        <section className="grow flex flex-col gap-3">
          <header className="p-4 h-16 flex items-center border-b border-stone-300">
            <h4 className="text-zinc-800 text-xl font-bold font-inter leading-normal">
              Menú
            </h4>
          </header>
          <section className="px-4 flex flex-col gap-3">
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

        {/* Levels  */}
        {currentLevel > 0 && (
          <Layout volver={handleBack}>
            <h5 className="py-3 text-zinc-800 text-lg font-medium font-inter leading-snug">
              {MenuStack[1] && MenuStack[1].label}
            </h5>
            <SubMenu
              items={MenuStack[1] && [...(MenuStack[1].subMenu as MenuItem[])]}
              handleItemClick={handleItemClick}></SubMenu>
          </Layout>
        )}

        {currentLevel > 1 && (
          <Layout volver={handleBack}>
            <h5 className="py-3 text-zinc-800 text-lg font-medium font-inter leading-snug">
              {menu.label}
            </h5>
            <SubMenu
              items={menu?.subMenu as MenuItem[]}
              handleItemClick={handleItemClick}
              Icon={() => <HiMiniArrowUpRight size={20} />}
            />
          </Layout>
        )}
      </section>
    </section>
  );
}

const SubMenu = ({
  items,
  handleItemClick,
  Icon,
}: {
  items: MenuItem[];
  handleItemClick: (item: MenuItem) => void;
  Icon?: React.FC;
}) => {
  return (
      <ul className="h-2.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer h-9 py-3 text-zinc-800 font-inter leading-tight flex gap-2 items-center"
            onClick={() => handleItemClick(item)}>
            {Icon && <Icon />}
            {item.label}
          </li>
        ))}
      </ul>
  );
};

export default Drawer;
