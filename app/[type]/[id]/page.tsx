import { getProductById } from "@/sanity/queries/pages/productPage";
import Product from "./_components/Product";
import { unstable_noStore as noStore } from 'next/cache';
import TimedDiscount from "./_components/TimedDiscount";


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
    <main className="relative pt-[60px] z-10 lg:mb-[100vh] min-h-screen bg-background flex flex-col justify-center items-center">
      {discount && (
        <TimedDiscount discount={discount} />
      )}
      <Product params={params} product={product} />
    </main>
  );
};

export default ProductPage;
