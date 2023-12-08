import { getSobreNosotrosContent } from "@/sanity/queries/pages/sobreNosotrosQueries";

export const dynamic = "force-dynamic";

const Page = async () => {
  const pageContent = await getSobreNosotrosContent();

  console.log(pageContent);

  
  return <main>{pageContent?.titulo}</main>;
};

export default Page;
