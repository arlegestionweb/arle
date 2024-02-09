import Main from "@/app/_components/Main";
import ProductItem from "@/app/_components/cart/ProductItem";
import { TCartItem } from "@/app/_components/cart/store";
import { getOrderById } from "@/sanity/queries/orders";
import RemoveCartItems from "./_components/RemoveCartItems";

const Page = async ({ params }: {
  params: {
    id: string;
  }
}) => {
  const sanityOrder = await getOrderById(params.id);


  // const items = sanityOrder.items.map((item) => {
  //   const itemData: TCartItem = {
  //      productId: item.productId,

  // });
  if (!sanityOrder) return null;


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
      <ul>
        {sanityOrder.items.map((item) => {
          return <ProductItem key={item.variantId} item={item} withoutQuantity />;
        })}
      </ul>
    </Main>
  );
}

export default Page;