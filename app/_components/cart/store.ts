import { create } from "zustand";

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
  isAddedToCartModalOpen: boolean;
  itemAddedToCart: TCartItem | null;
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
  toggleAddedToCartModal: () => void;
  setItemAddedToCart: (item?: TCartItem) => void;
};

type TCartStore = TCartState & TCartActions;

export const useCartStore = create<TCartStore>((set, get) => ({
  isAddedToCartModalOpen: false,
  toggleAddedToCartModal: () =>
    set((state) => ({ isAddedToCartModalOpen: !state.isAddedToCartModalOpen })),
  itemAddedToCart: null,
  setItemAddedToCart: (item?: TCartItem) =>
    set(() => ({ itemAddedToCart: item || null })),
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
      if (item.quantity <= 0) {
        return state;
      }

      const existingItemIndex = state.items.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );

      let newItems: TCartItem[];

      if (existingItemIndex >= 0) {
        // Item already exists in the cart, update the quantity
        newItems = state.items.map((i, index) =>
          index !== existingItemIndex
            ? i
            : { ...i, quantity: i.quantity + item.quantity }
        );
      } else {
        // Item is not in the cart, add it
        newItems = [...state.items, item];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems));
      }

      return { items: newItems, isAddedToCartModalOpen: true, itemAddedToCart: item };
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

      // console.log({ newItems });

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newItems));
      }

      return { items: newItems };
    }),
  isCartOpen: false,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
