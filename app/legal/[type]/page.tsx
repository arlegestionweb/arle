import Main from "@/app/_components/Main";
import { TLegalSchema, getSiteSettings } from "@/sanity/queries/siteSettings";
import { PortableText } from "@portabletext/react";

const Page = async ({ params }: { params: { type: keyof TLegalSchema } }) => {
  
  const siteSettings = await getSiteSettings();

  if (!siteSettings?.legal) return null;

  const legalContent = siteSettings.legal[params.type]

  if (!legalContent) return null;

  return (
    <Main>
      <section className="flex flex-col gap-3">
        {siteSettings?.legal &&  params.type in siteSettings.legal && (
          <PortableText value={legalContent}></PortableText>
        )}
      </section>
    </Main>
  );
};

export default Page;
