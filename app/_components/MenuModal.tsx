import { useHideBodyOverflow } from "../_lib/hooks";

const MenuModal = ({ isMenuOpen, children, closeMenu, side = "left" }: {
  isMenuOpen: boolean;
  children: React.ReactNode;
  closeMenu?: () => void;
  side?: "left" | "right";
}) => {


  useHideBodyOverflow(isMenuOpen);
  const sideClass = side === "left" ? "items-start" : "items-end";


  return (
    <div
      className={`${isMenuOpen ? "w-screen" : "w-0"
        } fixed z-[100] top-[0px] ${sideClass} left-0 transition-all h-screen bg-black bg-opacity-50 flex flex-col`}
    >

      {children}
    </div>

  );
}

export default MenuModal;