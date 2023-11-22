import { TRelojPremium } from "@/sanity/queries/pages/types";

type TRelojPremiumProps = {
  product: TRelojPremium;
};

const RelojPremium = ({product}: TRelojPremiumProps) => {

  return (
    <div>
      <h1>{product.marca} {product.modelo}</h1>
    </div>
  );
};


export default RelojPremium;