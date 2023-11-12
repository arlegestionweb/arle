import { TProduct } from "@/sanity/queries/pages/productPage";

type TRelojPremiumProps = {
  product: TProduct;
};

const RelojPremium = ({product}: TRelojPremiumProps) => {
  return (
    <div>
      <h1>Reloj Premium</h1>
    </div>
  );
};


export default RelojPremium;