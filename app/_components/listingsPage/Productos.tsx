import { GafaType, PerfumeLujoType, PerfumePremiumType, RelojType } from "../types";
import ProductCard from "./ProductCard";

const Productos = ({productos}: {
  productos:  (PerfumeLujoType | PerfumePremiumType | RelojType | GafaType)[];
}) => {

  console.log({productos})
  return (
    <div>
      {productos.map(producto => (
        <ProductCard producto={producto} />
      ))}
    </div>
  );
}

export default Productos;