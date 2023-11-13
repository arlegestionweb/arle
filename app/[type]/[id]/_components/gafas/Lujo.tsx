import { TProduct } from "@/sanity/queries/pages/productPage/zodSchemas.ts/productPage";

type TGafaLujoProps = {
  product: TProduct;
};

const GafaLujo = ({product}: TGafaLujoProps) => {
  return (
    <div>
      <h1>Gafa Lujo</h1>
    </div>
  );
};

export default GafaLujo;