import { getTrabajaConNosotrosContent } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import { toKebabCase } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import Main from "../_components/Main";
import { Metadata } from "next";
import AboutSubMenu from "../_components/AboutSubMenu";
import { PiSuitcaseSimple } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
// import Dropdown from "./_components/Dropdown";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Arlé | Trabaja con Nosotros",
};

const Page = async () => {
  const pageContent = await getTrabajaConNosotrosContent();

  const areasLaborales = Array.from(new Set(pageContent?.jobs?.map((job) => job?.areaLaboral)));

  const sedes = Array.from(new Set(pageContent?.jobs?.map((job) => job?.sede?.nombre)));

  // console.log({areasLaborales, sedes});
  return (
    <Main extraClasses="min-h-screen bg-white md:mt-[53px]">
      <AboutSubMenu />
      <Image
        className="w-full h-[200px] md:h-[300px] 2xl:h-[350px] object-cover"
        width={1000}
        height={500}
        alt={pageContent?.imagen?.alt || ""}
        src={pageContent?.imagen?.url || ""}
      />
      <section className="flex w-full bg-[#E5E8ED] justify-center">
        <section className="py-8 px-8 sm:px-14 lg:py-14 gap-5 flex flex-col max-w-screen-lg w-full">
          <h1 className="about-title">{pageContent?.titulo}</h1>
          <h3 className="about-text -mt-2">{pageContent?.descripcion}</h3>
          <aside className="flex gap-4 flex-wrap">
            {/* <Dropdown items={areasLaborales} /> */}
            <button className="text-sm sm:text-base border flex items-center border-gray-700 py-0.5 px-8 gap-2">
              {" "}
              <PiSuitcaseSimple className="text-lg sm:text-xl" /> Área laboral:
              todas
            </button>
            <button className="text-sm sm:text-base border flex items-center border-gray-700 py-0.5 px-8 gap-2">
              <IoLocationOutline className="text-lg sm:text-xl" /> Sede: todas
            </button>
          </aside>
        </section>
      </section>
      <ul className="py-6 px-8 sm:px-14 gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
        {pageContent?.jobs?.map((item, i) => (
          <li
            className=" border border-[#E6E1E6] p-4 flex flex-col gap-2"
            key={i}
          >
            <h2 className="font-tajawal font-bold text-lg leading-none md:leading-none md:text-xl text-gray-800">
              {item?.titulo}
            </h2>
            <p className="font-tajawal font-light text-md  leading-none text-gray-600">{`Modalidad: ${item?.modality}`}</p>
            <p className="font-tajawal font-light text-md  leading-none text-gray-600">{`Sede: ${item?.sede?.nombre} - ${item?.sede?.ciudad}`}</p>
            <Link
              className="dark-button"
              href={`/trabaja-con-nosotros/${toKebabCase(item?.titulo)}`}
            >
              Ver más
            </Link>
          </li>
        ))}
      </ul>

      {/* <Link href={}> </Link> */}
    </Main>
  );
};

export default Page;
