"use client"
import { usePathname } from "next/navigation";
import DesktopNavBar from "./desktop";
import MobileNavBar from "./NavMobile";

const Navbar = () => {
  const pathname = usePathname()

  if (pathname.includes("admin")) return;
  return (
    <>
      <MobileNavBar className="fixed w-full md:hidden" />
      <DesktopNavBar className="hidden w-full md:block" />
    </>
  );
};

export default Navbar;
