import { TGafaLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";

type TGafaLujoProps = {
  product: TGafaLujo;
};

const GafaLujo = ({ product }: TGafaLujoProps) => {
  return (
    <>
      <HeroProduct
        product={product}
        images={product.variantes[0].imagenes}
      />
    </>
  );
};

export default GafaLujo;
