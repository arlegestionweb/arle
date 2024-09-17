import Main from "@/app/_components/Main";
import { getOrderById } from "@/sanity/queries/orders";
import React from "react";
import ProductCard from "@/app/_components/cart/ProductCard";
import SuccessIcon from "@/app/_components/SuccessIcon";
import Link from "next/link";
import { DateTime } from "luxon";
import { numberToColombianPriceString } from "@/utils/helpers";
import BackButton from "@/app/_components/BackButton";
import { unstable_noStore } from "next/cache";
import { GoArrowUpRight } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoIosTimer } from "react-icons/io";
import { IoReturnDownBack } from "react-icons/io5";
import { GiPresent } from "react-icons/gi";

const Page = async ({
  params,
}: {
  params: {
    paymentId: string;
  };
}) => {
  unstable_noStore();
  const sanityOrder = await getOrderById(params.paymentId);

  const orderStatus: Record<
    string,
    {
      mensaje: string;
      icono: React.ReactElement;
      color: string;
    }
  > = {
    in_process: {
      mensaje: "En Proceso",
      icono: <IoIosTimer />,
      color: "bg-blue-600",
    },
    sent: {
      mensaje: "Despachado",
      icono: <LiaShippingFastSolid />,
      color: "bg-green-400",
    },
    returned_to_seller: {
      mensaje: "No entregado - Devuelto al vendedor",
      icono: <IoReturnDownBack />,
      color: "bg-yellow-400",
    },
    delivered: {
      mensaje: "Entregado al Comprador",
      icono: <GiPresent />,
      color: "bg-green-500",
    },
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

  console.log({shipping: orderStatus[sanityOrder.shipping.status].icono});
  return (
    <Main extraClasses="bg-white md:mt-[53px] default-paddings pb-10 min-h-screen flex justify-center">
      <section className="w-full max-w-screen-sm flex flex-col gap-2 pt-20">
        <BackButton />
        <div className="flex gap-2 font-tajawal items-center">
          <h1 className="text-gray-800 text-xl md:text-2xl font-bold ">
            Orden N°.
          </h1>
          <h2 className="text-lg md:text-xl font-bold text-gray-600">
            {sanityOrder._id}
          </h2>
        </div>
        <p className="-mt-3 font-tajawal font-light text-lg">
          Fecha de compra:{" "}
          {DateTime.fromISO(sanityOrder.orderDate).toLocaleString(
            DateTime.DATE_MED
          )}
        </p>

        {/* <h3 className="font-tajawal text-gray-800 text-xl font-medium">Detalles del pedido:</h3> */}
        {sanityOrder.shipping.status && (
          <>
            <div className="flex gap-2 font-tajawal items-center">
              <p className="text-gray-800 text-lg font-medium">
                Estado del envío:{" "}
              </p>
              <span
                className={`flex items-center gap-2 ${
                  orderStatus[sanityOrder.shipping.status].color
                } text-white px-6 rounded-full pointer-events-none`}
              >
                <span className="w-5 h-5 mt-1">
                  {orderStatus[sanityOrder.shipping.status].icono}
                </span>
                <p className="text-md font-normal">
                  {orderStatus[sanityOrder.shipping.status].mensaje}
                </p>
              </span>
            </div>
            <div className="flex gap-2 font-tajawal items-center">
              <p className="text-gray-800 text-lg font-medium">
                Número de guía del envío:{" "}
              </p>
              <p className="text-gray-700 text-lg font-normal">
                {sanityOrder.shipping.trackingNumber}
              </p>
            </div>
          </>
        )}
        <div className="flex gap-2 font-tajawal items-center">
          <p className="text-gray-800 text-lg font-medium">
            Rastrea tu envío en el siguiente link:{" "}
          </p>
          <Link
            href={
              sanityOrder.shipping.trackingLink
                ? sanityOrder.shipping.trackingLink
                : sanityOrder.shipping.trackingNumber
                ? `https://coordinadora.com/rastreo/rastreo-de-guia/detalle-de-rastreo-de-guia/?guia=${sanityOrder.shipping.trackingNumber}`
                : "https://coordinadora.com/"
            }
            className="text-gray-700 underline hover:text-gray-500 text-lg font-normal flex items-end"
          >
            Envíos Coordinadora <GoArrowUpRight className="w-5 h-5 mb-1" />
          </Link>
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
        <Link className="dark-button mt-8 button-float" href={"/listing"}>
          Sigue Comprando
        </Link>
      </section>
    </Main>
  );
};

export default Page;
