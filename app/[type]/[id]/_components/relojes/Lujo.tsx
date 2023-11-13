import { TProduct } from "@/sanity/queries/pages/productPage/zodSchemas.ts/productPage";

type TRelojLujoProps = {
  product: TProduct;
};

const RelojLujo = ({product}: TRelojLujoProps) => {
  
  return (
    <div>
      <h1>{product.marca} {product.modelo}</h1>
    </div>
  );
};


export default RelojLujo;