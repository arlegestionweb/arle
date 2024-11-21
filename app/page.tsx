import { getHomepageContent } from "@/sanity/queries/pages/homepageQuery";
import HeroBanner from "./_components/homepage/HeroBanner";
import ExploreSection from "./_components/homepage/ExploreSection";
import Colecciones from "./_components/Colecciones";
import AboutArle from "./_components/homepage/AboutArle";
import Asesoria from "./_components/homepage/Asesoria";

const Home = async function ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const pageContent = await getHomepageContent();

  if (!pageContent) return null;

  const exploreSections = [
    pageContent.perfumes,
    pageContent.gafas,
    pageContent.relojes,
  ];
  
  return (
    <main className="relative z-10 lg:mb-[100vh] pt-[87px] md:pt-0 bg-white">
      <HeroBanner content={pageContent.hero} searchParams={searchParams} />
      {exploreSections.map((section, index) => (
        <ExploreSection key={index + section.titulo} section={section} />
      ))}
      {pageContent.colecciones && pageContent.colecciones.length > 0 && (
        <Colecciones colecciones={pageContent.colecciones} />
      )}
      <AboutArle sobre={pageContent.sobre} />
      <Asesoria content={pageContent.asesoria} />
    </main>
  );
};

export default Home;
