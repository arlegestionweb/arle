import { getTrabajaConNosotrosContent } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import { toKebabCase } from "@/utils/helpers";
import Link from "next/link";
import Main from "../_components/Main";
import { Metadata } from "next";
import AboutSubMenu from "../_components/AboutSubMenu";
import { TDropdownOption } from "../_components/Dropdown";
import WorkWithUsFilters from "./_components/WorkWithUsFilters";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ARLÉ | Trabaja con Nosotros",
};

const Page = async ({searchParams}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const pageContent = await getTrabajaConNosotrosContent();

  const jobs = pageContent?.jobs || [];

  let filteredJobs = jobs;

  const areaLaboralParam = searchParams.areaLaboral;

  const sedeParam = searchParams.sede;

  // Filter the jobs by areaLaboral and sede if they exist

  if (areaLaboralParam) {
    filteredJobs = filteredJobs.filter((job) => job && job.areaLaboral === areaLaboralParam);
  }

  if (sedeParam) {
    filteredJobs = filteredJobs.filter((job) => job && job.sede.nombre === sedeParam);
  }


  const areasLaborales: TDropdownOption[] = jobs
    .map((job) => ({
      label: job?.areaLaboral,
      value: job?.areaLaboral,
      href: "/trabaja-con-nosotros?areaLaboral=" + job?.areaLaboral || "",
    }))
    .filter((option, index, self) =>
      index === self.findIndex((t) => t.label === option.label && t.value === option.value)
    );

  const sedes: TDropdownOption[] = jobs && jobs
    .map((job) => (job && {
      label: job.sede.nombre,
      value: job.sede.nombre,
      href: "/trabaja-con-nosotros?sede=" + job.sede.nombre || "",
    }))
    .filter((option, index, self) =>
      index === self.findIndex((t) => t?.label === option?.label && t?.value === option?.value)
    );

  return (
    <Main extraClasses="min-h-screen bg-white md:mt-[53px]">
      <AboutSubMenu />
      <img
        className="w-full h-[200px] md:h-[300px] 2xl:h-[350px] object-cover"
        width={1000}
        height={500}
        alt={pageContent?.imagen?.alt || ""}
        src={`${pageContent?.imagen?.url}?fit=max&q=85&w=2000&h=1000&fm=webp` || ""}
      />
      <section className="flex w-full bg-[#E5E8ED] justify-center">
        <section className="py-8 px-8 sm:px-14 lg:py-14 gap-5 flex flex-col max-w-screen-lg w-full">
          <h1 className="about-title">{pageContent?.titulo}</h1>
          <h3 className="about-text -mt-2">{pageContent?.descripcion}</h3>
          <WorkWithUsFilters areasLaborales={areasLaborales} sedes={sedes} />
        </section>
      </section>
      {filteredJobs.length > 0 ? (
      <ul className="py-6 px-8 sm:px-14 gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
        {filteredJobs?.map((item, i) => (
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
              href={`/trabaja-con-nosotros/${toKebabCase(item?.titulo || "")}`}
            >
              Ver más
            </Link>
          </li>
        ))}
      </ul>
      ):(
        <p className="font-tajawat font-light text-md default-paddings py-10">
          Lo sentimos. En este momento no tenemos ofertas, pronto estaremos publicando nuevas vacantes.
        </p>
      )}
    </Main>
  );
};

export default Page;
