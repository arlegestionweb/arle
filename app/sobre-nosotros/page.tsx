import { getSobreNosotrosContent } from "@/sanity/queries/pages/sobreNosotrosQueries";

export const dynamic = "force-dynamic";

const Page = async () => {
  const pageContent = await getSobreNosotrosContent();

  console.log(pageContent);


  return <main>
    <h1>Hola mundito</h1>
    {pageContent?.titulo}
  </main>;
};

export default Page;
