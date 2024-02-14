import Main from "@/app/_components/Main";
import { getOrderById } from "@/sanity/queries/orders";
import RemoveCartItems from "./_components/RemoveCartItems";
import SendInvoice from "./_components/SendInvoice";
import React, { Suspense } from "react";
import ProductCard from "@/app/_components/cart/ProductCard";

const Page = async ({ params }: {
  params: {
    paymentId: string;
  }
}) => {
  console.log("in success page", {params})

  const sanityOrder = await getOrderById(params.paymentId);


  // const items = sanityOrder.items.map((item) => {
  //   const itemData: TCartItem = {
  //      productId: item.productId,

  // });


  console.log({sanityOrder})
  if (!sanityOrder) return <div>no sanity order found</div>;


  return (
    <Main extraClasses="bg-white">
      <RemoveCartItems cartId={sanityOrder._id} />
      <h1>PEDIDO EXITOSO</h1>
      <h2>Gracias por tu compra</h2>
      <h3>Detalles de tu pedido:</h3>
      <p>Id: {sanityOrder._id}</p>
      <p>Fecha: {sanityOrder.orderDate}</p>
      <p>Estado: {sanityOrder.status}</p>
      <p>Cliente: {sanityOrder.customer.name}</p>
      <p>Email: {sanityOrder.customer.email}</p>
      <p>Teléfono: {sanityOrder.customer.phone}</p>
      <p>Dirección: {sanityOrder.customer.addressObject?.address}</p>
      <p>Subtotal: {sanityOrder.amounts.subtotal}</p>
      <p>Descuento: {sanityOrder.amounts.discount}</p>
      <p>Impuestos: {sanityOrder.amounts.taxes}</p>
      <p>Envío: {sanityOrder.amounts.shipping}</p>
      <p>Total: {sanityOrder.amounts.total}</p>
      <h3>Productos:</h3>
      {/* <Suspense fallback="loading"> */}
        <ul>
          {sanityOrder.items.map((item) => {
            const {product} = item;

            const variant = product.variantes.find(variante => variante.codigoDeReferencia === item.variantId)

            const image =
            product._type === "relojesLujo" ||
              product._type === "relojesPremium" ||
              product._type === "gafasLujo" ||
              product._type === "gafasPremium"
              // @ts-ignore
              ? variant.imagenes[0]
              : product.imagenes[0];
        
          const productTitle =
            product._type === "relojesLujo" ||
              product._type === "relojesPremium" ||
              product._type === "gafasLujo" ||
              product._type === "gafasPremium"
              ? product.modelo
              : product.titulo;
        

            return (
              <React.Fragment key={item.variantId}>
                {productTitle}
                <ProductCard key={item.variantId} item={item} image={image} productTitle={productTitle} product={product} />
              </React.Fragment>
            )
          }
          )}
        </ul>
      {/* </Suspense> */}
      <Suspense fallback="loading....">

        <SendInvoice order={sanityOrder} />
      </Suspense>
    </Main>
  );
}

export default Page;