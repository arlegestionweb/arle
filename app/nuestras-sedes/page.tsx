import { getNuestrasSedesContent } from "@/sanity/queries/pages/nuestrasSedesQueries";
import Image from "next/image";
import Map from "./_components/Map";
import Link from "next/link";
import { toKebabCase } from "@/utils/helpers";

export const dynamic = "force-dynamic";

const Page = async () => {

  

  const pageContent = await getNuestrasSedesContent();


  
  
  if(!pageContent) return null
  
  const uniqueCities = new Set(pageContent.sedes.map((sede) => sede.ciudad));
  const uniqueCitiesArray = Array.from(uniqueCities);
  
  return (
    <main className="pt-[70px] md:pt-0 bg-white h-screen md:h-[calc(100vh-110px)] flex flex-col overflow-hidden relative">
      <section className="flex w-full overflow-y-scroll scrollbar-width-thin">
        <section className="relative pb-8 flex flex-col w-full h-fit overflow-hidden items-center">
          <section className="relative w-full z-10 h-[200px] md:h-[250px] overflow-hidden flex items-end justify-center pb-5 bg-[#E5E8ED]">
            <Image className="absolute -top-[80%] sm:h-[450px] sm:-top-[100%] md:h-[600px] md:-top-[110%] lg:h-[800px] lg:-top-[180%] xl:h-[900px] 2xl:h-[1000px] 2xl:-top-[200%] h-[400px] object-cover" width={2000} height={300} src="/arco.svg" alt="arco sede Arle"/>
            <h1 className="w-[50%] max-w-3xl">{pageContent.titulo}</h1>
          </section>
          <Image className="absolute z-0 h-[110vw] -top-[40%] object-cover" width={2000} height={2000} alt="Escudo de Arle" src="/escudoInverso.svg"/>
          {uniqueCitiesArray && uniqueCitiesArray.map((city, i) => (
            <section className="w-full max-w-screen-xl px-8 sm:px-14 md:px-20 pt-8 flex flex-col gap-3 z-10 items-center">
            <h2>{city}</h2>
            <section className="gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full" key={i}>
              {pageContent.sedes.filter((sede) => sede.ciudad === city).map((item, i) => (
                <article className="w-full bg-white border border-[#E6E1E6] flex md:flex-col" key={i}>
                  <Image className="w-[100px] h-full md:w-full md:h-[250px] object-cover" height={200} width={200} src={item.imagenes[0].url} alt={`imagen de Sede de Arle ${item.nombre} - ${item.ciudad}`} />
                  <section className="flex flex-col gap-2 p-5">
                  <p>{item.nombre}</p>
                  <p>{item.direccion}</p>
                  <p>{item.local}</p>
                  <Link className="w-full flex justify-center p-1 bg-black text-white" href={`/nuestras-sedes/${toKebabCase(item.nombre)}`}>Ver más</Link>
                  </section>
                </article>
              ))}
            </section>
            </section>
          ))}
        </section>
      </section>
      <section className="bg-[#E5E8ED] z-10 p-5 gap-2 h-[60%] w-full shadow-[0_-2px_50px_0_rgba(0,0,0,0.25)] flex flex-col">
        <h3>Encuentra tu sede más cercana:</h3>
        <Map/>
      </section>
    </main>
  );
}

export default Page;