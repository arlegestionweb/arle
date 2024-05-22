'use client'

import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import ProductCard from "./ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";

const Productos = ({ productos }: { productos: TProduct[] }) => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('currentPage')) || 1;

  const prodsPerPage = 10;
  
  const startingPagination = (currentPage - 1) * prodsPerPage;
  const endingPagination = currentPage * prodsPerPage;
  
  const prodsToRender = productos.slice(startingPagination, endingPagination)
  
  const totalPages = Math.ceil(productos.length / prodsPerPage);

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(128px,288px))] place-content-center gap-y-6 gap-x-4 ">
        {prodsToRender?.map((producto, i) => (
          <li key={`${producto._id}-${i}`} className="relative pb-6 w-full justify-between flex flex-col gap-1">
            <ProductCard producto={producto} />
          </li>
        ))}
      </ul>
      <PaginationFooter totalPages={totalPages} />
    </>
  );
};

export default Productos;

const PaginationFooter = ({ totalPages }: {
  totalPages: number;
}) => {
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section>
      {pagesArray.map((page, index) => (
        <Link key={page} href={`?currentPage=${page}`} className="mr-1">
          {`${page} ${index !== pagesArray.length - 1 ? '-' : ''}`}
        </Link>
      ))}
    </section>
  );
};