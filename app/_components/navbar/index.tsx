"use client"
import { usePathname } from "next/navigation";
import DesktopNavBar from "./desktop";
import MobileNavBar from "./NavMobile";

const Navbar = ({marca}: {marca?: string | null}) => {
  const pathname = usePathname()

  if (pathname.includes("admin")) return;
  return (
    <>
      <MobileNavBar marca={marca} className="fixed w-full md:hidden" />
      <DesktopNavBar marca={marca} className="hidden w-full md:block" />
    </>
  );
};

export default Navbar;
