import { getProductById } from "@/sanity/queries/pages/productPage";
import GafaLujo from "./_components/gafas/Lujo";
import GafaPremium from "./_components/gafas/Premium";
import PerfumeLujo from "./_components/perfumes/Lujo";
import PerfumePremium from "./_components/perfumes/Premium";
import RelojLujo from "./_components/relojes/Lujo";
import RelojPremium from "./_components/relojes/Premium";

export const dynamic = 'force-dynamic'

type TPageProps = {
  params: {
    type:
      | "perfumeLujo"
      | "perfumePremium"
      | "relojesPremium"
      | "relojesLujo"
      | "gafasLujo"
      | "gafasPremium";
    brand: string;
    model: string;
    id: string;
  };
};


const ProductPage = async ({ params }: TPageProps) => {
  const product = await getProductById(params.id, params.type);

  
  return (
    <main className="min-h-screen bg-background flex flex-col justify-center items-center">
      {params.type === "gafasLujo" && <GafaLujo product={product} />}
      {params.type === "gafasPremium" && <GafaPremium product={product} />}
      {params.type === "perfumeLujo" && <PerfumeLujo product={product}/>}
      {params.type === "perfumePremium" && <PerfumePremium product={product}/>}
      {params.type === "relojesPremium" && <RelojPremium product={product}/>}
      {params.type === "relojesLujo" && <RelojLujo product={product}/>}
    </main>
  );
};

export default ProductPage;
