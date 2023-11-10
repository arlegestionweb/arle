import Link from "next/link";
import ProductCard from "../../_components/listingsPage/ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";

const Productos = ({ productos }: { productos: TProduct[] }) => {
  return (
    <div className="bg-slate-400 grid grid-cols-4 gap-y-6 gap-x-4">
      {productos?.map((producto) => (
        <Link href={`${producto.slug}`} key={producto.slug}>
          <ProductCard producto={producto} />
        </Link>
      ))}
    </div>
  );
};

export default Productos;
