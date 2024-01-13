import { getJobByTitle } from "@/sanity/queries/pages/trabajaConNosotrosQueries";

export const dynamic = "force-dynamic";

const Page = async ({params}: { params: { job: string }}) => {

    const trabajo = await getJobByTitle(params?.job);

    console.log(trabajo)
    if (!trabajo) return null
  
    return (
    <main>
        {trabajo.experience}
        dinamico papá
    </main>
  );
}

export default Page;