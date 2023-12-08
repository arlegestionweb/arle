import { getNuestrasSedesContent } from "@/sanity/queries/pages/nuestrasSedesQueries";

export const dynamic = "force-dynamic";

const Page = async () => {

  const pageContent = await getNuestrasSedesContent();

  console.log({pageContent})
  return (
    <main>
      {pageContent?.titulo}
    </main>
  );
}

export default Page;