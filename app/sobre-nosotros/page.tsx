import { getSobreNosotrosContent } from "@/sanity/queries/pages/sobreNosotrosQueries";
import Image from "next/image";
import Main from "../_components/Main";
import { Metadata } from "next";
import AboutSubMenu from "../_components/AboutSubMenu";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Arlé | Sobre Nosotros',
}

const Page = async () => {
  const pageContent = await getSobreNosotrosContent();
  if (!pageContent) {
    return <main>
      LOADING
    </main>
  }

  return (
    <Main extraClasses="md:mt-[53px] ">
      <AboutSubMenu />
      {pageContent?.whyWeDoWhatWeDo?.on &&
        <section className="flex min-h-20 h- flex-col md:flex-row items-center bg-white">
          <section className="relative h-full w-full md:w-1/2">
            <Image className="w-[45%] max-w-[260px] drop-shadow-[0_0_8px_rgba(0,0,0,100)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 object-cover" width={400} height={400} alt="Arle-logo-Complete" src="/logo-footer.svg" />
            {pageContent?.whyWeDoWhatWeDo?.imagenOVideo ?
              <video src={pageContent?.whyWeDoWhatWeDo?.video?.url}></video>
              :
              <Image className="h-full filter brightness-[70%] w-full object-cover" width={400} height={400} alt={pageContent?.whyWeDoWhatWeDo?.imagen?.alt || ""} src={pageContent?.whyWeDoWhatWeDo?.imagen?.url || ""} />
            }
          </section>
          <section className="p-8 sm:py-11 sm:px-14 w-full md:w-[50vw] md:py-10 md:pl-14 md:pr-14 max-w-3xl">
            <h2 className="about-title">{pageContent?.whyWeDoWhatWeDo?.titulo}</h2>
            <p className="about-text mt-4">{pageContent?.whyWeDoWhatWeDo?.descripcion}</p>
          </section>
        </section>
      }
      {pageContent?.whyUs?.on &&
        <section className="p-8 gap-8 md:py-10 sm:px-14  flex flex-col md:flex-row items-center justify-center bg-arle-blue text-color-bg-surface-1-default">
          <section className="w-full max-w-3xl">
            <h2 className="about-title-white">{pageContent?.whyUs?.titulo}</h2>
            <p className="about-text-white mt-4">{pageContent?.whyUs?.descripcion}</p>
          </section>
          <section className="flex relative justify-start h-[350px] md:h-full w-full max-w-3xl">
            {pageContent?.whyUs?.imagenOVideo ?
              <video src={pageContent?.whyUs?.video?.url}></video>
              :
              <Image className="filter brightness-[70%] w-full object-cover z-0" width={400} height={400} alt={pageContent?.whyUs?.imagen?.alt || ""} src={pageContent?.whyUs?.imagen?.url || ""} />
            }
          </section>
        </section>
      }
      {pageContent?.howWeHelpOurClients?.on &&
        <section className="relative  p-8 gap-8 md:py-10 sm:px-14 flex flex-col-reverse md:flex-row items-center justify-center overflow-hidden bg-white">
          <section className="flex relative justify-start h-[350px] md:h-full w-full max-w-3xl">
            {pageContent?.howWeHelpOurClients?.imagenOVideo ?
              <video src={pageContent?.howWeHelpOurClients?.video?.url}></video>
              :
              <Image className="filter brightness-[70%] w-full object-cover z-0" width={400} height={400} alt={pageContent?.howWeHelpOurClients?.imagen?.alt || ""} src={pageContent?.howWeHelpOurClients?.imagen?.url || ""} />
            }
          </section>
          <Image className="w-[215px] h-[215px] sm:w-[300px] sm:h-[300px] xl:h-[350px] xl:w-[350px] absolute object-contain -top-[85px] -left-[80px] md:left-auto md:-right-[155px] lg:-right-[100px] xl:-right-[50px] opacity-70" height={300} width={300} alt="Escudo Logo Arle" src="/escudoArle.svg" />
          <section className=" flex w-full max-w-3xl flex-col items-end md:items-start">
            <h2 className="max-w-[200px] xs:max-w-[300px] about-title whitespace-pre-wrap text-right md:text-left">{pageContent?.howWeHelpOurClients?.titulo}</h2>
            <p className="max-w-[310px] xs:max-w-[400px] about-text mt-4 text-right md:text-left">{pageContent?.howWeHelpOurClients?.descripcion}</p>
          </section>
        </section>
      }
      {pageContent?.ourStory?.on &&
        <section className="flex flex-col-reverse md:flex-row items-center justify-end bg-arle-blue text-color-bg-surface-1-default">
          <section className="p-8 sm:py-11 sm:px-14 md:w-[50vw] md:py-10 md:pl-14 md:pr-14 max-w-3xl">
            <h2 className="about-title-white">{pageContent?.ourStory?.titulo}</h2>
            <p className="about-text-white mt-4">{pageContent?.ourStory?.descripcion}</p>
          </section>
          <section className="h-[350px] flex relative md:h-full w-full md:w-[50vw] md:max-w-[50%]">
            {pageContent?.ourStory?.imagenOVideo ?
              <video src={pageContent?.ourStory?.video?.url}></video>
              :
              <Image className=" filter brightness-[70%] w-full max-h-[500px] object-cover z-0" width={400} height={400} alt={pageContent?.ourStory?.imagen?.alt || ""} src={pageContent?.ourStory?.imagen?.url || ""} />
            }
          </section>
        </section>
      }
      {pageContent?.marcasAliadas &&
        <section className="flex flex-col bg-white items-center gap-8 p-8 sm:py-11 sm:px-14 md:pt-10 md:pb-20">
          <h2 className="about-title">Nuestras Marcas Aliadas</h2>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(4,minmax(128px,288px))] place-items-center gap-y-6 gap-x-4 items-center justify-center">
            {pageContent?.marcasAliadas?.map((item, i) => (
              <article key={i} className="w-40">
                <Image className="object-cover" width={200} height={200} alt={`marca ${item?.titulo} logo`} src={item?.logo?.url} />
              </article>
            ))}
          </section>
        </section>
      }
      <section className="w-full p-5 flex justify-center">
      <Link
          className="dark-button z-10"
          href="/listing"
        >
          Explora nuestros productos
        </Link>
      </section>
    </Main>

  );
};

export default Page;
