import { TFrontEndOrderSchema } from "@/sanity/queries/orders";
import { Html, Body, Text, Heading, Container, Tailwind } from "@react-email/components";


type EmailTemplateProps = {
  order: TFrontEndOrderSchema;
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  order,
}) => {
  // console.log("items in email-template", order.items, Array.isArray(order.items))
  return (

    <Tailwind>

      <Html>
        <Body>
          <Container>
            <Heading className="bg-red-400 text-orange-600" style={{ backgroundColor: "#3a1439" }}>{new Date().toISOString()}</Heading>
            <Heading>PEDIDO EXITOSO</Heading>
            <Heading>Gracias por tu compra</Heading>
            <Heading>Detalles de tu pedido:</Heading>
            <Text>Id: {order._id}</Text>
            <Text>Fecha: {order.orderDate}</Text>
            <Text>Estado: {order.status}</Text>
            <Text>Cliente: {order.customer.name}</Text>
            <Text>Email: {order.customer.email}</Text>
            <Text>Teléfono: {order.customer.phone}</Text>
            <Text>Dirección: {order.customer.addressObject?.address}</Text>
            <Text>Subtotal: {order.amounts.subtotal}</Text>
            <Text>Descuento: {order.amounts.discount}</Text>
            <Text>Impuestos: {order.amounts.taxes}</Text>
            <Text>Envío: {order.amounts.shipping}</Text>
            <Text>Total: {order.amounts.total}</Text>
            <Heading>Productos:</Heading>
            {order.items.map((item) => {
              const { product } = item;
              console.log({product})
              const variant = product.variantes.find(variante => variante.codigoDeReferencia === item.variantId)

              const image =
                product._type === "relojesLujo" ||
                  product._type === "relojesPremium" ||
                  product._type === "gafasLujo" ||
                  product._type === "gafasPremium"
                  // @ts-ignore
                  ? variant.imagenes[0]
                  : product.imagenes[0];


              return (
                <Container key={item.variantId + item.productId} className="flex bg-yellow-200">
                  <Text>Producto: {item.productId._ref}</Text>
                  <Text>Producto: {item.productType}</Text>
                  <Text>Precio: {item.price}</Text>
                  <Text>Cantidad: {item.quantity}</Text>
                  {/* <Img src={image.url} sizes="3rem" /> */}
                  <img src={image.url} alt={product.marca} className="w-5 h-5 object-cover" />
                </Container>
              )
            })}
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
};