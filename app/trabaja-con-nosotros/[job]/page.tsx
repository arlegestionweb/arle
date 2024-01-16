import { getJobByTitle } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic";

const Page = async ({params}: { params: { job: string }}) => {


    const trabajo = await getJobByTitle(params?.job);

    if (!trabajo) return null
  
    return (
    <main className="px-8 sm:px-14 relative pt-[70px] md:pt-0 bg-white min-h-screen overflow-hidden flex justify-center">
      <section className="relative py-5 gap-5 md:gap-8 w-full flex flex-col max-w-screen-lg">
        <Link href="/trabaja-con-nosotros">{`< Volver`}</Link>
        <Image className="-right-[70px] md:-right-[120px] w-[250px] md:w-[350px] top-[20px] absolute md:top-0" width={400} height={380} alt="isoLogo de Arle" src="/isoLogo.svg"/>
        <h1>{trabajo.titulo}</h1>
        <section>
          <p>{`Sede: ${trabajo.sede.nombre} - ${trabajo.sede.city}`}</p>
          <p>{`Experiencia: ${trabajo.experience}`}</p>
          <p>{`Habilidades: ${trabajo.skills}`}</p>
          <p>{`Modalidad: ${trabajo.modality}`}</p>
          <p>{`Salario: ${trabajo.salary}`}</p>
        </section>
        <section className="flex flex-col gap-3">
          <h2>Acerca del trabajo</h2>
          <PortableText value={trabajo.aboutJob}/>
        </section>
        <button >Aplicar</button>
      </section>
          {/* <section className={`z-10 fixed top-[20%] w-[80%] h-[70%] bg-black`}>
            <button onClick={()=>setJobModal(false)}>X</button>
            Este es el modal          
          </section> */}
    </main>
  );
}

export default Page;