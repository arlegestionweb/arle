import { TRelojLujo } from "@/sanity/queries/pages/types";

type TRelojLujoProps = {
  product: TRelojLujo;
};

const RelojLujo = ({product}: TRelojLujoProps) => {
  return (
    <div>
      <h1>{product.marca} {product.modelo}</h1>
    </div>
  );
};


export default RelojLujo;