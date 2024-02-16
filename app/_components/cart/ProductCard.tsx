import Image from "next/image";
import Precio from "../Precio";

const ProductCard = ({ image, productTitle, product, item }:
  {
    image: { url: string, alt: string } | undefined,
    productTitle: string,
    product: { marca: string },
    item: { originalPrice: number, price: number, quantity: number },
  }) => {
  return (
    <li key={image?.url}>
      {image && (
        <Image
          src={image?.url}
          alt={image?.alt}
          width={50}
          height={50}
          className="object-cover h-20 w-20"
        />
      )}
      <section>
        <h4 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">
          {productTitle}
        </h4>
        <h5 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">
          {product.marca}
        </h5>

        <Precio
          fullPrice={item.originalPrice}
          discountedPrice={item.price < item.originalPrice ? item.price : undefined}
          dontDisplayPaymentOptions
        />


      </section>
    </li>
  );
}

export default ProductCard;