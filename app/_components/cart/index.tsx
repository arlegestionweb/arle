"use client";
import ProductItem from "./ProductItem";
import { numberToColombianPriceString } from "@/utils/helpers";
import Button from "../Button";
import { usePathname } from "next/navigation";

import AddedToCartModal from "./AddedToCartModal";
import { useClickOutside, useHideBodyOverflow } from "@/app/_lib/hooks";

import { useCartStore } from "./store";
import ShippingForm from "./ShippingForm";
import CodigoDeDescuento from "./CodigoDeDescuento";
import { GoChevronLeft } from "react-icons/go";
import { createInvoice } from "./actions";
// @ts-ignore
import { useFormState, experimental_useFormStatus as useFormStatus } from 'react-dom';
import MenuModal from "../MenuModal";
import WompiPayButton from "./WompiPayButton";
import { useRef } from "react";


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
    id,
    getCartTotalWithoutDiscountsOrTax,
    isAddedToCartModalOpen,
    getCartTax
  } = useCartStore((state) => state);

  const [formState, formAction] = useFormState(createInvoice, null);


  const wompiRef = useRef(null);

  useHideBodyOverflow(isCartOpen);

  const closeWompi = () => {
    formAction()
  }

  useClickOutside(wompiRef, closeWompi);


  if (pathname.includes("/admin")) return null;

  if (isAddedToCartModalOpen) return <AddedToCartModal />;

  if (!isCartOpen) return null;

  const payment_reference = id;

  // const error = formState?.error && JSON.parse(formState.error)[0].message

  const localUrl = window.location.href.split("/listing")[0];

  // console.log({ localUrl })

  return (
    <>
      <form className="bg-white z-[60] overflow-y-scroll w-screen h-screen fixed top-0 left-0 flex flex-col md:flex-row no-scrollbar" action={formAction}>
        <section className="md:flex-1 pt-16 px-5">
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
        <section className="bg-neutral-100 md:flex-1 px-12 py-[122px] flex flex-col gap-5 md:overflow-y-scroll no-scrollbar">
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
              <input type="text" value={JSON.stringify(items)} name="items" hidden />
              <input hidden name="reference" value={payment_reference} type="text" />
              <input hidden name="subtotal" value={getCartTotalWithoutDiscountsOrTax()} type="number" />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                Subtotal
              </h5>
              <span>${numberToColombianPriceString(getCartTotalWithoutDiscountsOrTax())}</span>
            </div>
            <label className="flex w-full justify-between">
              <input hidden name="discount" value={getDiscountAmount()} type="number" />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                Descuento
              </h5>
              <span>${numberToColombianPriceString(getDiscountAmount()) || 0}</span>
            </label>
            <label className="flex w-full justify-between">
              <input type="number" hidden name="tax" value={getCartTax()} />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                IVA
              </h5>
              <span>${numberToColombianPriceString(getCartTax()) || 0}</span>
            </label>
            <label className="flex w-full justify-between">
              <input type="number" hidden name="shipping" value={0} />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                Envío
              </h5>
              <span>Gratis</span>
            </label>
            <div className="self-stretch h-px bg-stone-300" />

            <label className="flex w-full justify-between">
              <input hidden type="number" name="total" value={getCartTotal()} />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                Total
              </h5>
              <span>${numberToColombianPriceString(getCartTotal())}</span>
            </label>
            <label className="flex w-full justify-between">
              {/* <input hidden type="text" name="cartId" value={id} /> */}
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                id
              </h5>
              <span>{id}</span>
            </label>
            <Button
              // onClick={() => addToCart(product, selectedVariant)}
              labelType={"dark"}
              className="flex justify-center items-center gap-2 w-full max-w-sm button-float"
            >
              <span className="font-inter text-base font-medium leading-6">
                $ Ir a pagar
              </span>
            </Button>
            {formState && formState.error ? (
              <p className="text-red-500 text-sm">{JSON.parse(formState.error)[0].message}</p>
            ) : (
              <MenuModal isMenuOpen={!!formState}>
                <div className=" relative z-10 h-full w-full grid place-content-center " >
                  <div ref={wompiRef}>

                    <WompiPayButton amount={getCartTotal()} reference={payment_reference} redirectUrl={`http://localhost:3000/success/${payment_reference}/api`} />
                  </div>
                </div>
              </MenuModal>
            )}
          </section>
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
              <input type="text" value={JSON.stringify(items)} name="items" hidden />
              <input hidden name="reference" value={payment_reference} type="text" />
              <input hidden name="subtotal" value={getCartTotalWithoutDiscountsOrTax()} type="number" />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                Subtotal
              </h5>
              <span>${numberToColombianPriceString(getCartTotalWithoutDiscountsOrTax())}</span>
            </div>
            <label className="flex w-full justify-between">
              <input hidden name="discount" value={getDiscountAmount()} type="number" />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                Descuento
              </h5>
              <span>${numberToColombianPriceString(getDiscountAmount()) || 0}</span>
            </label>
            <label className="flex w-full justify-between">
              <input type="number" hidden name="tax" value={getCartTax()} />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                IVA
              </h5>
              <span>${numberToColombianPriceString(getCartTax()) || 0}</span>
            </label>
            <label className="flex w-full justify-between">
              <input type="number" hidden name="shipping" value={0} />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                Envío
              </h5>
              <span>Gratis</span>
            </label>
            <div className="self-stretch h-px bg-stone-300" />

            <label className="flex w-full justify-between">
              <input hidden type="number" name="total" value={getCartTotal()} />
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                Total
              </h5>
              <span>${numberToColombianPriceString(getCartTotal())}</span>
            </label>
            <label className="flex w-full justify-between">
              {/* <input hidden type="text" name="cartId" value={id} /> */}
              <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                id
              </h5>
              <span>{id}</span>
            </label>
            <Button
              // onClick={() => addToCart(product, selectedVariant)}
              labelType={"dark"}
              className="flex justify-center items-center gap-2"
            >
              <span className="font-inter text-base font-medium leading-6">
                $ Ir a pagar
              </span>
            </Button>
            {formState && formState.error && (
              <p className="text-red-500 text-sm">{JSON.parse(formState.error)[0].message}</p>
            )}
          </section>
        </section>
      </form>
      {formState && !formState?.error && (
        <MenuModal isMenuOpen={!!formState}>
          <div className=" relative z-10 h-full w-full grid place-content-center " >
            <div ref={wompiRef}>

              <WompiPayButton
                amount={getCartTotal()}
                reference={payment_reference}
                redirectUrl={`${localUrl}/success/${payment_reference}/is-payment-successful`}
              />
            </div>
          </div>
        </MenuModal>
      )};
    </>

  )
};

export default Cart;

