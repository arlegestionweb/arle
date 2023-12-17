import { TRelojLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";

type TRelojLujoProps = {
  product: TRelojLujo;
};

const RelojLujo = ({product}: TRelojLujoProps) => {
  console.log(product);
  
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