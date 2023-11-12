import { TProduct } from "@/sanity/queries/pages/productPage";

type TPerfumePremiumProps = {
  product: TProduct;
};

const PerfumePremium = ({product}: TPerfumePremiumProps) => {
  return (
    <div>
      <h1>Perfume Premium</h1>
    </div>
  );
};


export default PerfumePremium;