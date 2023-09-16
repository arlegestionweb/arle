"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const subMenu = [
  {
    title: "Perfumes",
    link: "/perfumes",
  },
  {
    title: "Relojes",
    link: "/relojes",
  },
  {
    title: "Gafas",
    link: "/gafas",
  },
  {
    title: "Destacados",
    link: "/",
  },
];

const SubMenuDesktop = () => {
  const pathname = usePathname();

  return (
    <section className="flex mt-[60px] h-[52px] px-8 py-2 gap-3 bg-background items-center">
      {subMenu.map(item => (
        <Link
          href={item.link}
          key={item.title}
          className={`px-3 py-1.5 flex justify-center items-center 
                    ${item.link == pathname ? "border border-black" : ""}`}>
          <p className="text-black font-medium">{item.title}</p>
        </Link>
      ))}
    </section>
  );
};

export default SubMenuDesktop;
