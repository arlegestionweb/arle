"use client"
import { usePathname } from "next/navigation";
import DesktopNavBar from "./desktop";
import MobileNavBar from "./NavMobile";

const Navbar = () => {
  const pathname = usePathname()

  if (pathname.includes("admin")) return;
  return (
    <>
      <MobileNavBar className="fixed max-w-screen md:hidden"/>
      <DesktopNavBar className="hidden max-w-screen md:block bg-color-bg-surface-0-default"/>
    </>
  );
};

export default Navbar;
