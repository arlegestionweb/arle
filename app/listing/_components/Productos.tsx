'use client'

import { useSearchParams } from 'next/navigation'
import Link from "next/link";
import ProductCard from "./ProductCard";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { createUrl, makeNewParams } from '@/app/_lib/utils';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Productos = ({ productos }: { productos: TProduct[] }) => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('currentPage')) || 1;

  const prodsPerPage = Number(searchParams.get("prodsPerPage")) || 24;
  
  const startingPagination = (currentPage - 1) * prodsPerPage;
  const endingPagination = currentPage * prodsPerPage;
  
  const prodsToRender = productos.slice(startingPagination, endingPagination)
  
  const totalPages = Math.ceil(productos.length / prodsPerPage);

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(128px,288px))] place-content-center gap-y-6 gap-x-4 ">
        {prodsToRender?.map((producto, i) => (
          <li key={`${producto._id}-${i}`} className="relative pb-6 w-full justify-between flex flex-col gap-1 group">
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

  const getVisiblePages = (totalPages: number, currentPage: number) => {
    const visiblePages = [];
  
    // Always show the first page
    visiblePages.push(1);
  
    // If the total number of pages is 1, return immediately
    if (totalPages === 1) {
      return visiblePages;
    }
  
    // If the current page is 4 or more, add '...' after the first page
    if (currentPage > 3) {
      visiblePages.push('...');
    }
  
    // Determine the range of pages to show around the current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 2);
  
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
  
    // If there are more pages after the endPage, show '...'
    if (endPage < totalPages - 1) {
      visiblePages.push('...');
    }
  
    // Always show the last page if it's not already included
    if (endPage !== totalPages) {
      visiblePages.push(totalPages);
    }
  
    return visiblePages;
  };
  
  const visiblePages = getVisiblePages(totalPages, currentPage);

  return (
    <section className='flex gap-2 w-full justify-center py-5'>
        <Link href={createUrl("/listing", makeNewParams("currentPage", `${currentPage - 1}`, searchParams))} className={`border border-black w-7 h-7 text-sm sm:text-base sm:w-10 sm:h-10 flex items-center justify-center ${currentPage === 1 && "pointer-events-none border-gray-300 text-gray-300"} `}>
        <IoIosArrowBack className="text-base" />
        </Link>
      {visiblePages.map((page, index) => (
        <Link key={index} href={createUrl("/listing", makeNewParams("currentPage", `${page}`, searchParams))} className={`border border-black w-7 h-7 text-sm sm:text-base sm:w-10 sm:h-10 flex items-center justify-center hover:underline underline-offset-2 hover:text-gray-600 ${page === currentPage ? "bg-black text-white pointer-events-none" : "text-black bg-white"} ${page === "..." && "pointer-events-none border-gray-500 text-gray-500"}`}>
          {`${page}`}
        </Link>
      ))}
        <Link href={createUrl("/listing", makeNewParams("currentPage", `${currentPage + 1}`, searchParams))} className={`border border-black w-7 h-7 text-sm sm:text-base sm:w-10 sm:h-10 flex items-center justify-center ${currentPage === totalPages && "pointer-events-none border-gray-300 text-gray-300"} `}>
        <IoIosArrowForward className="text-base"/>
        </Link>
    </section>
  );
};