import { getHomepageContent } from "@/sanity/queries/pages/homepageQuery";
import Banner from "./_components/homepage/Banner";
import ExploreSection from "./_components/homepage/ExploreSection";
import Colecciones from "./_components/Colecciones";
import AboutArle from "./_components/homepage/AboutArle";
import Button from "./_components/Button";

const Home = async function () {
  const pageContent = await getHomepageContent();
  console.log(pageContent);

  const exploreSections = [
    pageContent.perfumes,
    pageContent.relojes,
    pageContent.gafas,
  ];

  return (
    <main className="bg-neutral-100">
      <Banner banners={pageContent.banners} />
      {exploreSections.map((section, index) => (
        <ExploreSection
          key={index}
          section={section}
        />
      ))}
      <section className="py-6 md:py-12 bg-neutral-100">
        <Colecciones colecciones={pageContent.colecciones} />
      </section>
      <AboutArle sobre={pageContent.sobre}/>
      <section className="bg-[#EDE7DE] px-4 py-6 md:py-12 flex flex-col justify-center items-center gap-5 md:gap-6">

        <h3 className="text-zinc-800  text-center font-lora text-2xl md:text-[28px] font-semibold leading-[115%]">Eleva tu experiencia con nuestra asesoría</h3>
        <ul className="pl-8 list-disc flex flex-col justify-center md:items-center gap-4 text-zinc-800 text-base font-normal font-raleway leading-tight">
          <li>Asesoramiento personalizado para encontrar el producto perfecto.</li>
          
          <li>Acceso a recomendaciones exclusivas y consejos de expertos.</li>

          <li>Resuelve tus dudas y toma decisiones informadas.</li>

          <li>Experimenta el lujo y la excelencia en cada interacción.</li>

        </ul>
      <Button className="bg-black px-4 py-2 md:w-56"><span className="text-stone-300">Quiero una asesoría</span></Button>
      </section>
    </main>
  );
};

export default Home;
