import { getNuestrasSedesContent } from "@/sanity/queries/pages/nuestrasSedesQueries";
import Image from "next/image";
import Map from "./_components/Map";

export const dynamic = "force-dynamic";

const Page = async () => {

  

  const pageContent = await getNuestrasSedesContent();


  if(!pageContent) return null


  const uniqueCities = new Set(pageContent.sedes.map((sede) => sede.ciudad));

  const uniqueCitiesArray = Array.from(uniqueCities);

  console.log(uniqueCitiesArray);

  return (
    <main className="pt-[70px] md:pt-0 bg-white min-h-screen">
      <section className="relative h-[200px] md:h-[250px] xl:h-[300px] overflow-hidden flex items-end justify-center pb-5 bg-[#E5E8ED]">
        <Image className="absolute -top-[80%] sm:h-[450px] sm:-top-[100%] md:h-[600px] md:-top-[110%] lg:h-[800px] lg:-top-[150%] xl:h-[900px] 2xl:h-[1000px] 2xl:-top-[170%] h-[400px] object-cover" width={2000} height={300} src="/arco.svg" alt="arco sede Arle"/>
        <h1 className="w-[50%] max-w-3xl">{pageContent.titulo}</h1>
      </section>
      <section>
        <section>
          {pageContent.sedes.map((item, i) => (
            <article key={i}>
              <Map/>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default Page;