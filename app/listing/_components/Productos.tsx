import ProductCard from "./ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";

const Productos = ({ productos }: { productos: TProduct[]}) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(4,minmax(128px,288px))] place-content-center gap-y-6 gap-x-4 ">
      {productos?.map((producto) => (
        <li key={producto.slug} className="relative pb-6 w-full justify-between flex flex-col gap-4">
          <ProductCard producto={producto}/>
        </li>
      ))}
    </ul>
  );
};

export default Productos;