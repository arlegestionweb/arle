import { getProductById } from "@/sanity/queries/pages/productPage";
import Product from "./_components/Product";
import Main from "@/app/_components/Main";
import { getRecommendedProducts } from "@/sanity/queries/pages/listingQueries";
import { unstable_noStore } from "next/cache";

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
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ProductPage = async ({ params, searchParams }: TPageProps) => {
  unstable_noStore();
  const { product, discount } = await getProductById(params.id, params.type);
  const recommendedProducts = await getRecommendedProducts();
  return (
    <Main extraClasses="pt-[50px] md:pt-[53px] lg:mb-[100vh] min-h-screen bg-background flex flex-col justify-center items-center">
      <Product params={params} searchParams={searchParams} product={product} discount={discount} recommendedProducts={recommendedProducts?.productos || []} />
    </Main>
  );
};

export default ProductPage;
