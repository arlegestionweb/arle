import DesktopNavBar from "./NavDesktop";
import MobileNavBar from "./NavMobile";

const Navbar = () => {
  return (
    <>
      <MobileNavBar className="md:hidden"/>
      <DesktopNavBar className="hidden md:block"/>
    </>
  );
};

export default Navbar;
