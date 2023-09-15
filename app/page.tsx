import { getHomepageContent } from "@/sanity/queries/pages/homepageQuery";

const Home = async function () {
  const pageContent = await getHomepageContent();
  console.log(pageContent);
  return (
    <main className="min-h-screen grid place-content-center">
      <h1 className="font-bold text-4xl">Hello Arlé world!!</h1>
    </main>
  );
};

export default Home;
