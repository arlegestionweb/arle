import MenuModal from "../../MenuModal";
import { IoCloseSharp } from "react-icons/io5";
import { useRef } from "react";
import { useClickOutside } from "@/app/_lib/hooks";

const Menu = ({ isMenuOpen, setIsMenu }: {
  isMenuOpen: boolean;
  setIsMenu: (arg0: boolean) => void;
}) => {
  const menuRef = useRef(null);

  const closeMenu = () => setIsMenu(false);
  useClickOutside(menuRef, closeMenu);


  return (
    <MenuModal isMenuOpen={isMenuOpen} closeMenu={closeMenu} side="right" >
      <aside
        ref={menuRef}
        className={`${isMenuOpen ? "" : "hidden"
          } w-[80vw] max-w-[400px] h-screen bg-white flex-col relative overflow-y-scroll`}
      >
        <header className="w-full border-b border-stone-300 h-16 p-4 flex items-center justify-between">
          <h1 className="grow shrink basis-0 text-zinc-800 text-xl font-bold font-tajawal leading-normal">Menú</h1>
          <IoCloseSharp className="cursor-pointer w-5 h-5" onClick={() => setIsMenu(false)} />
        </header>
      </aside>
    </MenuModal>
  );
}

export default Menu;