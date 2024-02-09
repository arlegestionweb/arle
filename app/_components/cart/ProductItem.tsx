"use client";
import { useEffect, useState } from "react";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { getProductById } from "@/sanity/queries/pages/productPage";
import Image from "next/image";
import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import { IoMdClose } from "react-icons/io";
import { TCartItem, useCartStore } from "./store";
import Precio from "../Precio";

const ProductItem = ({ item, withoutQuantity = false }: { item: TCartItem, withoutQuantity?: boolean }) => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const { addItem, removeItem, removeAllOfOneItem } = useCartStore();
  
  useEffect(() => {
    const getProduct = async () => {
      const { product } = await getProductById(item.productId, item.productType);
      setProduct(product);
    };
    getProduct();
  }, []);

  const variant = product?.variantes.find(
    (v) => v.codigoDeReferencia === item.variantId
  );

  if (!variant) return null;

  const variantIndex = product?.variantes.findIndex(
    (v) => v.codigoDeReferencia === item.variantId
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
      <button
        type="button"
        className="absolute top-0 right-0"
        onClick={() => removeAllOfOneItem(item)}
      >
        <IoMdClose className="text-zinc-500 w-4 h-4" />
      </button>
      {image && (
        <Image
          src={image?.url}
          alt={image?.alt}
          width={80}
          height={80}
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
        {!withoutQuantity && (
          <Cantidad
            cantidad={item.quantity}
            anadirACantidad={() => addItem(item)}
            restarACantidad={() => removeItem(item)}
          />
        )}
        
      </section>
    </li>
  );
};

export default ProductItem;
