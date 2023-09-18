"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const subMenu = [
  {
    title: "Perfumes",
    link: "/listing?producto=perfume",
  },
  {
    title: "Relojes",
    link: "/listing?producto=relojes",
  },
  {
    title: "Gafas",
    link: "/listing?producto=gafas",
  },
  {
    title: "Destacados",
    link: "/listing",
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
