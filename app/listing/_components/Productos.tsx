import Link from "next/link";
import ProductCard from "../../_components/listingsPage/ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";

const Productos = ({ productos }: { productos: TProduct[] }) => {
  return (
    <div>
      {productos?.map((producto) => (
        <Link href={`${producto.slug}`} key={producto.slug}>
          <ProductCard producto={producto} />
        </Link>
      ))}
    </div>
  );
};

export default Productos;
