import ProductCard from "../../_components/listingsPage/ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";

const Productos = ({productos}: {
  productos:  TProduct[];
}) => {

  // console.log({productos})
  return (
    <div>
      {productos?.map(producto => (
        <ProductCard producto={producto} key={producto.slug} />
      ))}
    </div>
  );
}

export default Productos;