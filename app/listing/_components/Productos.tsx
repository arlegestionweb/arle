import Link from "next/link";
import ProductCard from "../../_components/listingsPage/ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";

const Productos = ({ productos }: { productos: TProduct[] }) => {
  return (
    <div className="grid grid-cols-[repeat(2,136px)] lg:grid-cols-[repeat(4,288px)] place-content-center gap-y-6 gap-x-4 ">
      {productos?.map((producto) => (
        <Link href={`${producto.slug}`} key={producto.slug} className="w-full justify-between flex flex-col gap-4">
          <ProductCard producto={producto} />
        </Link>
      ))}
    </div>
  );
};

export default Productos;
