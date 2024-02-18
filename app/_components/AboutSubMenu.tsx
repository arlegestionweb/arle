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
    <nav className="h-[53px] bg-white w-full overflow-x-scroll pl-8">
      <ul className="flex items-center gap-2 w-fit border-b-2 border-b-gray-400">
        {menuItems.map((item, index) => (
          <li key={index} className={`mb-[-2px] whitespace-nowrap ${pathname === item.href ? "border-b-2 border-black text-black" : "text-gray-400"}`}>
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