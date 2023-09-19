import { getHomepageContent } from "@/sanity/queries/pages/homepageQuery";
import Banner from "./_components/homepage/Banner";
import ExploreSection from "./_components/homepage/ExploreSection";
import Colecciones from "./_components/Colecciones";
import AboutArle from "./_components/homepage/AboutArle";

const Home = async function () {
  const pageContent = await getHomepageContent();
  console.log(pageContent);

  const exploreSections = [
    pageContent.perfumes,
    pageContent.relojes,
    pageContent.gafas,
  ];

  return (
    <main>
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
      <AboutArle/>
      
    </main>
  );
};

export default Home;
