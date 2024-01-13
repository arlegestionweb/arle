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
      <section>
        <Image className="w-full" width={1000} height={500} alt={pageContent?.imagen?.alt || ""} src={pageContent?.imagen?.url || ""}/>
        <section className="w-full bg-[#E5E8ED]">
          <h1>{pageContent?.titulo}</h1>
          <h3>{pageContent?.descripcion}</h3>
          <aside>
            <button>Area: todas</button>
            <button>Sede: todas</button>
          </aside>
        </section>
      </section>
      <ul>
        {pageContent?.jobs?.map((item,i) => (
          <li key={i}>
            <h2>{item?.titulo}</h2>
            <p>{item?.modality}</p>
            <p>{`Sede: ${item?.sede?.nombre} - ${item?.sede?.city}`}</p>
            <Link href={`/trabaja-con-nosotros/${toKebabCase(item?.titulo)}`}>Ver más</Link>
          </li>
        ))}
      </ul>
      

      {/* <Link href={}> </Link> */}
    </main>
  );
}

export default Page;