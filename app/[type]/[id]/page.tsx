import { getProductById } from "@/sanity/queries/pages/productPage";
import Product from "./_components/Product";
import { unstable_noStore as noStore } from 'next/cache';
import Main from "@/app/_components/Main";


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
  const { product, discount } = await getProductById(params.id, params.type);

  return (
    <Main extraClasses="pt-[60px] lg:mb-[100vh] min-h-screen bg-background flex flex-col justify-center items-center">
      <Product params={params} product={product} discount={discount} />
    </Main>
  );
};

export default ProductPage;
