import { getSiteSettings } from "@/sanity/queries/siteSettings";
import { PortableText } from "@portabletext/react";


const Page = async ({ params }: { params: { type: string } }) => {

  const siteSettings = await getSiteSettings();

return(
    <section className="flex flex-col gap-3">
            {params.type}
            {siteSettings?.legal && (
                <PortableText value={siteSettings?.legal?.garantiasCambiosDevoluciones} />
                )}
    </section>
)
}

export default Page;