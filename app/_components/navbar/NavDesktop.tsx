
type NavDesktopProps = {
    className?: string;
};

const DesktopNavBar = ({className}:NavDesktopProps) => {
  return <nav className={`${className}`}>NavDesktop</nav>;
};

export default DesktopNavBar;
