import { useEffect, useState } from "react";
import { TCartItem, useCartStore } from ".";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { getProductById } from "@/sanity/queries/pages/productPage";
import Image from "next/image";
import { numberToColombianPriceString } from "@/utils/helpers";
import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import { IoMdClose } from "react-icons/io";

const ProductItem = ({ item }: { item: TCartItem }) => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const { addItem, removeItem, removeAllOfOneItem } = useCartStore();
  
  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(item.productId, item.productType);
      setProduct(product);
    };
    getProduct();
  }, []);
  
  const variant = product?.variantes.find(
    (v) => v.registroInvima === item.variantId
    );
    
  if (!variant) return null;
  
  const variantIndex = product?.variantes.findIndex(
    (v) => v.registroInvima === item.variantId
  );

  if (!product || variantIndex === undefined) return null;

  const image =
    product._type === "relojesLujo" ||
    product._type === "relojesPremium" ||
    product._type === "gafasLujo" ||
    product._type === "gafasPremium"
      ? product.variantes[variantIndex].imagenes[0]
      : product.imagenes[0];

  const productTitle =
    product._type === "relojesLujo" ||
    product._type === "relojesPremium" ||
    product._type === "gafasLujo" ||
    product._type === "gafasPremium"
      ? product.modelo
      : product.titulo;

  return (
    <li key={item.variantId} className="flex relative gap-2">
      <button type="button" className="absolute top-0 right-5" onClick={() => removeAllOfOneItem(item)}>
        <IoMdClose className="text-zinc-500 w-4 h-4" />
      </button>
      {image && (
        <Image
          src={image?.url}
          alt={image?.alt}
          width={100}
          height={50}
          className="object-cover"
        />
      )}
      <section>
        <h4>{productTitle}</h4>
        <h5>{product.marca}</h5>
        <p>${numberToColombianPriceString(item.price)}</p>
        <Cantidad
          cantidad={item.quantity}
          anadirACantidad={() => addItem(item)}
          restarACantidad={() => removeItem(item)}
        />
        <p>{item.quantity}</p>
      </section>
    </li>
  );
};

export default ProductItem;
