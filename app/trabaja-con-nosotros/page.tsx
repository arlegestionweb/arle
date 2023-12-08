import { getTrabajaConNosotrosContent } from "@/sanity/queries/pages/trabajaConNosotrosQueries";

export const dynamic = "force-dynamic";

const Page = async () => {

  const pageContent = await getTrabajaConNosotrosContent();
  
  console.log({pageContent})

  return (
    <main>
      {pageContent?.titulo}
    </main>
  );
}

export default Page;