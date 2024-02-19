import Main from "@/app/_components/Main";
import { getOrderById } from "@/sanity/queries/orders";
import RemoveCartItems from "./_components/RemoveCartItems";
import React from "react";
import ProductCard from "@/app/_components/cart/ProductCard";
import SuccessIcon from "@/app/_components/SuccessIcon";
import { numberToColombianPriceString } from "@/utils/helpers";
import Link from "next/link";

const Page = async ({
  params,
  // searchParams 
}: {
  params: {
    paymentId: string
  }
  // searchParams: { [key: string]: string | string[] | undefined }
}) => {

  // const paramError = searchParams.error;

  const sanityOrder = await getOrderById(params.paymentId);

  if (!sanityOrder) return <div>no sanity order found</div>;


  return (
    <Main extraClasses="bg-white md:mt-[53px] w-full min-h-screen flex flex-col items-center justify-center px-10 pb-10">
      <RemoveCartItems cartId={sanityOrder._id} />
      {/* {paramError && (
        <>
          <h1>Hubo un error enviando tu factura </h1>
          <p>haz click aqui para intentarlo de nuevo
          </p>
          <SendInvoice order={sanityOrder} />
        </>
      )} */}
      <SuccessIcon />
      <h1 className="pt-3 font-tajawal font-bold md:text-6xl text-4xl leading-none text-gray-800 md:leading-none text-center">Pedido exitoso!</h1>


      <section className="flex flex-col gap-1 max-w-screen-xs text-sm md:text-base">

        <h2 className="font-tajawal font-medium text-xl md:text-2xl text-gray-800">Gracias por confiar en Arlé.</h2>
        <p>Tu pago ha sido efectuado por un total de ${numberToColombianPriceString(sanityOrder.amounts.total)}.</p>
        <h2>Nuestro equipo está preparando tu pedido.</h2>
        <p>Te enviaremos un correo electrónico con la factura.</p>
        <p>Tu Código de Compra es: <span className="font-bold">{sanityOrder._id}</span></p>
        <p>Para consultar el estado de tu compra ingresa tu Código de Compra en el siguiente link:
          <Link href="/estadodecompra" className="underline mr-1"> www.arle.co/estadodecompra</Link>
          o haz click <Link href={`/orders/${sanityOrder._id}`} className="text-blue-800 hover:underline">aquí</Link>.
        </p>
        <Link href="/listing" className="mt-4 dark-button button-float">Finalizar</Link>

      </section>
    </Main>
  );
}

export default Page;