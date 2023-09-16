import DesktopNavBar from "./NavDesktop";
import MobileNavBar from "./NavMobile";

const Navbar = () => {
  return (
    <>
      <MobileNavBar className="fixed w-screen md:hidden"/>
      <DesktopNavBar className="hidden fixed w-screen md:flex"/>
    </>
  );
};

export default Navbar;
