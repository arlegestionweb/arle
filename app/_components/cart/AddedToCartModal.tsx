"use client";
import {
  TProduct,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import { useEffect, useState } from "react";
import { useCartStore } from "./store";
import { getProductById } from "@/sanity/queries/pages/productPage";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import { FiTrash2 } from "react-icons/fi";
import Button from "../Button";
import Precio from "../Precio";
import { MdOutlinePayments } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import {
  isGafaLujo,
  isPerfumeLujo,
  isPerfumePremium,
  isRelojLujo,
} from "@/sanity/queries/pages/types";
import ArleBasicLogo from "../ArleBasicLogo";

const AddedToCartModal = () => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const {
    itemAddedToCart,
    isAddedToCartModalOpen,
    setItemAddedToCart,
    toggleAddedToCartModal,
    addItem,
    removeItem,
    toggleCart,
  } = useCartStore((state) => state);
  const [itemQuantity, setItemQuantity] = useState(
    itemAddedToCart?.quantity || 1
  );

  useEffect(() => {
    const getProduct = async () => {
      if (!itemAddedToCart) return;

      const { product } = await getProductById(
        itemAddedToCart.productId,
        itemAddedToCart.productType
      );
      setProduct(product);
    };
    getProduct();
  }, []);

  if (!itemAddedToCart) return null;
  const variant = product?.variantes.find(
    (v) => v.codigoDeReferencia === itemAddedToCart.variantId
  );

  if (!variant) return null;

  const variantIndex = product?.variantes.findIndex(
    (v) => v.codigoDeReferencia === itemAddedToCart.variantId
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
    <>
      <section
        onClick={() => {
          toggleAddedToCartModal();
        }}
        className={`${
          isAddedToCartModalOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        } fixed z-[105] top-[0px] left-0 items-end w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm flex flex-col overflow-hidden`}
      />
      <section
        className="w-screen pointer-events-none h-screen fixed top-0 left-0 z-[106] 
      flex justify-center items-center default-paddings"
      >
        <div className="w-full max-w-screen-sm z-[102] pointer-events-auto px-6 pt-4 pb-3 bg-white flex-col justify-start items-start gap-2.5 relative">
          <header className="flex w-full items-center justify-between pb-3">
            <h1 className="mx-auto text-gray-800 text-lg md:text-xl font-jomolhari">
              Agregado al Carrito!
            </h1>{" "}
            <IoMdClose
              className="text-lg cursor-pointer"
              onClick={() => toggleAddedToCartModal()}
            />
          </header>
          <section className="flex flex-col sm:flex-row w-full gap-5 items-center sm:items-start justify-between">
            {image && (
              <Image
                src={image?.url}
                alt={image?.alt}
                width={180}
                height={180}
                className="object-contain w-[150px] h-[150px]"
              />
            )}
            <section className="w-full flex flex-col self-center gap-1 justify-start font-tajawal">
              <h2 className="leading-none text-lg md:text-xl md:leading-none font-bold  text-gray-800 capitalize">
                {product.marca}
              </h2>
              <h3 className="text-md mb-1 md:text-lg md:leading-none font-medium text-gray-700 leading-none">
                {isPerfumePremium(product)
                  ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${
                      product.detalles.concentracion
                    }`
                  : isPerfumeLujo(product)
                  ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${
                      product.concentracion
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
                  <Cantidad
                    cantidad={itemQuantity}
                    anadirACantidad={() => {
                      setItemQuantity(itemQuantity + 1);
                      addItem(itemAddedToCart);
                    }}
                    restarACantidad={() => {
                      if (itemQuantity === 1) return;
                      setItemQuantity(itemQuantity - 1);
                      removeItem(itemAddedToCart);
                    }}
                    max={product.variantes[variantIndex].unidadesDisponibles}
                    // dontUseMin
                  />
                </section>
                <Precio
                  fullPrice={itemAddedToCart.originalPrice}
                  dontDisplayPaymentOptions
                  discountedPrice={
                    itemAddedToCart.price < itemAddedToCart.originalPrice
                      ? itemAddedToCart.price
                      : undefined
                  }
                  fontSizes={{ lineThroughPrice: "sm", payingPrice: "md" }}
                />
              </section>
            </section>
          </section>
          <footer className=" w-full flex flex-col items-center pt-3">
            <div className=" w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 pb-3 border-b border-gray-200">
              <Button
                className="w-full lg:max-w-sm flex justify-center items-center gap-2 button-float"
                labelType="gray"
                onClick={() => {
                  setItemAddedToCart();
                  toggleAddedToCartModal();
                }}
              >
                <FaArrowLeft className="text-base" />
                Seguir Comprando
              </Button>
              <Button
                className="w-full lg:max-w-sm flex justify-center items-center gap-2 button-float"
                labelType="dark"
                onClick={() => {
                  setItemAddedToCart();
                  toggleAddedToCartModal();
                  toggleCart();
                }}
              >
                <MdOutlinePayments className="text-base" /> Ir a Pagar{" "}
                <FaArrowRight className="text-base" />
              </Button>
            </div>
            <div className="w-[5.5rem]">
              <ArleBasicLogo />
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

export default AddedToCartModal;
