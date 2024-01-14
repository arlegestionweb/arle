import { getTrabajaConNosotrosContent } from "@/sanity/queries/pages/trabajaConNosotrosQueries";
import { toKebabCase } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Page = async () => {

  const pageContent = await getTrabajaConNosotrosContent();
  
  console.log({pageContent})

  return (
    <main className="pt-[70px] md:pt-0 min-h-screen bg-white">
        <Image className="w-full h-[200px] md:h-[300px] 2xl:h-[350px] object-cover" width={1000} height={500} alt={pageContent?.imagen?.alt || ""} src={pageContent?.imagen?.url || ""}/>
      <section className="flex w-full bg-[#E5E8ED] justify-center">
        <section className="py-6 px-8 sm:px-14 lg:py-14 gap-5 flex flex-col max-w-screen-lg w-full">
          <h1>{pageContent?.titulo}</h1>
          <h3>{pageContent?.descripcion}</h3>
          <aside>
            <button>Area: todas</button>
            <button>Sede: todas</button>
          </aside>
        </section>
      </section>
      <ul className="py-6 px-8 sm:px-14 gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
        {pageContent?.jobs?.map((item,i) => (
          <li className=" border border-[#E6E1E6] p-4 flex flex-col gap-2" key={i}>
            <h2>{item?.titulo}</h2>
            <p>{item?.modality}</p>
            <p>{`Sede: ${item?.sede?.nombre} - ${item?.sede?.city}`}</p>
            <Link className="w-full" href={`/trabaja-con-nosotros/${toKebabCase(item?.titulo)}`}>Ver más</Link>
          </li>
        ))}
      </ul>
      

      {/* <Link href={}> </Link> */}
    </main>
  );
}

export default Page;