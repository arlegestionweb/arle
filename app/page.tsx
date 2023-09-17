import { getHomepageContent } from "@/sanity/queries/pages/homepageQuery";
<<<<<<< HEAD
=======
import Banner from "./_components/Banner";
import ExploreSection from "./_components/ExploreSection";
>>>>>>> ff9e596 (Add banners to explore product sections)

const Home = async function () {
  const pageContent = await getHomepageContent();
  // console.log(pageContent);
  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-background grid place-content-center">
      <h1 className="font-bold text-4xl">Hello Arlé world!!</h1>
=======
    <main>
      <Banner banners={pageContent.banners}/>
      {exploreSections.map((section, index) => (
        <ExploreSection key={index} section={section} />
      ))}
      
>>>>>>> ff9e596 (Add banners to explore product sections)
    </main>
  );
};

export default Home;
