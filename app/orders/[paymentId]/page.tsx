"use client";
import Main from "@/app/_components/Main";
import { getOrderById } from "@/sanity/queries/orders";
import React from "react";
import ProductCard from "@/app/_components/cart/ProductCard";
import SuccessIcon from "@/app/_components/SuccessIcon";
import Link from "next/link";
import { DateTime } from "luxon";
import { numberToColombianPriceString } from "@/utils/helpers";
import { FaBoxesPacking } from "react-icons/fa6";
import { GoChevronLeft } from "react-icons/go";

const Page = async ({
  params,
}: {
  params: {
    paymentId: string;
  };
}) => {
  const sanityOrder = await getOrderById(params.paymentId);

  const orderStatus: Record<string, string> = {
    in_process: "En Proceso",
    sent: "Despachado",
    returned_to_seller: "No entregado - Devuelto al vendedor",
    delivered: "Entregado al Comprador",
  };

  if (!sanityOrder)
    return (
      <Main extraClasses="bg-white md:mt-[53px] w-full min-h-screen flex flex-col items-center justify-center px-10 pb-10">
        <SuccessIcon failiure />
        <h1 className="pt-3 font-tajawal font-bold text-4xl leading-none text-gray-800 text-center">
          Error.
        </h1>

        <section className="flex flex-col gap-1 max-w-screen-xs text-sm md:text-base">
          <h2 className="font-tajawal font-medium text-xl md:text-2xl text-gray-800">
            Lo sentimos.
          </h2>
          <h2>
            No se encontró ninguna orden bajo el Código: {params.paymentId}.
          </h2>
          <p>Por favor inténtalo de nuevo.</p>

          <Link
            href="/estadodecompra"
            className="mt-4 dark-button button-float"
          >
            Volver
          </Link>
        </section>
      </Main>
    );
  DateTime.fromSQL(sanityOrder.orderDate);
  return (
    <Main extraClasses="bg-white md:mt-[53px] default-paddings pb-10 min-h-screen flex justify-center">
      <section className="w-full max-w-screen-sm flex flex-col gap-2 pt-20">
        <button
          className="flex items-center -ml-1 group"
          onClick={() => window.history.back()}
        >
          <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
          <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
            Volver
          </span>
        </button>
        <div className="flex gap-2 font-tajawal items-center">
          <h1 className="text-gray-800 text-xl md:text-2xl font-bold ">
            Orden N°.
          </h1>
          <h2 className="text-lg md:text-xl font-bold text-gray-600">
            {sanityOrder._id}
          </h2>
        </div>
        <p className="-mt-3 font-tajawal font-light text-lg">
          Fecha de compra: {DateTime.now().toLocaleString(DateTime.DATE_MED)}
        </p>

        {/* <h3 className="font-tajawal text-gray-800 text-xl font-medium">Detalles del pedido:</h3> */}
        <div className="flex gap-2 font-tajawal items-center">
          <p className="text-gray-800 text-lg font-medium">
            Estado del envío:{" "}
          </p>
          <p className="text-gray-700 text-lg font-normal">
            {orderStatus[sanityOrder.shipping.status]}
          </p>
        </div>
        <h3 className="text-gray-800 text-lg font-medium font-tajawal">
          Productos:
        </h3>
        <ul>
          {sanityOrder.items.map((item) => {
            const { product } = item;

            return (
              <ProductCard key={item.variantId} item={item} product={product} />
            );
          })}
        </ul>
        <div className="flex gap-2 font-tajawal items-center mt-4">
          <p className="text-gray-800 text-lg font-medium">
            Total de la Compra:
          </p>
          <p className="text-gray-700 text-lg font-normal">
            ${numberToColombianPriceString(sanityOrder.amounts.total)}
          </p>
        </div>
      </section>
    </Main>
  );
};

export default Page;
