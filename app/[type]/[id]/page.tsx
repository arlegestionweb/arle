import { getProductById } from "@/sanity/queries/pages/productPage";
import GafaLujo from "./_components/gafas/Lujo";
import GafaPremium from "./_components/gafas/Premium";
import PerfumeLujo from "./_components/perfumes/Lujo";
import PerfumePremium from "./_components/perfumes/Premium";
import RelojLujo from "./_components/relojes/Lujo";
import RelojPremium from "./_components/relojes/Premium";
import Product from "./_components/Product";
import { unstable_noStore as noStore } from 'next/cache';


export type TParams = {
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

type TPageProps = {
  params: TParams;
};

const ProductPage = async ({ params }: TPageProps) => {
  noStore();
  const product = await getProductById(params.id, params.type);

  return (
    <main className="relative z-10 lg:mb-[100vh] min-h-screen bg-background flex flex-col justify-center items-center">
      <Product params={params} product={product} />
    </main>
  );
};

export default ProductPage;
