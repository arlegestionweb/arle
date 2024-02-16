"use client";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { useEffect, useState } from "react";
import { useCartStore } from "./store";
import { getProductById } from "@/sanity/queries/pages/productPage";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import { FiTrash2 } from "react-icons/fi";
import Button from "../Button";
import Precio from "../Precio";

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
        className="bg-black w-screen h-screen fixed top-0 left-0 z-[100] grid place-content-center opacity-80"
      ></section>
      <section className="w-screen pointer-events-none h-screen fixed top-0 left-0 z-[101] grid place-content-center">
        <div className="w-[598px] z-[102] h-[354px] pointer-events-auto px-8 py-5 bg-white shadow flex-col justify-start items-start gap-2.5 inline-flex relative">
          <header className="flex w-full items-center justify-between">
            <Image className="w-12 h-12" src="/arleMini.png" width={50} height={50} alt="logo" />
            <h1 className="mx-auto text-zinc-800 text-2xl font-semibold font-crimson leading-7">
              Agregado al Carrito con éxito!
            </h1>{" "}
            <IoMdClose
              className="w-3 h-3 cursor-pointer"
              onClick={() => toggleAddedToCartModal()}
            />
          </header>
          <section className="flex w-full gap-5 justify-between">
            {image && (
              <Image
                src={image?.url}
                alt={image?.alt}
                width={180}
                height={180}
                className="object-cover w-[180px] h-[171px]"
              />
            )}
            <section className="w-full flex flex-col justify-between">
              <div>
                <h4 className="text-zinc-800 text-2xl font-semibold font-crimson leading-7">
                  {productTitle}
                </h4>
              </div>
              <section>
                <section className="h-[9px] justify-start items-center gap-3 inline-flex">
                  <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
                    {product.marca}
                  </span>
                  <div className="w-px self-stretch justify-start items-start gap-2.5 flex">
                    <div className="w-px self-stretch bg-stone-300" />
                  </div>
                  <span className="capitalize text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
                    {product.genero}
                  </span>
                </section>
                <div className=" text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
                  CODE: {itemAddedToCart.variantId}
                </div>
              </section>
              <section className="flex w-full gap-2 items-end">

                <Precio
                  fullPrice={itemAddedToCart.originalPrice}
                  dontDisplayPaymentOptions
                  discountedPrice={itemAddedToCart.price < itemAddedToCart.originalPrice ? itemAddedToCart.price : undefined}
                  fontSizes={{ lineThroughPrice: "sm", payingPrice: "md" }}
                />
                <section className="">
                  <h6 className="text-zinc-800 text-base font-medium font-tajawal leading-tight">
                    Cantidad
                  </h6>

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
                  />
                </section>
                <div className="w-9 h-9 p-2.5 bg-neutral-100 justify-center items-center gap-2 inline-flex">
                  <FiTrash2 className="self-end" />
                </div>
              </section>
            </section>
          </section>
          <footer className=" w-full flex justify-between">
            <Button
              onClick={() => {
                setItemAddedToCart();
                toggleAddedToCartModal();
              }}
            >
              seguir comprando
            </Button>
            <Button
              onClick={() => {
                setItemAddedToCart();
                toggleAddedToCartModal();
                toggleCart();
              }}
            >
              Ver el carrito
            </Button>
            <Button>Ir a Pagar</Button>
          </footer>
        </div>
      </section>
    </>
  );
};


export default AddedToCartModal;