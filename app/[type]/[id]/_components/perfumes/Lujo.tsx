import { TPerfumeLujo } from "@/sanity/queries/pages/types";

type TPerfumeLujoProps = {
  product: TPerfumeLujo;
};

const PerfumeLujo = ({product}: TPerfumeLujoProps) => {

  return (
    <div>
      <h1>{product.marca} {product.titulo}</h1>
    </div>
  );
};

export default PerfumeLujo;