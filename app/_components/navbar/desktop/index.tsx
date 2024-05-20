import Link from "next/link";
import SubMenuDesktop from "./SubMenuDesktop";
import Burger from "../Burger";
import { Suspense, useState } from "react";
import SearchInput from "../SearchInput";
import RedDot from "../../RedDot";
import { useCartStore } from "../../cart/store";
import { LuShoppingCart } from "react-icons/lu";
import Menu from "../menu";
import ArleBasicLogo from "../../ArleBasicLogo";
import { getAllBrands } from "@/sanity/queries/menu";

type NavDesktopProps = {
  className?: string;
  marca?: string | null;
};

const DesktopNavBar = ({ className, marca }: NavDesktopProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isCartOpen, toggleCart, items } = useCartStore();

  return (
    <nav className={className}>
      <section
        className={`w-full flex fixed z-50 top-0 h-[53px] px-8 justify-center bg-background border-b border-zinc-200`}
      >
        <section className="w-full flex h-full justify-between items-center max-w-screen-xl">
          <Link href={"/"} className="h-fit self-center">
          <div className="w-[85px]">
          <ArleBasicLogo />
        </div>
          </Link>
          <Suspense>
            <SearchInput />
          </Suspense>
          <section className="flex gap-5 ">
            <Link href={'/'} className=" px-2 justify-center items-center gap-2 flex">
              <div className="justify-center items-center gap-2.5 flex">
                <div className="text-gray-700 font-inter text-base font-medium">Home</div>
              </div>
            </Link>

            <button
              type="button"
              className="px-3 py-1.5 relative bg-color-bg-surface-0-default justify-center items-center gap-2 flex"
              onClick={() => toggleCart()}
            >
              <LuShoppingCart className="w-[18px] h-[18px] stroke-gray-600" />
              <span className="text-gray-600 text-base font-medium">
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
            <Menu isMenuOpen={isNavOpen} setIsMenu={setIsNavOpen} marca={marca} />
          </section>
        </section>
      </section>
      <section className="relative z-30">
        <Suspense>
          <SubMenuDesktop marca={marca} />
        </Suspense>
      </section>
    </nav>
  );
};

export default DesktopNavBar;
