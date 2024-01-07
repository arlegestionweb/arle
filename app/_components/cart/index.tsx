"use client";
import { useEffect } from "react";
import { create } from "zustand";
import ProductItem from "./ProductItem";
import { numberToColombianPriceString } from "@/utils/helpers";
import Button from "../Button";

export type TCartItem = {
  productId: string;
  variantId: string;
  price: number;
  quantity: number;
  productType:
    | "perfumePremium"
    | "perfumeLujo"
    | "relojesPremium"
    | "relojesLujo"
    | "gafasPremium"
    | "gafasLujo";
};

type TCartState = {
  isCartOpen: boolean;
  items: TCartItem[];
};

type TCartActions = {
  addItem: (item: TCartItem) => void;
  removeItem: (item: TCartItem) => void;
  removeAllOfOneItem: (item: TCartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  toggleCart: () => void;
};

type TCartStore = TCartState & TCartActions;

export const useCartStore = create<TCartStore>((set, get) => ({
  items:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : [],

  addItem: (item: TCartItem) =>
    set((state: TCartState) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      let newItems: TCartItem[];

      if (existingItemIndex >= 0) {
        // Item already exists in the cart, update the quantity
        newItems = state.items.map((i, index) =>
          index !== existingItemIndex ? i : { ...i, quantity: i.quantity + 1 }
        );
      } else {
        // Item is not in the cart, add it
        newItems = [...state.items, item];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems));
      }

      return { items: newItems };
    }),
  clearCart: () =>
    set(() => {
      localStorage.removeItem("cart");
      return { items: [] };
    }),
  getCartTotal: () => {
    const items: TCartItem[] = get().items;
    let total = 0;

    items.forEach((item) => (total += item.price * item.quantity));

    return total;
  },
  removeItem: (item: TCartItem) =>
    set((state: TCartState) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      let newItems: TCartItem[];

      if (
        existingItemIndex >= 0 &&
        state.items[existingItemIndex].quantity > 1
      ) {
        // Item exists in the cart and quantity is more than one, decrement the quantity
        newItems = state.items.map((i, index) =>
          index !== existingItemIndex ? i : { ...i, quantity: i.quantity - 1 }
        );
      } else {
        // Item quantity is one or item does not exist, remove it
        newItems = state.items.filter(
          (i) =>
            i.productId !== item.productId || i.variantId !== item.variantId
        );
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems));
      }

      return { items: newItems };
    }),
  removeAllOfOneItem: (item: TCartItem) =>
    set((state: TCartState) => {
      const newItems = state.items.filter(
        (i) => i.productId !== item.productId || i.variantId !== item.variantId
      );

      console.log({ newItems });

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems));
      }

      return { items: newItems };
    }),
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

const Cart = () => {
  const { items, isCartOpen, toggleCart, clearCart } = useCartStore(
    (state) => state
  );

  // useEffect(() => {
  //   if (isCartOpen) {
  //     document.body.style.overflow = "hidden";
  //     document.body.style.height = "100dvh";
      
  //   } else {
  //     document.body.style.height = "auto";
  //     document.body.style.overflow = "auto";
  //   }

  //   // Cleanup function to reset overflow when component unmounts
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <section className="bg-white z-[60] w-screen min-h-screen fixed top-0 left-0 flex ">
      <button className="absolute top-10 left-10" onClick={toggleCart}>
        {"< Regresar"}
      </button>
      <section className="bg-red-200 flex-1 pt-16 pl-10">
        <h2>Carrito de compras</h2>
      </section>
      <section className="bg-neutral-100 flex-1 px-12 py-[122px] flex flex-col gap-5 max-h-screen overflow-y-scroll">
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
          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              Subtotal
            </h5>
            <span>
              $
              {numberToColombianPriceString(
                useCartStore.getState().getCartTotal()
              )}
            </span>
          </div>
          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              Descuento
            </h5>
            <span>$0</span>
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
            <span>
              $
              {numberToColombianPriceString(
                useCartStore.getState().getCartTotal()
              )}
            </span>
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
