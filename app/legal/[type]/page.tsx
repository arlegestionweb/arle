import Main from "@/app/_components/Main";
import { TLegalSchema, getSiteSettings } from "@/sanity/queries/siteSettings";
import { PortableText } from "@portabletext/react";

const Page = async ({ params }: { params: { type: keyof TLegalSchema } }) => {

  const siteSettings = await getSiteSettings();

  if (!siteSettings?.legal) return null;

  const legalContent = siteSettings.legal[params.type];

  if (!legalContent) return null;

  return (
    <Main extraClasses="min-h-screen bg-white md:mt-[53px] default-paddings flex justify-center">
      <section className="flex flex-col gap-3 w-full max-w-screen-lg">
        <div className="portable-text py-20">
          <PortableText value={legalContent}></PortableText>
        </div>
      </section>
    </Main>
  );
};

export default Page;
