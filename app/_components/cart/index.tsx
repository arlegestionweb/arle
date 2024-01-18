"use client";
import ProductItem from "./ProductItem";
import { numberToColombianPriceString } from "@/utils/helpers";
import Button from "../Button";
import { ChevronLeftIcon } from "@sanity/icons";
import { usePathname } from "next/navigation";

import AddedToCartModal from "./AddedToCartModal";
import { useHideBodyOverflow } from "@/app/_lib/hooks";

import { useEffect, useState } from "react";
import { useCartStore } from "./store";
import ShippingForm from "./ShippingForm";
import CodigoDeDescuento from "./CodigoDeDescuento";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { getProductById } from "@/sanity/queries/pages/productPage";
import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import { FiTrash2 } from "react-icons/fi";

const Cart = ({
  showDiscountCode = false,
}: {
  showDiscountCode: boolean;
}) => {
  const pathname = usePathname();
  const {
    items,
    isCartOpen,
    toggleCart,
    getCartTotal,
    getDiscountAmount,
    getCartSubtotal,
    getCartTotalWithoutDiscountsOrTax,
    isAddedToCartModalOpen,
    getCartTax
  } = useCartStore((state) => state);

  useHideBodyOverflow(isCartOpen);

  if (pathname.includes("/admin")) return null;

  if (isAddedToCartModalOpen) return <AddedToCartModal />;

  if (!isCartOpen) return null;


  return (
    <section className="bg-white z-[60] overflow-y-scroll w-screen h-screen fixed top-0 left-0 flex flex-col md:flex-row ">
      <button
        className="absolute top-10 left-8 flex items-center"
        onClick={toggleCart}
      >
        <ChevronLeftIcon className="w-8 h-8" />
        <span className="text-black text-sm font-medium font-inter leading-[21px]">
          Regresar
        </span>
      </button>
      <section className="md:flex-1 pt-16 p-10">
        <h2 className="grow shrink basis-0 text-zinc-800 text-[32px] font-semibold font-crimson leading-9">
          Carrito de compras
        </h2>
        <ShippingForm />
      </section>
      <section className="bg-neutral-100 md:flex-1 px-12 py-[122px] flex flex-col gap-5 md:max-h-screen md:overflow-y-scroll">
        {items.length === 0 ? (
          <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
            No hay productos en el carrito
          </h3>
        ) : (
          <>
            <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
              Resúmen de la compra
            </h3>
            <ul className="flex flex-col  gap-4">
              {items.map((item) => {
                return <ProductItem key={item.variantId} item={item} />;
              })}
            </ul>
          </>
        )}
        {/* <h4 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">Código de descuento</h4> */}

        <section className="flex flex-col gap-2">
          {showDiscountCode && (
            <CodigoDeDescuento />
          )}

          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              Subtotal
            </h5>
            <span>${numberToColombianPriceString(getCartTotalWithoutDiscountsOrTax())}</span>
          </div>
          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              Descuento

            </h5>
            <span>${numberToColombianPriceString(getDiscountAmount()) || 0}</span>
          </div>
          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              IVA

            </h5>
            <span>${numberToColombianPriceString(getCartTax()) || 0}</span>
          </div>
          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              Envío
            </h5>
            <span>Gratis</span>
          </div>
          <div className="self-stretch h-px bg-stone-300" />

          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              Total
            </h5>
            <span>${numberToColombianPriceString(getCartTotal())}</span>
          </div>
          <Button
            // onClick={() => addToCart(product, selectedVariant)}
            labelType={"dark"}
            className="flex justify-center items-center gap-2"
          >
            <span className="font-inter text-base font-medium leading-6">
              $ Ir a pagar
            </span>
          </Button>
        </section>
      </section>
    </section>
  );
};

export default Cart;

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

  if (!itemAddedToCart) return null;

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(
        itemAddedToCart.productId,
        itemAddedToCart.productType
      );
      setProduct(product);
    };
    getProduct();
  }, []);

  const variant = product?.variantes.find(
    (v) => v.registroInvima === itemAddedToCart.variantId
  );

  if (!variant) return null;

  const variantIndex = product?.variantes.findIndex(
    (v) => v.registroInvima === itemAddedToCart.variantId
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

  // itemAddedToCart.
  return (
    <>
      <section
        onClick={() => {
          toggleAddedToCartModal();
        }}
        className="bg-black w-screen h-screen fixed top-0 left-0 z-[100] grid place-content-center opacity-80"
      ></section>
      <section className="w-screen pointer-events-none h-screen fixed top-0 left-0 z-[101] grid place-content-center ">
        <div className="w-[598px] z-[102] h-[354px] pointer-events-auto px-8 py-5 bg-white shadow flex-col justify-start items-start gap-2.5 inline-flex relative">
          <header className="flex w-full items-center justify-between">
            <Image src="/arleMini.png" width={50} height={50} alt="logo" />
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
                width={50}
                height={50}
                className="object-cover w-[180px] h-[171px]"
              />
            )}
            <section className="w-full flex flex-col justify-between">
              <div>
                <h4 className="text-zinc-800 text-2xl font-semibold font-crimson leading-7">
                  {productTitle}
                </h4>
                <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                  {product.marca}
                </h5>
              </div>
              <section>
                <section className="h-[9px] justify-start items-center gap-3 inline-flex">
                  <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
                    PARFUMS de MARLY
                  </span>
                  <div className="w-px self-stretch justify-start items-start gap-2.5 flex">
                    <div className="w-px self-stretch bg-stone-300" />
                  </div>
                  <span className="capitalize text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
                    {product.genero}
                  </span>
                </section>
                <div className=" text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
                  CODE: OO9242-0752
                </div>
              </section>
              <div className="flex items-end w-full justify-between">
                <p className="text-zinc-800 text-xl font-semibold font-crimson leading-[23px]">
                  ${numberToColombianPriceString(itemAddedToCart.price)}
                </p>
                <div>
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
                </div>
                <div className="w-9 h-9 p-2.5 bg-neutral-100 justify-center items-center gap-2 inline-flex">
                  <FiTrash2 className="self-end" />
                </div>
              </div>
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
function useHideBodyOverflow(isCartOpen: boolean) {
  throw new Error("Function not implemented.");
}

