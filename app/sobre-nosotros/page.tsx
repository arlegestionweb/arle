import { getSobreNosotrosContent } from "@/sanity/queries/pages/sobreNosotrosQueries";
import Section from "./_components/Section";
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
  return <main>
    {pageContent?.whyWeDoWhatWeDo?.on &&
      <section className="flex bg-white">
        <section className="flex relative bg-arle-blue h-[400px] w-full">
          <Image className="w-[50%] drop-shadow-[0_0_8px_rgba(0,0,0,100)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" width={400} height={400} alt="Arle-logo-Complete" src="/logo-footer.svg" />
          {pageContent?.whyWeDoWhatWeDo?.imagenOVideo ?
            <video src={pageContent?.whyWeDoWhatWeDo?.video?.url}></video>
            :
            <Image className="filter brightness-75 w-full object-cover z-0" width={400} height={400} alt={pageContent?.whyWeDoWhatWeDo?.imagen?.alt || ""} src={pageContent?.whyWeDoWhatWeDo?.imagen?.url || ""} />
          }
        </section>
        <section className="w-full">
          <h2>{pageContent?.whyWeDoWhatWeDo?.titulo}</h2>
          <p>{pageContent?.whyWeDoWhatWeDo?.descripcion}</p>
        </section>
      </section>
    }
  </main>;
};

export default Page;
