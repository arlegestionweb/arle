import { TPerfumePremium } from "@/sanity/queries/pages/types";

type TPerfumePremiumProps = {
  product: TPerfumePremium;
};

const PerfumePremium = ({product}: TPerfumePremiumProps) => {
  console.log({product});
  
  return (
    <div>
      <h1>{product.marca} {product.titulo}</h1>
    </div>
  );
};


export default PerfumePremium;