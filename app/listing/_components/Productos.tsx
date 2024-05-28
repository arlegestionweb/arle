'use client'

import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import ProductCard from "./ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { createUrl, makeNewParams } from '@/app/_lib/utils';

const Productos = ({ productos }: { productos: TProduct[] }) => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('currentPage')) || 1;

  const prodsPerPage = Number(searchParams.get("prodsPerPage")) || 10;
  
  const startingPagination = (currentPage - 1) * prodsPerPage;
  const endingPagination = currentPage * prodsPerPage;
  
  const prodsToRender = productos.slice(startingPagination, endingPagination)
  
  const totalPages = Math.ceil(productos.length / prodsPerPage);

  console.log({prodsToRender, startingPagination, endingPagination})

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(128px,288px))] place-content-center gap-y-6 gap-x-4 ">
        {prodsToRender?.map((producto, i) => (
          <li key={`${producto._id}-${i}`} className="relative pb-6 w-full justify-between flex flex-col gap-1">
            <ProductCard producto={producto} />
          </li>
        ))}
      </ul>
      <PaginationFooter totalPages={totalPages} currentPage={currentPage} />
    </>
  );
};

export default Productos;

const PaginationFooter = ({ totalPages, currentPage }: {
  totalPages: number;
  currentPage: number;
}) => {
  const searchParams = useSearchParams()

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className='flex gap-2 w-full justify-center py-5'>
      {pagesArray.map((page, index) => (
        <Link key={page + index} href={createUrl("/listing", makeNewParams("currentPage", `${page}`, searchParams))} className={`border border-black w-10 h-10 flex items-center justify-center ${page === currentPage ? "border-arle-beige" : ""}`}>
          {`${page}`}
        </Link>
      ))}
    </section>
  );
};