import ProductCard from "./ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";

const Productos = ({ productos }: { productos: TProduct[]}) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(128px,288px))] place-content-center gap-y-6 gap-x-4 ">
      {productos?.map((producto, i) => (
        <li key={`${producto._id}-${i}`} className="relative pb-6 w-full justify-between flex flex-col gap-1 group">
          <ProductCard producto={producto}/>
        </li>
      ))}
    </ul>
  );
};

export default Productos;