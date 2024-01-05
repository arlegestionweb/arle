import { getSobreNosotrosContent } from "@/sanity/queries/pages/sobreNosotrosQueries";
import Image from "next/image";

export const dynamic = "force-dynamic";

const Page = async () => {
  const pageContent = await getSobreNosotrosContent();
  console.log(pageContent);
  if (!pageContent) {
    return <main>
      LOADING
    </main>
  }
  return <main className="pt-[70px] md:pt-0">
  {pageContent?.whyWeDoWhatWeDo?.on &&
    <section className="md:h-[40vh] xl:h-[50vh] flex flex-col md:flex-row items-center bg-white">
      <section className="h-[350px] flex relative w-full md:h-full md:w-[50vw] md:max-w-[50%]">
        <Image className="w-[45%] max-w-[260px] drop-shadow-[0_0_8px_rgba(0,0,0,100)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" width={400} height={400} alt="Arle-logo-Complete" src="/logo-footer.svg" />
        {pageContent?.whyWeDoWhatWeDo?.imagenOVideo ?
          <video src={pageContent?.whyWeDoWhatWeDo?.video?.url}></video>
          :
          <Image className=" filter brightness-[70%] w-full object-cover z-0" width={400} height={400} alt={pageContent?.whyWeDoWhatWeDo?.imagen?.alt || ""} src={"https://cdn.sanity.io/images/qhszuxx1/production/a35b6e861900be80c2d11f1dda00c60693c1493e-326x369.png?fm=webp" || ""} />
        }
      </section>
      <section className="p-8 sm:py-11 sm:px-14 md:w-[50vw] md:py-10 md:pl-14 md:pr-14 max-w-3xl">
        <h2>{pageContent?.whyWeDoWhatWeDo?.titulo}</h2>
        <p>{pageContent?.whyWeDoWhatWeDo?.descripcion}</p>
      </section>
    </section>
  }
  {pageContent?.whyUs?.on &&
    <section className="p-8 gap-8 md:py-10 sm:px-14 md:h-[40vh] xl:h-[50vh] flex flex-col md:flex-row items-center justify-center bg-arle-blue text-color-bg-surface-1-default">
      <section className="w-full max-w-3xl">
        <h2>{pageContent?.whyUs?.titulo}</h2>
        <p>{pageContent?.whyUs?.descripcion}</p>
      </section>
      <section className="flex relative justify-start h-[350px] md:h-full w-full max-w-3xl">
        {pageContent?.whyUs?.imagenOVideo ?
          <video src={pageContent?.whyUs?.video?.url}></video>
          :
          <Image className="filter brightness-[70%] w-full object-cover z-0" width={400} height={400} alt={pageContent?.whyUs?.imagen?.alt || ""} src={"https://cdn.sanity.io/images/qhszuxx1/production/a35b6e861900be80c2d11f1dda00c60693c1493e-326x369.png?fm=webp" || ""} />
        }
      </section>
    </section>
  }
  {pageContent?.howWeHelpOurClients?.on &&
    <section className="relative  p-8 gap-8 md:py-10 sm:px-14 md:h-[40vh] xl:h-[50vh] flex flex-col-reverse md:flex-row items-center justify-center overflow-hidden bg-white">
      <Image className="absolute -top-[115px] -left-[130px] md:left-auto md:-right-[135px]" height={300} width={300} alt="Escudo Logo Arle" src="/escudoArle.svg" />
      <section className="flex relative justify-start h-[350px] md:h-full w-full max-w-3xl">
        {pageContent?.howWeHelpOurClients?.imagenOVideo ?
          <video src={pageContent?.howWeHelpOurClients?.video?.url}></video>
          :
          <Image className="filter brightness-[70%] w-full object-cover z-0" width={400} height={400} alt={pageContent?.howWeHelpOurClients?.imagen?.alt || ""} src={"https://cdn.sanity.io/images/qhszuxx1/production/a35b6e861900be80c2d11f1dda00c60693c1493e-326x369.png?fm=webp" || ""} />
        }
      </section>
      <section className="pl-24 md:pl-0 flex w-full max-w-3xl flex-col items-end md:items-start">
        <h2>{pageContent?.howWeHelpOurClients?.titulo}</h2>
        <p className="text-right md:text-left">{pageContent?.howWeHelpOurClients?.descripcion}</p>
      </section>
    </section>
  }
  {pageContent?.whyWeDoWhatWeDo?.on &&
    <section className="md:h-[40vh] xl:h-[50vh] flex flex-col-reverse md:flex-row items-center justify-end bg-arle-blue text-color-bg-surface-1-default">
      <section className="p-8 sm:py-11 sm:px-14 md:w-[50vw] md:py-10 md:pl-14 md:pr-14 max-w-3xl">
        <h2>{pageContent?.whyWeDoWhatWeDo?.titulo}</h2>
        <p>{pageContent?.whyWeDoWhatWeDo?.descripcion}</p>
      </section>
      <section className="h-[350px] flex relative md:h-full w-full md:w-[50vw] md:max-w-[50%]">
        {pageContent?.whyWeDoWhatWeDo?.imagenOVideo ?
          <video src={pageContent?.whyWeDoWhatWeDo?.video?.url}></video>
          :
          <Image className=" filter brightness-[70%] w-full object-cover z-0" width={400} height={400} alt={pageContent?.whyWeDoWhatWeDo?.imagen?.alt || ""} src={"https://cdn.sanity.io/images/qhszuxx1/production/a35b6e861900be80c2d11f1dda00c60693c1493e-326x369.png?fm=webp" || ""} />
        }
      </section>
    </section>
  }
</main>;
};

export default Page;
