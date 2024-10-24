"use client";
import ProductItem from "./ProductItem";
import { numberToColombianPriceString } from "@/utils/helpers";
import Button from "../Button";
import { redirect, usePathname } from "next/navigation";

import AddedToCartModal from "./AddedToCartModal";
import { useClickOutside, useHideBodyOverflow } from "@/app/_lib/hooks";

import { useCartStore } from "./store";
import ShippingForm from "./ShippingForm";
import CodigoDeDescuento from "./CodigoDeDescuento";
import { GoChevronLeft } from "react-icons/go";
import { createInvoice } from "./actions";
import { useFormState } from "react-dom";
import MenuModal from "../MenuModal";
import WompiPayButton from "./WompiPayButton";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePayments, MdOutlineSendToMobile } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import ArleBasicLogo from "../ArleBasicLogo";
import { initiatePixelCheckoutView } from "@/app/_lib/pixelActions";
import { generateAddiPaymentURL } from "./addiAuthAction";
import { TOrderSchemaWithKeys } from "@/sanity/queries/orders";
import SmallWhiteSpinner from "../SmallWhiteSpinner";
import {
  FaArrowRight,
  FaCcAmex,
  FaCcDinersClub,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa6";
import { getOrSetExternalIdPixel } from "@/app/_lib/utils";
import { RiSecurePaymentLine } from "react-icons/ri";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";

type TAddiAmounts = {
  minAmount: number;
  maxAmount: number;
  policy: object;
  policies: object[];
  widgetConfig: object;
  checkoutConfig: object;
  isActiveAlly: boolean;
  isActivePayNow: boolean;
}

const Cart = ({ showDiscountCode = false }: { showDiscountCode: boolean }) => {
  const pathname = usePathname();
  const {
    items,
    isCartOpen,
    toggleCart,
    getCartTotal,
    getProductDiscountAmount,
    id,
    initializeCartState,
    getCartTotalWithoutDiscountsOrTax,
    isAddedToCartModalOpen,
    getCartTax,
    getShippingCost,
  } = useCartStore((state) => state);

  const [isWompipaymentOpen, setIsWompipaymentOpen] = useState(false);

  const [cartWindow, setCartWindow] = useState(0);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const [formState, formAction] = useFormState(createInvoice, null);

  const [addiAmounts, setAddiAmounts] = useState<TAddiAmounts>()
  const [addiPaymentUrl, setAddiPaymentUrl] = useState<string | null>(null);
  const [triggerAddiPayment, setTriggerAddiPayment] = useState(false);
  const [addiPaymentData, setAddiPaymentData] =
    useState<TOrderSchemaWithKeys | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const cartTotal = getCartTotal();

  useEffect(() => {
    if(window !== undefined){
      setAddiAmounts(JSON.parse(localStorage.getItem("addiAmounts") || ""))
    }
  }, [toggleCart, cartTotal])

  useEffect(() => {
    // Función que chequea el tamaño de la pantalla
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };

    // Ejecutar la función inicialmente
    checkIfMobile();

    // Añadir un event listener al evento resize
    window.addEventListener("resize", checkIfMobile);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [])

    useEffect(() => {
      initializeCartState();
    }, [initializeCartState]);

  useEffect(() => {
    const handleGenerateAddiPaymentUrl = async () => {
      if (!triggerAddiPayment || !addiPaymentData) return;

      try {
        const url = await generateAddiPaymentURL(addiPaymentData);
        if (!url || typeof url !== "string") {
          throw new Error("No se pudo generar la URL de pago");
        }

        setAddiPaymentUrl(url);
      } catch (error) {
        console.error(error);
      } finally {
        setTriggerAddiPayment(false);
      }
    };

    handleGenerateAddiPaymentUrl();
  }, [triggerAddiPayment, addiPaymentData]);


  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (!isMobile) {
        event.preventDefault();
        toggleCart(); 
        window.history.pushState(null, "", window.location.pathname); 
      } else {
        if (isCartOpen && cartWindow === 1) {
          event.preventDefault(); 
          setCartWindow(0); 
          window.history.pushState(null, "", window.location.pathname);
        } else if (isCartOpen && cartWindow === 0) {
          event.preventDefault();
          toggleCart(); 
          window.history.pushState(null, "", window.location.pathname); 
        }
      }
    };
  
    if (isCartOpen || cartWindow === 1) {
      window.history.pushState(null, "", window.location.pathname);
    }
  
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isCartOpen, cartWindow, toggleCart, isMobile]);

  const initiateAddiPayment = (data: TOrderSchemaWithKeys) => {
    setAddiPaymentData(data);
    setTriggerAddiPayment(true);
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.id);
  };


  useEffect(() => {
    if (!addiPaymentUrl) return;

    redirect(addiPaymentUrl);
  }, [addiPaymentUrl]);

  useEffect(() => {
    if (formState && formState.status === 200 && !isWompipaymentOpen) {
      setPaymentLoading(false);
      setIsWompipaymentOpen(true);
    }
  }, [formState]);

  useEffect(() => {
    if (formState && formState.status !== 200) setPaymentLoading(false);
  }, [formState]);


  const wompiRef = useRef(null);

  useHideBodyOverflow(isCartOpen);

  const closeWompi = () => {
    setIsWompipaymentOpen(false);
  };

  useClickOutside(wompiRef, closeWompi);

  if (pathname.includes("/admin")) return null;

  if (isAddedToCartModalOpen) return <AddedToCartModal />;

  if (!isCartOpen) return null;

  const payment_reference = id;

  // const error = formState?.error && JSON.parse(formState.error)[0].message

  const urlSegments = window.location.href.split("/");

  const baseUrl = `${urlSegments[0]}//${urlSegments[2]}`;

  const addiDisabled = addiAmounts && cartTotal > addiAmounts.maxAmount || addiAmounts && cartTotal < addiAmounts.minAmount ? true : false

  console.log({addiAmounts});
  console.log({addiDisabled});

  const pixelInfo = {
    name: formState?.data?.customer.name as string,
    email: formState?.data?.customer.email as string,
    phone: formState?.data?.customer.phone as string,
    amount: getCartTotal(),
  };

  return (
    <section className="bg-white z-[60] w-screen fixed top-0 bottom-0 left-0 flex justify-center no-scrollbar default-paddings">
      <form className="max-w-screen-xl flex justify-center w-full gap-6">
      {isMobile && cartWindow === 0 ? null : (
        <section className="flex flex-col  w-full h-full overflow-x-hidden scrollbar-hide pt-8 md:pt-12 lg:pr-4 xl:pr-12">
          <div className="md:hidden w-[85px] pb-3">
                <ArleBasicLogo />
              </div>
            <button
              className="flex items-center -ml-1 group"
              onClick={() => isMobile ? setCartWindow(0) : toggleCart()}
            >
              <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
              <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
                Volver
              </span>
            </button>
            <h2 className="hidden md:block grow shrink basis-0 text-zinc-800 text-[26px] font-jomolhari pt-2">
              Tu Carrito de compras
            </h2>
            <ShippingForm />
            <section>
              <div className="space-y-4">
                <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
                  Selecciona tu medio de pago:
                </h3>

                <div className="flex flex-col gap-4">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="credit-card"
                          aria-describedby="credit-card-text"
                          type="radio"
                          name="payment-method"
                          checked={selectedPayment === "wompi"}
                          onChange={handlePaymentChange}
                          value="wompi"
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label className="font-medium leading-none text-gray-900 dark:text-white">
                          {" "}
                          Wompi{" "}
                        </label>
                        <p
                          id="credit-card-text"
                          className="mt-1 text-xs md:text-sm font-normal text-gray-500 dark:text-gray-400"
                        >
                          Paga con tarjeta crédito, débito, PSE o transferencia
                          Bancolombia.
                        </p>
                        <div className="flex h-10 gap-0 mt-3">
                          <FaCcMastercard className="w-14 h-full" />
                          <FaCcVisa className="w-14 h-full" />
                          <FaCcAmex className="w-14 h-full" />
                          <FaCcDinersClub className="w-14 h-full" />
                          <img
                            className="h-10 w-10"
                            src="/logo-pse.webp"
                            alt="logo pse"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          disabled={addiDisabled}
                          type="radio"
                          name="payment-method"
                          checked={selectedPayment === "addi"}
                          onChange={handlePaymentChange}
                          value="addi"
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label className="font-medium leading-none text-gray-900 dark:text-white">
                          Addi
                        </label>
                        <p
                          className="mt-1 text-xs md:text-sm font-normal text-gray-500 dark:text-gray-400"
                        >
                          Paga a cuotas con Addi
                        </p>
                        <div className="flex h-10 gap-2 mt-3">
                          <img
                            className="h-10"
                            src="/addiLogo.webp"
                            alt="logo pse"
                          />
                          <img
                            className="h-10 w-10"
                            src="/logo-pse.webp"
                            alt="logo pse"
                          />
                        </div>
                      </div>
                    </div>
                    {addiDisabled && (
                      <span className="-mt-4 ml-2 text-xs text-red-500">
                        * El monto para pago con Addi debe estar entre $
                        {addiAmounts?.minAmount &&
                          numberToColombianPriceString(
                            addiAmounts?.minAmount
                          )}{" "}
                        y $
                        {addiAmounts?.maxAmount &&
                          numberToColombianPriceString(
                            addiAmounts?.maxAmount
                          )}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <RiSecurePaymentLine className="w-10 h-10" />
                    <MdOutlineSendToMobile className="w-10 h-10" />
                  </div>
                  <p className="text-zinc-600 text-sm font-light font-inter leading-tight">
                    Después de hacer click en pagar serás redirigido a la
                    pantalla de pago que selecciones para realizar tu pago 100%
                    Seguro.
                  </p>
                <p className="text-zinc-800 -mb-4 text-xl font-medium font-tajawal leading-normal pt-2 md:hidden">
                  Resumen:
                </p>
                  <section className="md:hidden flex flex-col items-end text-base gap-0.5">
              <div className="flex w-full justify-between ">
                <input
                  type="text"
                  value={JSON.stringify(items)}
                  name="items"
                  hidden
                  readOnly
                />
                <input
                  readOnly
                  hidden
                  name="reference"
                  value={payment_reference}
                  type="text"
                />
                <input
                  readOnly
                  hidden
                  name="subtotal"
                  value={getCartTotalWithoutDiscountsOrTax()}
                  type="number"
                />
                <h5 className="text-neutral-600 text-base font-medium font-tajawal leading-snug">
                  Subtotal: ({items.length} producto{items.length !== 1 && 's'})
                </h5>
                <span>
                  $
                  {numberToColombianPriceString(
                    getCartTotalWithoutDiscountsOrTax()
                  )}
                </span>
              </div>
              <label className="flex w-full justify-between text-base">
                <input
                  hidden
                  name="discount"
                  value={getProductDiscountAmount()}
                  type="number"
                  readOnly
                />
                <h5 className="text-neutral-600 text-base font-medium font-tajawal leading-snug">
                  Descuento
                </h5>
                <span>
                  $
                  {numberToColombianPriceString(getProductDiscountAmount()) ||
                    0}
                </span>
              </label>
              <label className="flex w-full justify-between">
                <input
                  type="number"
                  hidden
                  name="tax"
                  value={getCartTax()}
                  readOnly
                />
                <h5 className="text-neutral-600 text-base font-medium font-tajawal leading-snug">
                  IVA
                </h5>
                <span>${numberToColombianPriceString(getCartTax()) || 0}</span>
              </label>
              <label className="flex w-full justify-between">
                <input
                  type="number"
                  hidden
                  name="shipping"
                  readOnly
                  value={0}
                />
                <h5 className="text-neutral-600 text-base font-medium font-tajawal leading-snug">
                  Envío
                </h5>
                <span>Gratis</span>
              </label>
              <div className="self-stretch h-px bg-stone-300" />

              <label className="flex w-full justify-between">
                <input
                  readOnly
                  hidden
                  type="number"
                  name="total"
                  value={getCartTotal()}
                />
                <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                  Total
                </h5>
                <span>${numberToColombianPriceString(getCartTotal())}</span>
              </label>
            </section>
                  <section className="w-full flex pt-3 pb-16 items-center justify-end">
                    <button
                      className="dark-button max-w-screen-md w-full flex gap-2 text-lg justify-center items-center py-4"
                      onClick={() => setCartWindow(1)}
                    >
                      <MdOutlinePayments className="text-lg" /> Pagar Ahora{" "}
                      <LuExternalLink className="text-lg" />
                    </button>
                  </section>
                </div>
              </div>
            </section>
        </section>
      )}
      {isMobile && cartWindow === 1 ? null : (
        <section className=" flex flex-col max-w-screen-lg w-full h-full overflow-x-hidden">
          <header className="flex flex-col pt-8 md:pt-12">
              <div className="w-[85px] md:w-[130px] pb-3">
                <ArleBasicLogo />
              </div>
            <button
              className="md:hidden flex items-center -ml-1 group"
              onClick={toggleCart}
            >
              <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
              <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
                Volver
              </span>
            </button>
            <h2 className="md:hidden grow shrink basis-0 text-zinc-800 text-[26px] font-jomolhari pt-2">
              Tu Carrito de compras
            </h2>
          </header>
          <section className="flex flex-col h-full overflow-y-scroll w-full no-scrollbar relative">
            {items.length === 0 ? (
              <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
                No hay productos en el carrito
              </h3>
            ) : (
              <>
                <h3 className="sticky top-0 z-20 w-full bg-white text-zinc-800 text-xl font-normal font-tajawal leading-normal">
                  Resumen de la compra:
                </h3>
                <ul className="flex flex-col pt-6 gap-4">
                  {items.map((item) => {
                    return (
                      <>
                        <ProductItem key={item.variantId} item={item} />
                        <div className="self-stretch h-px bg-stone-300 opacity-10" />
                      </>
                    );
                  })}
                </ul>
              </>
            )}
          </section>
          <footer className="z-20 w-full bg-white pt-3 shadow-[0px_-3px_10px_6px_rgba(0,0,0,0.04)]">
            <section className="flex flex-col items-end gap-1 md:pb-10">
              <div className="flex w-full justify-between">
                <input
                  type="text"
                  value={JSON.stringify(items)}
                  name="items"
                  hidden
                  readOnly
                />
                <input
                  readOnly
                  hidden
                  name="reference"
                  value={payment_reference}
                  type="text"
                />
                <input
                  readOnly
                  hidden
                  name="subtotal"
                  value={getCartTotalWithoutDiscountsOrTax()}
                  type="number"
                />
                <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                  Subtotal
                </h5>
                <span>
                  $
                  {numberToColombianPriceString(
                    getCartTotalWithoutDiscountsOrTax()
                  )}
                </span>
              </div>
              <label className="flex w-full justify-between">
                <input
                  hidden
                  name="discount"
                  value={getProductDiscountAmount()}
                  type="number"
                  readOnly
                />
                <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                  Descuento
                </h5>
                <span>
                  $
                  {numberToColombianPriceString(getProductDiscountAmount()) ||
                    0}
                </span>
              </label>
              <label className="flex w-full justify-between">
                <input
                  type="number"
                  hidden
                  name="tax"
                  value={getCartTax()}
                  readOnly
                />
                <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                  IVA
                </h5>
                <span>${numberToColombianPriceString(getCartTax()) || 0}</span>
              </label>
              <label className="flex w-full justify-between">
                <input
                  type="number"
                  hidden
                  name="shipping"
                  readOnly
                  value={0}
                />
                <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
                  Envío
                </h5>
                <span>Gratis</span>
              </label>
              <div className="self-stretch h-px bg-stone-300" />

              <label className="flex w-full justify-between">
                <input
                  readOnly
                  hidden
                  type="number"
                  name="total"
                  value={getCartTotal()}
                />
                <h5 className="text-neutral-600 text-lg md:text-xl font-medium font-tajawal leading-snug">
                  Total
                </h5>
                <span className="md:text-lg">${numberToColombianPriceString(getCartTotal())}</span>
              </label>
            </section>
            <section className="w-full flex py-5 items-center justify-end">
              <button
                className="md:hidden dark-button flex gap-2 justify-center items-center h-12"
                onClick={() => setCartWindow(1)}
              >
                <MdOutlinePayments className="text-base" /> Pagar Pedido{" "}
                <FaArrowRight className="text-base" />
              </button>
            </section>
          </footer>
        </section>
      )}
      </form>
    </section>
  );
};

export default Cart;
