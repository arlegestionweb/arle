import { getSedeByTitle } from "@/sanity/queries/pages/nuestrasSedesQueries";

export const dynamic = "force-dynamic";

const Page = async ({params}: { params: { sede: string }}) => {

    const sede = await getSedeByTitle(params?.sede);
    
    if(!sede) return null;

    return(
        <>{sede.map}</>
    )

}

export default Page;