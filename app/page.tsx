import { getHomepageContent } from "@/sanity/queries/pages/homepageQuery";
import HeroBanner from "./_components/homepage/HeroBanner";
import ExploreSection from "./_components/homepage/ExploreSection";
import Colecciones from "./_components/Colecciones";
import AboutArle from "./_components/homepage/AboutArle";
import { unstable_noStore as noStore } from "next/cache";
import Asesoria from "./_components/homepage/Asesoria";

const Home = async function () {
  noStore();
  const pageContent = await getHomepageContent();

  if (!pageContent) return null;

  const exploreSections = [
    pageContent.perfumes,
    pageContent.relojes,
    pageContent.gafas,
  ];

  return (
    <main className="relative z-10 lg:mb-[100vh] pt-[50px] md:pt-0 bg-white">
      <HeroBanner content={pageContent.hero} />
      {exploreSections.map((section, index) => (
        <ExploreSection key={index} section={section} />
      ))}
      <Colecciones colecciones={pageContent.colecciones} />
      <AboutArle sobre={pageContent.sobre} />
      <Asesoria content={pageContent.asesoria} />
    </main>
  );
};

export default Home;
