import Image from "next/image";
import Link from "next/link";
import SubMenuDesktop from "./SubMenuDesktop";
import Burger from "../Burger";
import { useState } from "react";
import SearchInput from "../SearchInput";
import RedDot from "../../RedDot";
import { useCartStore } from "../../cart/store";
import { LuShoppingCart } from "react-icons/lu";
import Menu from "../menu";

type NavDesktopProps = {
  className?: string;
};

const DesktopNavBar = ({ className }: NavDesktopProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isCartOpen, toggleCart, items } = useCartStore();

  return (
    <nav className={className}>
      <section
        className={`w-full flex fixed z-30 top-0 h-[60px] px-8 justify-center bg-background border-b border-zinc-200`}
      >
        <section className="w-full flex h-full py-3 justify-between max-w-screen-xl">

        <Link href={"/"} className="h-fit self-center">
          <Image src={"/ArleBasicLogo.svg"} width={80} height={30} alt="logo" />
        </Link>

        <SearchInput />

        <section className="flex gap-5 ">
          <Link href={'/'} className=" px-2 justify-center items-center gap-2 flex">
            <div className="justify-center items-center gap-2.5 flex">
              <div className="text-black text-base font-medium leading-normal">Home</div>
            </div>
          </Link> 
          
          <button
            type="button"
            className="px-3 py-1.5 relative bg-color-bg-surface-0-default justify-center items-center gap-2 flex"
            onClick={() => toggleCart()}
          >
            <LuShoppingCart className="w-[18px] h-[18px]" />
            <span className="text-neutral-600 text-base font-medium leading-normal">
              Carrito
            </span>
            <RedDot active={items.length > 0} />
          </button>
          <Burger
            isNavOpen={isNavOpen}
            barColor="bg-[#5D5A88]"
            openNav={() => setIsNavOpen(true)}
            closeNav={() => setIsNavOpen(false)}
          />
          <Menu isMenuOpen={isNavOpen} setIsMenu={setIsNavOpen} />

          {/* <MenuDrawer
            isOpen={isNavOpen}
            animation="right"
            onClose={() => setIsNavOpen(!isNavOpen)}
          /> */}
        </section>
      </section>
      </section>
      <section className="relative z-10">
        <SubMenuDesktop />
      </section>
    </nav>
  );
};

export default DesktopNavBar;
