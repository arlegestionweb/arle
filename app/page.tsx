import { getHomepageContent } from "@/sanity/queries/pages/homepageQuery";
import Banner from "./_components/Banner";

const Home = async function () {
  const pageContent = await getHomepageContent();
  console.log(pageContent);
  
  const exploreSections = [pageContent.perfumes, pageContent.relojes, pageContent.gafas]

  return (
    <main>
      <Banner banners={pageContent.banners}></Banner>
    </main>
  );
};

export default Home;
