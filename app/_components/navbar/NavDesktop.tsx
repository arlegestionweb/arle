import Image from "next/image";
import Link from "next/link";
import SearchDesktop from "./SearchDesktop";

type NavDesktopProps = {
  className?: string;
};

const DesktopNavBar = ({ className }: NavDesktopProps) => {
  return (
    <nav
      className={`${className} h-[60px] px-8 py-3 justify-between bg-background border-b border-zinc-200`}>
      <Link href={'/'} className="h-fit self-center">
        <Image src={"/arlé-logo.png"} width={76} height={22} alt="logo" />
      </Link>

      <SearchDesktop/>
      
      <section className="flex gap-5">
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
        <Link href={'/'} className="px-3 py-1.5 bg-neutral-100 justify-center items-center gap-2 flex">
          <div className="w-4 h-4 justify-center items-center gap-1 flex">
            <div className="w-4 h-4 relative"></div>
          </div>
          <div className="justify-center items-center gap-2.5 flex">
            <div className="text-neutral-600 text-base font-medium leading-normal">Kart</div>
          </div>
        </Link> 
      </section>      
    </nav>
  );
};

export default DesktopNavBar;
