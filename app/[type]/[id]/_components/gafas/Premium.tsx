import { TGafaPremium } from "@/sanity/queries/pages/types";

type TGafaPremiumProps = {
  product: TGafaPremium;
};

const GafaPremium = ({product}: TGafaPremiumProps) => {
  return (
    <div>
      <h1>{product.marca} {product.modelo}</h1>
    </div>
  );
};

export default GafaPremium;