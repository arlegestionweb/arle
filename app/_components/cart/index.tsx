"use client";
import ProductItem from "./ProductItem";
import { numberToColombianPriceString } from "@/utils/helpers";
import { redirect, usePathname } from "next/navigation";
import AddedToCartModal from "./AddedToCartModal";
import { useCartStore } from "./store";
import ShippingForm from "./ShippingForm";
import CodigoDeDescuento from "./CodigoDeDescuento";
import { GoChevronLeft } from "react-icons/go";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { MdOutlinePayments } from "react-icons/md";
import ArleBasicLogo from "../ArleBasicLogo";
import SmallWhiteSpinner from "../SmallWhiteSpinner";
import { FaArrowRight } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import { createInvoiceAction } from "./createInvoiceAction";
import { TAddiAmounts } from "./types";

const Cart = ({ showDiscountCode }: { showDiscountCode: boolean }) => {
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
  } = useCartStore((state) => state);

  const [cartWindow, setCartWindow] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [formState, formAction] = useFormState(createInvoiceAction, {
    success: false,
    errors: null,
    redirectionUrl: '',
  });

  const [addiAmounts, setAddiAmounts] = useState<TAddiAmounts>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("wompi");
  const cartTotal = getCartTotal();

  const [errorPaths, setErrorPaths] = useState<string[]>([]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Limpiar el efecto al desmontar el modal para restaurar el scroll
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (formState && formState.errors) {
      const paths = formState.errors.map((error) => error.path);
      setErrorPaths(paths);
      setPaymentLoading(false);
    }
    if(formState.redirectionUrl && formState.success === true && paymentLoading){
      setPaymentLoading(false);
      redirect(formState.redirectionUrl)
    }
  }, [formState]);

  useEffect(() => {
    if (window !== undefined) {
      setAddiAmounts(JSON.parse(localStorage.getItem("addiAmounts") || 'null'));
    }
  }, [toggleCart, cartTotal]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    initializeCartState();
  }, [initializeCartState]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault(); // Evita la acción predeterminada de retroceder
  
      if (!isMobile) {
        // Para escritorio
        if (isCartOpen) {
          toggleCart(); // Cierra el carrito si está abierto
          window.history.pushState(null, "", window.location.pathname);
        }
      } else {
        // Para móviles
        if (isCartOpen) {
          if (cartWindow === 1) {
            setCartWindow(0); // Cambia a la vista de carrito sin contenido adicional
          } else {
            toggleCart(); // Cierra el carrito si está abierto
          }
          window.history.pushState(null, "", window.location.pathname); 
        }
      }
    };
    if (isCartOpen && window.history.state === null) {
      window.history.pushState({ cartOpen: true }, "", window.location.pathname);
    }
  
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isCartOpen, cartWindow, toggleCart, isMobile]);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  if (pathname.includes("/admin")) return null;
  if (isAddedToCartModalOpen) return <AddedToCartModal />;
  if (!isCartOpen) return null;

  const addiDisabled =
    (addiAmounts && cartTotal > addiAmounts.maxAmount) ||
    (addiAmounts && cartTotal < addiAmounts.minAmount)
      ? true
      : false;

  return (
    <section className="bg-white z-[150] w-screen fixed top-0 bottom-0 left-0 flex justify-center no-scrollbar default-paddings overflow-hidden">
      <form
        action={formAction}
        className="z-[160] max-w-screen-xl flex justify-center w-full gap-6 relative"
      >
        {isMobile && cartWindow === 0 ? null : (
          <section className="flex flex-col  w-full h-full overflow-x-hidden scrollbar-hide lg:pr-4 xl:pr-12">
            <header className="flex flex-col sticky top-0 bg-white z-50 pt-8 md:pt-12 pb-3">
              <div className="md:hidden w-[130px] pb-3">
                <ArleBasicLogo />
              </div>
              <button
                className="flex items-center -ml-1 group"
                onClick={() => (isMobile ? setCartWindow(0) : toggleCart())}
              >
                <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
                <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
                  Volver
                </span>
              </button>
              <h2 className="hidden md:block grow shrink basis-0 text-zinc-800 text-[26px] font-jomolhari pt-2">
                Tu Carrito de compras
              </h2>
            </header>
            <ShippingForm errorPaths={errorPaths} />
            <section>
              <div className="pt-4">
                <h3 className="text-zinc-600 text-xl font-bold font-tajawal leading-normal">
                  Selecciona tu medio de pago:
                </h3>

                <div className="flex flex-col gap-3">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                    <div className="flex items-start gap-2">
                      <label className="flex items-center cursor-pointer relative">
                        <input
                          name="paymentMethod"
                          type="radio"
                          checked={selectedPayment === "wompi"}
                          onChange={handlePaymentChange}
                          value="wompi"
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-arle-blue"
                        />
                        <span className="absolute bg-arle-blue w-2.5 h-2.5 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </label>

                      <div className="text-sm">
                        <label className="font-medium leading-none text-gray-900 dark:text-white">
                          {" "}
                          Wompi{" "}
                        </label>
                        <p
                          id="credit-card-text"
                          className="mt-1 text-xs md:text-sm font-normal text-gray-500 dark:text-gray-400"
                        >
                          Paga con tarjeta crédito, débito, PSE, Nequi o transferencia
                          Bancolombia.
                        </p>
                        <div className="flex h-10 gap-1 mt-3 ">
                          <div className="h-10 w-[55px] rounded-sm border border-gray-200 bg-white flex items-center justify-center">
                            <img
                              className="w-[36px] object-contain"
                              src="/Mastercard-logo.svg"
                              alt="logo Mastercard"
                            />
                          </div>
                          <div className="h-10 w-[55px] rounded-sm border border-gray-200 bg-white flex items-center justify-center">
                            <img
                              className="w-12 object-contain"
                              src="/Visa_Logo.webp"
                              alt="logo Visa"
                            />
                          </div>
                          <div className="h-10 w-[55px] rounded-sm border border-gray-200 bg-white flex items-center justify-center">
                            <img
                              className="w-7 object-contain"
                              src="/amex.webp"
                              alt="logo Amex"
                            />
                          </div>
                          <div className="h-10 w-[55px] rounded-sm border border-gray-200 bg-white flex items-center justify-center">
                            <img
                              className="w-10 object-contain"
                              src="/Bancolombia.webp"
                              alt="logo Bancolombia"
                            />
                          </div>
                          <div className="h-10 w-[55px] rounded-sm border border-gray-200 bg-white flex items-center justify-center">
                            <img
                              className="w-8 object-contain"
                              src="/logo-pse.webp"
                              alt="logo pse"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 ">
                    <div className="flex items-start gap-2">
                      <label className={`${!addiDisabled && 'cursor-pointer'} relative flex  items-center`}>
                        <input
                          name="paymentMethod"
                          disabled={addiDisabled}
                          type="radio"
                          checked={selectedPayment === "addi"}
                          onChange={handlePaymentChange}
                          value="addi"
                          className={`${!addiDisabled && 'cursor-pointer'} peer h-4 w-4 appearance-none rounded-full border border-slate-300 checked:border-arle-blue`}
                        />
                        <span className="absolute bg-arle-blue w-2.5 h-2.5 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </label>

                      <div className="text-sm">
                        <label className="font-medium leading-none text-gray-900 dark:text-white">
                          Addi
                        </label>
                        <p className="mt-1 text-xs md:text-sm font-normal text-gray-500 dark:text-gray-400">
                          Paga a cuotas con Addi
                        </p>
                        <div className="flex h-10 gap-1 mt-3">
                          <div className="h-10 w-[55px] rounded-sm border border-gray-200 bg-white flex items-center justify-center">
                            <img
                              className="w-11 object-contain"
                              src="/addiLogo.webp"
                              alt="logo pse"
                            />
                          </div>
                          <div className="h-10 w-[55px] rounded-sm border border-gray-200 bg-white flex items-center justify-center">
                            <img
                              className="w-8 object-contain"
                              src="/logo-pse.webp"
                              alt="logo pse"
                            />
                          </div>
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
                          numberToColombianPriceString(addiAmounts?.maxAmount)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 gap-4">
                    <svg
                      className="h-24"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-252.3 356.1 163 80.9"
                    >
                      <path
                        fill="none"
                        stroke="#707070"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"
                      ></path>
                      <circle
                        cx="-227.8"
                        cy="361.9"
                        r="1.8"
                        fill="#707070"
                      ></circle>
                      <circle
                        cx="-222.2"
                        cy="361.9"
                        r="1.8"
                        fill="#707070"
                      ></circle>
                      <circle
                        cx="-216.6"
                        cy="361.9"
                        r="1.8"
                        fill="#707070"
                      ></circle>
                      <path
                        fill="none"
                        stroke="#707070"
                        stroke-miterlimit="10"
                        stroke-width="2"
                        d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"
                      ></path>
                    </svg>
                    <p className="text-zinc-600 text-sm font-light font-inter leading-tight">
                      Después de hacer click en pagar serás redirigido a la
                      plataforma de pago de {selectedPayment.toUpperCase()} para
                      completar tu pago de forma segura.
                    </p>
                  </div>
                  {showDiscountCode && <CodigoDeDescuento />}
                  <p className="text-zinc-600 text-xl font-bold font-tajawal leading-none pt-4 md:hidden">
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
                        value={id}
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
                        Subtotal: ({items.length} producto
                        {items.length !== 1 && "s"})
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
                        {numberToColombianPriceString(
                          getProductDiscountAmount()
                        ) || 0}
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
                      <span>
                        ${numberToColombianPriceString(getCartTax()) || 0}
                      </span>
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
                      <span>
                        ${numberToColombianPriceString(getCartTotal())}
                      </span>
                    </label>
                  </section>
                  <section className="w-full flex flex-col pt-3 h-36 items-center justify-start gap-2">
                    <button
                      className="dark-button max-w-screen-md w-full flex gap-2 text-lg justify-center items-center py-4"
                      type="submit"
                      onClick={()=> setPaymentLoading(true)}
                    >
                      {paymentLoading ? (
                        <div className="flex gap-5 items-center">
                        <SmallWhiteSpinner/>
                        Procesando tus datos
                        </div>
                      ) : (
                        <>
                        <MdOutlinePayments className="text-lg" /> Paga Ahora
                      <LuExternalLink className="text-lg" />
                        </>
                      )}
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
              <div className="w-[130px] md:w-[130px] pb-3">
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
                        <div className="flex flex-col" key={item.variantId}>
                          <ProductItem item={item} />
                          <div className="self-stretch h-px bg-stone-300 opacity-30" />
                        </div>
                      );
                    })}
                  </ul>
                </>
              )}
            </section>
            <footer className="z-20 w-full bg-white pt-3 shadow-[0px_-3px_10px_6px_rgba(0,0,0,0.025)]">
              <section className="flex flex-col items-end gap-1 md:pb-10 z-[100]">
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
                    value={id}
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
                  <span>
                    ${numberToColombianPriceString(getCartTax()) || 0}
                  </span>
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
                  <span className="md:text-lg">
                    ${numberToColombianPriceString(getCartTotal())}
                  </span>
                </label>
              </section>
              <section className="w-full flex py-5 items-center justify-end">
                <button
                  className="md:hidden dark-button max-w-screen-md flex gap-2 justify-center items-center h-12"
                  onClick={() => setCartWindow(1)}
                  disabled={items.length === 0}
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
