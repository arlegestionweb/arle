"use client";
import { create } from "zustand";
import ProductItem from "./ProductItem";
import { numberToColombianPriceString } from "@/utils/helpers";
import Button from "../Button";
import { ChevronLeftIcon } from "@sanity/icons";
import { usePathname } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { cn } from "@/app/_lib/utils";
import { useState } from "react";
import { zodApiResponseSchema } from "@/app/checkout/discount-code/zod";

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
  discountCode: {
    code: string;
    discount: number;
  } | null;
};

type TCartActions = {
  addItem: (item: TCartItem) => void;
  removeItem: (item: TCartItem) => void;
  removeAllOfOneItem: (item: TCartItem) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
  getDiscountAmount: () => number;
  toggleCart: () => void;
  applyDiscountCode: (code: string, discount: number) => void;
};

type TCartStore = TCartState & TCartActions;

export const useCartStore = create<TCartStore>((set, get) => ({
  discountCode: null,
  applyDiscountCode: (code: string, discount: number) =>
    set((state: TCartState) => {
      // You might want to add some validation logic here to ensure that the discount code is valid

      return { ...state, discountCode: { code, discount } };
    }),
  getDiscountAmount: () => {
    const items: TCartItem[] = get().items;
    let total = 0;

    items.forEach((item) => (total += item.price * item.quantity));

    const discountCode = get().discountCode;

    if (discountCode) {
      const discountAmount = total * (discountCode.discount / 100);
      return Math.round(discountAmount);
    }

    return 0;
  },
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

    const discountAmount = get().getDiscountAmount();

    if (discountAmount) {
      total -= total - discountAmount;
    }

    return total;
  },
  getCartSubtotal: () => {
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
  const pathname = usePathname();
  const {
    items,
    isCartOpen,
    toggleCart,
    clearCart,
    getCartTotal,
    getDiscountAmount,
    getCartSubtotal,
  } = useCartStore((state) => state);

  if (pathname.includes("/admin")) return null;

  if (!isCartOpen) return null;

  return (
    <section className="bg-white z-[60] w-screen min-h-screen fixed top-0 left-0 flex ">
      <button
        className="absolute top-10 left-8 flex items-center"
        onClick={toggleCart}
      >
        <ChevronLeftIcon className="w-8 h-8" />
        <span className="text-black text-sm font-medium font-inter leading-[21px]">
          Regresar
        </span>
      </button>
      <section className="flex-1 pt-16 px-10">
        <h2 className="grow shrink basis-0 text-zinc-800 text-[32px] font-semibold font-crimson leading-9">
          Carrito de compras
        </h2>
        <ShippingForm />
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
          <CodigoDeDescuento />

          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              Subtotal
            </h5>
            <span>${numberToColombianPriceString(getCartSubtotal())}</span>
          </div>
          <div className="flex w-full justify-between">
            <h5 className="text-neutral-600 text-lg font-medium font-tajawal leading-snug">
              Descuento
            </h5>
            <span>${numberToColombianPriceString(getDiscountAmount())}</span>
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




const CodigoDeDescuento = () => {
  const [isDiscountVerified, setIsDiscountVerified] = useState(false);
  const { applyDiscountCode } = useCartStore((state) => state);

  // const [discountCodes, setDiscountCodes] = useState<TDiscountCode[] | undefined>(undefined);

  const handleDiscountCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // if (value === "DCTO30") {
    //   setIsDiscountVerified(true);
    //   applyDiscountCode(value, 30);
    // } else {
    //   setIsDiscountVerified(false);
    // }

    const response = await fetch("checkout/discount-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: value }),
    });

    const res = await response.json();

    const parsedResponse = zodApiResponseSchema.safeParse(res);

    if (!parsedResponse.success) {
      console.error(parsedResponse.error);
      return;
    }

    if (parsedResponse.data.status !== 200) return;

    if (parsedResponse.data.status === 200) {
      setIsDiscountVerified(true);
      applyDiscountCode(
        parsedResponse.data.body.discountCode.codigo,
        parsedResponse.data.body.discountCode.porcentaje
      );
    }
  };
  return (
    <label
      htmlFor={"discountCode"}
      className="text-zinc-800 text-lg font-medium font-tajawal leading-snug flex flex-col"
    >
      <h4 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">
        Código de descuento
      </h4>

      <div className="flex">
        <input
          className="w-full h-9 px-3 py-1.5 bg-white rounded-tl rounded-bl  border border-stone-300 focus:outline-none focus:border-black"
          name={"discountCode"}
          id={"discountCode"}
          placeholder={"DCTO30"}
          onChange={handleDiscountCodeChange}
        />
        <div className="w-[46px] h-9 bg-zinc-200 rounded-tr rounded-br border-r border-t border-b border-stone-300 justify-center items-center gap-1 inline-flex">
          <FaCheck
            className={cn(
              "w-3.5 h-3.5",
              isDiscountVerified ? "text-green-700" : "text-stone-300"
            )}
          />
        </div>
      </div>
    </label>
  );
};

type TInputComponent =
  | {
      name: string;
      type?: "text" | "number" | "id" | "email";
      title?: string;
      placeholder: string;
      options?: string[];
    }
  | {
      name: string;
      type?: "select";
      title?: string;
      placeholder?: string;
      options: string[]; // This prop is required when type is "pais"
    };

const InputComponent = ({
  name,
  type = "text",
  title,
  placeholder,
  options,
}: TInputComponent) => {
  if (type === "text" || type === "email" || type === "number")
    return (
      <label
        htmlFor={name}
        className="text-zinc-800 text-lg font-medium font-tajawal leading-snug flex flex-col"
      >
        <h4>{title || name}</h4>
        <input
          className="w-full h-9 px-3 py-1.5 bg-white rounded border border-stone-300 focus:outline-none focus:border-black"
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
        />
      </label>
    );

  if (type === "id")
    return (
      <label htmlFor={name}>
        <h4 className="text-zinc-800 text-lg font-medium font-tajawal leading-snug">
          {title || name}
        </h4>
        <div className="flex">
          <select
            name="idType"
            className="w-[58px] h-9 pl-2 py-[5px] bg-zinc-200 rounded-tl rounded-bl border-l border-t border-b border-stone-300"
          >
            <option value="cc">CC</option>
            <option value="ti">TI</option>
            <option value="ce">CE</option>
            <option value="pp">Pasaporte</option>
          </select>

          <input
            className="w-full h-9 px-3 bg-white rounded-tr rounded-br border border-stone-300"
            type="number"
            name={name}
            id={name}
            placeholder={placeholder}
          />
        </div>
      </label>
    );
  if (type === "select")
    return (
      <label
        htmlFor={name}
        className="text-zinc-800 text-lg font-medium font-tajawal leading-snug flex flex-col"
      >
        <h4>{title || name}</h4>
        <select
          className="w-full h-9 px-3 py-1.5 bg-white rounded border border-stone-300 focus:outline-none focus:border-black"
          name={name}
          id={name}
        >
          {options?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
    );
};

const ShippingForm = () => {
  const availableCountries = ["Colombia"];
  return (
    <form className="flex flex-col gap-4">
      <h3 className="text-zinc-800 text-xl font-bold font-tajawal leading-normal">
        Información de envío
      </h3>

      <InputComponent
        name="nombre"
        placeholder="Kamilo Stevan Alomías Correa"
        title="Nombre completo"
      />

      <InputComponent
        name="identificacion"
        placeholder="123456789"
        title="Identificación"
        type="id"
      />

      <InputComponent
        name="telefono"
        placeholder="3001234567"
        title="Teléfono"
        type="number"
      />

      <InputComponent
        name="email"
        placeholder="email@ejemplo.com.co"
        title="Nombre completo"
        type="email"
      />

      <InputComponent
        name="pais"
        type="select"
        options={availableCountries}
        title="País"
      />

      <div className="flex justify-between gap-2">
        <InputComponent name="ciudad" placeholder="Cali" title="Ciudad" />
        <InputComponent
          name="codigoPostal"
          placeholder="760002"
          title="Código Postal"
        />
      </div>
      <InputComponent
        name="direccion"
        placeholder="Cra. 98 #16-200"
        title="Dirección de envío"
      />
    </form>
  );
};
