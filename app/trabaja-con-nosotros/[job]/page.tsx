import {
  getJobByTitle,
  getTrabajaConNosotrosContent,
} from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Main from "@/app/_components/Main";
import { GoChevronLeft } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { PiCoins, PiSuitcaseSimple } from "react-icons/pi";
import { MdChecklistRtl } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";

const Page = async ({ params }: { params: { job: string } }) => {
  const trabajo = await getJobByTitle(params?.job);
  const pageContent = await getTrabajaConNosotrosContent();

  if (!trabajo) return null;

  return (
    <Main extraClasses="bg-white flex flex-col min-h-screen md:mt-[53px] default-paddings">
      <section className="relative py-5 gap-5 md:gap-8 w-full flex flex-col max-w-screen-xl">
        <Link
          href="/trabaja-con-nosotros"
          className="flex items-center -ml-1 mb-3 group"
        >
          <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
          <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
            Volver
          </span>
        </Link>
        <img
          className="-z-10 -right-[70px] md:-right-[120px] w-[200px] md:w-[350px] top-[5px] absolute md:top-0"
          width={400}
          height={380}
          alt="isoLogo de Arle"
          src="/isoLogo.svg"
        />
        <h1 className="about-title">{trabajo.titulo}</h1>
        <section className="flex flex-col text-gray-600 gap-1.5">
          <p className="about-text flex gap-2">
            <IoLocationOutline className="text-lg" />
            {`Sede: ${trabajo.sede.nombre} - ${trabajo.sede.ciudad}`}
          </p>
          <p className="about-text flex gap-2">
            <PiSuitcaseSimple className="text-lg" />
            {`Experiencia: ${trabajo.experience}`}
          </p>
          <div className="about-text">
            <div className="flex items-center gap-2">
              <MdChecklistRtl className="text-lg" />
              <span>Habilidades:</span>
            </div>
            <ul className="pl-8 list-disc">
              {trabajo.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <p className="about-text flex gap-2">
            <FaRegClock className="text-base" />
            {`Modalidad: ${trabajo.modality}`}
          </p>
          <p className="about-text flex gap-2">
            <PiCoins className="text-lg" />
            {`Salario: ${trabajo.salary}`}
          </p>
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="font-jomolhari tracking-tight leading-snug text-xl xs:text-2xl text-gray-700">
            Acerca del trabajo:
          </h2>
          <div className="portable-text flex flex-col gap-0.5">
            <PortableText value={trabajo.aboutJob} />
          </div>
        </section>
        <Link
          href={`mailto:${
            pageContent?.email || "selecciongrupoarle@gmail.com"
          }?Subject=Aplicación trabajo: ${trabajo.titulo}`}
          className="dark-button"
        >
          Aplicar
        </Link>
      </section>
      {/* <section className={`z-10 fixed top-[20%] w-[80%] h-[70%] bg-black`}>
            <button onClick={()=>setJobModal(false)}>X</button>
            Este es el modal          
          </section> */}
    </Main>
  );
};

export default Page;
