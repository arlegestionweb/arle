import Image from "next/image";
import Link from "next/link";
import SubMenuDesktop from "./SubMenuDesktop";
import Burger from "../Burger";
import { useState } from "react";
import MenuDrawer from "../menuDrawer";
import SearchInput from "../SearchInput";
import { useCartStore } from "../../cart";

type NavDesktopProps = {
  className?: string;
};

const DesktopNavBar = ({ className }: NavDesktopProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {isCartOpen, toggleCart} = useCartStore();

  return (
    <nav className={className}>
      <section
        className={`w-full flex fixed z-30 top-0 h-[60px] px-8 py-3 justify-between bg-background border-b border-zinc-200`}>
        <Link href={'/'} className="h-fit self-center">
          <Image src={"/arlé-logo.png"} width={76} height={22} alt="logo" />
        </Link>

        <SearchInput />

        <section className="flex gap-5 ">
          <Link href={'/'} className=" px-2 justify-center items-center gap-2 flex">
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-black text-base font-medium leading-normal">Home</div>
            </div>
          </Link> 
          <Link href={'/'} className=" px-2 justify-center items-center gap-2 flex">
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-black text-base font-medium leading-normal">About</div>
            </div>
          </Link>  
          <Link href={'/'} className="px-3 py-1.5 bg-color-bg-surface-0-default justify-center items-center gap-2 flex">
            <div className="w-4 h-4 justify-center items-center gap-1 flex">
              <div className="w-4 h-4 relative"></div>
            </div>
            <div className="justify-center items-center gap-2.5 flex" onClick={() => toggleCart()}>
              <div className="text-neutral-600 text-base font-medium leading-normal">Carrito de compras</div>
            </div>
          </Link>
          <Burger
            isNavOpen={isNavOpen}
            barColor="bg-[#5D5A88]"
            onClickHandler={() => setIsNavOpen(!isNavOpen)}
          />    
          <MenuDrawer isOpen={isNavOpen} animation="right" onClose={()=>setIsNavOpen(!isNavOpen)}/>
        </section>
      </section>
      <section className="relative z-10">

        <SubMenuDesktop />
      </section>
    </nav>
  );
};

export default DesktopNavBar;

