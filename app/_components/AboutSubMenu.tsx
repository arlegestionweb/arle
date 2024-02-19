"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: 'Sobre Nosotros',
    href: '/sobre-nosotros'
  },
  {
    title: 'Nuestras Sedes',
    href: '/nuestras-sedes'
  },
  {
    title: 'Trabaja con Nosotros',
    href: '/trabaja-con-nosotros'
  }
]


const AboutSubMenu = () => {
  const pathname = usePathname();


  return (
    <nav className="h-[36px] bg-gray-100 px-2 xs:default-paddings w-full overflow-x-scroll scrollbar-hide flex justify-center">
      <ul className="flex items-center h-full w-full max-w-screen-xl ">
        {menuItems.map((item, index) => (
          <li key={index} className={` font-inter text-xs xs:text-sm font-medium hover:text-gray-500 whitespace-nowrap tracking-tight px-1.5 ${pathname === item.href ? "border-b-2 border-gray-800 text-gray-800" : "border-b-2 border-gray-400 text-gray-400"}`}>
            <Link href={item.href}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default AboutSubMenu;