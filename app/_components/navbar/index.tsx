import DesktopNavBar from "./desktop";
import MobileNavBar from "./NavMobile";

const Navbar = () => {
  return (
    <>
      <MobileNavBar className="fixed w-screen md:hidden"/>
      <DesktopNavBar className="hidden  w-screen md:block"/>
    </>
  );
};

export default Navbar;
