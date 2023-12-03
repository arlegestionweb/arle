import PremiumLayout from "@/app/_components/premium/PremiumLayout";
import { TPerfumePremium } from "@/sanity/queries/pages/types";

type TPerfumePremiumProps = {
  product: TPerfumePremium;
};

const PerfumePremium = ({ product }: TPerfumePremiumProps) => {
  // console.log({product});

  return (
    <PremiumLayout product={product}>
      <>HOASS</>
    </PremiumLayout>
  );
};

export default PerfumePremium;
