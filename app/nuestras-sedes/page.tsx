import { getNuestrasSedesContent } from "@/sanity/queries/pages/nuestrasSedesQueries";
import Map from "./_components/Map";
import Link from "next/link";
import { toKebabCase } from "@/utils/helpers";
import Main from "../_components/Main";
import { Metadata } from "next";
import AboutSubMenu from "../_components/AboutSubMenu";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ARLÉ | Nuestras Sedes",
};

const Page = async () => {
  const pageContent = await getNuestrasSedesContent();

  if (!pageContent) return null;

  const uniqueCities = new Set(pageContent.sedes.map((sede) => sede.ciudad));
  const uniqueCitiesArray = Array.from(uniqueCities);

  return (
    <Main extraClasses="bg-white md:mt-[53px] min-h-screen flex flex-col">
      <AboutSubMenu />
      <section className="flex w-full">
        <section className="relative pb-8 flex flex-col w-full h-fit overflow-hidden items-center">
          <header className="relative w-full z-10 h-[200px] md:h-[250px] xl:h-[280px] overflow-hidden flex flex-col justify-end items-center pb-3 bg-[#E5E8ED]">
            <img
              className="absolute -top-[90%] sm:h-[450px] sm:-top-[100%] md:h-[600px] md:-top-[110%] lg:h-[800px] lg:-top-[170%] xl:h-[900px] xl:-top-[160%] 2xl:h-[1000px] 2xl:-top-[180%] h-[400px] object-cover z-0"
              width={2000}
              height={300}
              src="/arco.svg"
              alt="arco sede Arle"
            />
            <h1 className="z-10 font-jomolhari tracking-tight leading-snug text-2xl xs:text-3xl text-gray-800 text-center max-w-[235px] xs:max-w-[280px] lg:max-w-md lg:text-5xl">
              {pageContent.titulo}
            </h1>
            <h2 className="z-10 font-tajawal font-light tracking-tight leading-none mt-1 text-xl xs:text-2xl text-center text-gray-700 ">
              {pageContent.subtitulo}
            </h2>
          </header>
          <img
            className="absolute z-0 h-[1500px] max-w-[1500px] -top-[40%] md:-top-[25%] object-cover"
            width={1500}
            height={1500}
            alt="Escudo de Arle"
            src="/escudoInverso.svg"
          />
          {uniqueCitiesArray &&
            uniqueCitiesArray.map((city, i) => (
              <section
                className="w-full max-w-screen-xl px-8 sm:px-14 md:px-20 pt-5 flex flex-col gap-3 z-10 items-center"
                key={i}
              >
                <h2 className="font-jomolhari text-2xl lg:text-3xl pb-3">
                  {city}
                </h2>
                <section className=" gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full ">
                  {pageContent.sedes
                    .filter((sede) => sede.ciudad === city)
                    .map((item) => (
                      <article
                        className="justify-self-center w-full bg-white border border-[#E6E1E6] flex md:flex-col max-w-md"
                        key={item.nombre}
                      >
                        <img
                          className="w-[40%] sm:w-[35%] h-full md:w-full md:h-[250px] object-cover"
                          height={200}
                          width={200}
                          src={`${item.imagenes[0].url}?fit=max&q=75&w=200&h=200&fm=webp`}
                          alt={`imagen de Sede de Arle ${item.nombre} - ${item.ciudad}`}
                        />
                        <section className="flex flex-col justify-end p-5 gap-1.5 w-full">
                          <h3 className="font-tajawal font-bold text-lg leading-none md:leading-none md:text-xl text-gray-800">
                            {item.nombre}
                          </h3>
                          <p className="font-tajawal font-light text-md  leading-none text-gray-800">
                            {item.direccion}
                          </p>
                          <p className="font-tajawal font-light text-md  leading-none text-gray-600">
                            {item.local}
                          </p>
                          <Link
                            className="dark-button"
                            href={`/nuestras-sedes/${toKebabCase(item.nombre)}`}
                          >
                            Ver más
                          </Link>
                        </section>
                      </article>
                    ))}
                </section>
              </section>
            ))}
        </section>
      </section>
      <section className="bg-[#E5E8ED] z-10 p-5 gap-2 h-[400px] md:h-[450px] w-full flex flex-col">
        <h3 className="ml-4 font-jomolhari text-2xl pb-3">
          Encuentra tu sede más cercana:
        </h3>
        <Map />
      </section>
    </Main>
  );
};

export default Page;
