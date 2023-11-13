import { TProduct } from "@/sanity/queries/pages/productPage/zodSchemas.ts/productPage";

type TGafaPremiumProps = {
  product: TProduct;
};

const GafaPremium = ({product}: TGafaPremiumProps) => {
  return (
    <div>
      <h1>Gafa Premium</h1>
    </div>
  );
};

export default GafaPremium;