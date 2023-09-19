import { getHomepageContent } from "@/sanity/queries/pages/homepageQuery";
import Banner from "./_components/Banner";
import ExploreSection from "./_components/ExploreSection";

const Home = async function () {
  const pageContent = await getHomepageContent();
  console.log(pageContent);
  
  const exploreSections = [pageContent.perfumes, pageContent.relojes, pageContent.gafas]

  return (
    <main>
      <Banner banners={pageContent.banners}/>
      {exploreSections.map((section, index) => (
        <ExploreSection key={index} section={section} />
      ))}
      
    </main>
  );
};

export default Home;
