import { TProduct } from "@/sanity/queries/pages/productPage";

type TPerfumeLujoProps = {
  product: TProduct;
};

const PerfumeLujo = ({product}: TPerfumeLujoProps) => {
  return (
    <div>
      <h1>Perfume Lujo</h1>
    </div>
  );
};

export default PerfumeLujo;