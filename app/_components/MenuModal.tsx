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
      className={`${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } fixed z-[100] top-[0px] left-0 items-end transition-all duration-300 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm flex flex-col overflow-hidden`}
    >
      {children}
    </div>

  );
}

export default MenuModal;