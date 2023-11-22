import { TGafaLujo } from "@/sanity/queries/pages/types";

type TGafaLujoProps = {
  product: TGafaLujo;
};

const GafaLujo = ({product}: TGafaLujoProps) => {
  
  return (
    <div>
      <h1>{product.marca} {product.modelo}</h1>
    </div>
  );
};

export default GafaLujo;