import { TRelojLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";

type TRelojLujoProps = {
  product: TRelojLujo;
};

const RelojLujo = ({product}: TRelojLujoProps) => {

  return (
    <>
      <HeroProduct
        product={product}
        images={product.variantes[0].imagenes}
        
      />
    </>
  );
};


export default RelojLujo;