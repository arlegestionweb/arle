"use client";
import { useEffect, useState } from "react";
import {
  TProduct,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import { getProductById } from "@/sanity/queries/pages/productPage";
import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import { IoMdClose } from "react-icons/io";
import { TCartItem, useCartStore } from "./store";
import Precio from "../Precio";
import {
  isGafaLujo,
  isPerfumeLujo,
  isPerfumePremium,
  isRelojLujo,
} from "@/sanity/queries/pages/types";
import ImageWrapper from "@/app/listing/_components/ImageWrapper";

const ProductItem = ({ item, withoutQuantity = false }: { item: TCartItem, withoutQuantity?: boolean }) => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const { addItem, removeItem, removeAllOfOneItem } = useCartStore();

  useEffect(() => {
    const getProduct = async () => {
      const { product } = await getProductById(
        item.productId,
        item.productType
      );
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

  const image = product.variantes[variantIndex].imagenes[0]

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
        <section className=" h-24 w-24 relative">
        <ImageWrapper
          src={image.url}
          alt={image?.alt || ""}
          width={115}
          height={115}
          className="object-contain"
          />
        </section>
      )}
      <section className="w-full flex flex-col self-center gap-1 justify-start font-tajawal">
        <h2 className="leading-none text-lg md:text-xl md:leading-none font-bold  text-gray-800 capitalize">
          {product.marca}
        </h2>
        <h3 className="text-md mb-1 md:text-lg md:leading-none font-medium text-gray-700 leading-none">
          {isPerfumePremium(product)
            ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${product.detalles.concentracion
            }`
            : isPerfumeLujo(product)
              ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${product.concentracion
              }`
              : isReloj(product)
                ? product.modelo
                : product.modelo}
        </h3>
        {isPerfume(product) && (
          <p className="text-sm leading-none capitalize text-gray-600">
            {`${"tamano" in variant && variant.tamano}ml | `}
            {product.genero}
          </p>
        )}
        {isGafa(product) && (
          <p className="text-sm leading-none capitalize text-gray-600">
            {isGafaLujo(product)
              ? product.especificaciones.tipoDeGafa
              : product.detalles.tipoDeGafa}
            {` | ${product.genero}`}
          </p>
        )}
        {isReloj(product) && (
          <p className="text-sm leading-none capitalize text-gray-600">
            {isRelojLujo(product)
              ? product.movimiento?.tipoDeMovimiento
              : product.detallesReloj.tipoDeMovimiento}
            {` | ${product.genero}`}
          </p>
        )}

        <p className="text-sm leading-none capitalize text-gray-600">
          {"Código: "}
          {variant.codigoDeReferencia}
        </p>
        <section className="flex flex-col w-full gap-1">
          <section className="flex items-center gap-5">
            {!withoutQuantity && (
              <Cantidad
                cantidad={item.quantity}
                anadirACantidad={() => addItem(item)}
                restarACantidad={() => removeItem(item)}
                max={product.variantes[variantIndex].unidadesDisponibles}
                dontUseMin
              />
            )}
          </section>
          <Precio
            fullPrice={item.originalPrice}
            discountedPrice={
              item.price < item.originalPrice ? item.price : undefined
            }
            dontDisplayPaymentOptions
            fontSizes={{ lineThroughPrice: "sm", payingPrice: "md" }}
          />
        </section>
      </section>
    </li >
  );
};

export default ProductItem;
