"use client";
import ProductItem from "./ProductItem";
import { numberToColombianPriceString } from "@/utils/helpers";
import Button from "../Button";
import { usePathname } from "next/navigation";

import AddedToCartModal from "./AddedToCartModal";
import { useHideBodyOverflow } from "@/app/_lib/hooks";

import { useEffect, useState } from "react";
import { useCartStore } from "./store";
import ShippingForm from "./ShippingForm";
import CodigoDeDescuento from "./CodigoDeDescuento";
import { GoChevronLeft } from "react-icons/go";


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
    <section className="bg-white z-[60] overflow-y-scroll w-screen h-screen fixed top-0 left-0 flex flex-col md:flex-row no-scrollbar">
      <section className="md:flex-1 pt-16 p-10">
      <button
            className="flex items-center -ml-1 group"
            onClick={toggleCart}
          >
            <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
            <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
              Volver
            </span>
          </button>
        <h2 className="grow shrink basis-0 text-zinc-800 text-[32px] font-jomolhari">
          Carrito de compras
        </h2>
        <ShippingForm />
      </section>
        {/* <h4 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">Código de descuento</h4> */}
      <section className="bg-neutral-100 md:flex-1 px-12 py-[122px] flex flex-col gap-5 md:max-h-screen md:overflow-y-scroll no-scrollbar">
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

        <section className="flex flex-col items-end gap-2">
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
            className="flex justify-center items-center gap-2 w-full max-w-sm button-float"
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

