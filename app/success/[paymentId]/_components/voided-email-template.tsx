import { TFrontEndOrderSchema } from "@/sanity/queries/orders";
import { isReloj } from "@/sanity/queries/pages/listingQueries";
import { isPerfumeLujo, isPerfumePremium } from "@/sanity/queries/pages/types";
import { Html, Body, Text, Heading, Container, Tailwind, Link, Img } from "@react-email/components";
import { DateTime } from "luxon";


type EmailTemplateProps = {
  order: TFrontEndOrderSchema;
};

export const VoidedEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  order,
}) => {
  DateTime.fromSQL(order.orderDate);
  return (

    <Tailwind>
      <Html>
        <Body>
        <Container>
            <Heading className=" text-white text-xl" style={{ backgroundColor: "#3a1439" }}>{DateTime.fromSQL(order.orderDate).toLocaleString(DateTime.DATE_MED)}</Heading>
            <Img className="ml-auto mr-auto" src={'/ArleBasicLogo.svg'} alt="Arle Logo" width="690" height="200"></Img>
            <Heading>TU PEDIDO FUE ANULADO</Heading>
            <Text>Código de Compra: {order._id}</Text>
            <Text>Estado: ANULADO</Text>
            <Text>Total: {order.amounts.total}</Text>
            <Text>Para cualquier inquietud comunícate con nosotros a través de nuestra línea de atención al cliente: </Text>
            <Link href={`https://api.whatsapp.com/send/?phone=573160700015&text=Hola%2C+necesito+informacion+sobre+mi+pedido.+Mi+codigo+de+compra+es:+${order._id}.&type=phone_number&app_absent=0`}>Whatsapp 3160700015</Link>
            <Heading>Productos:</Heading>
            {order.items.map((item) => {
              const { product } = item;

              const variant = product.variantes.find(variante => variante.codigoDeReferencia === item.variantId)

              const image = variant?.imagenes[0] 


              return (
                <Container key={`${item.variantId}-${item.productId}`} className="flex flex-col">
                  <Text>Código de Producto: {item.productId}</Text>
                  <Text>{item.product.marca} {isPerfumePremium(item.product)
              ? `${item.product.parteDeUnSet ? "Set " : ""}${item.product.titulo} - ${item.product.detalles.concentracion}`
              : isPerfumeLujo(item.product)
                ? `${item.product.parteDeUnSet ? "Set " : ""}${item.product.titulo} - ${item.product.concentracion}`
                : isReloj(item.product)
                  ? item.product.modelo
                  : item.product.modelo}</Text>
                  <Text>Precio: {item.price}</Text>
                  <Text>Cantidad: {item.quantity}</Text>
                  {/* <Img src={image.url} sizes="3rem" /> */}
                  <Img src={image?.url} alt='product image' width="300" height="300" />
                </Container>
              )
            })}
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
};