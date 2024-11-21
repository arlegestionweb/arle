import { customAlphabet } from 'nanoid';
import { BooleanSchemaType } from 'sanity';
import { z } from "zod";
import { create } from "zustand";
import { checkAddiAmounts } from './addiAuthAction';

const TAX = 0.19;

export const zodCartItem = z.object({
  productId: z.string(),
  productName: z.string(),
  productCode: z.string().or(z.number()),
  variantId: z.string().or(z.number()),
  price: z.number(),
  quantity: z.number(),
  productType: z.union([
    z.literal("perfumePremium"),
    z.literal("perfumeLujo"),
    z.literal("relojesPremium"),
    z.literal("relojesLujo"),
    z.literal("gafasPremium"),
    z.literal("gafasLujo"),
  ]),
  discountType: z.union([
    z.literal("none"),
    z.literal("timedDiscount"),
    z.literal("discountedPrice"),
  ]),
  originalPrice: z.number(),
});

export type TCartItem = z.infer<typeof zodCartItem>;

type TCartState = {
  id: string;
  items: TCartItem[];
  isCartOpen: boolean;
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
  resetCartId: () => void;
  getCartSubtotal: () => number;
  getCartTotalBeforeShipping: () => number;
  getCartTotal: () => number;
  getProductDiscountAmount: () => number;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  initializeCartState: () => void;
  applyDiscountCode: (code: string, discount: number) => void;
  removeDiscountCode: () => void;
  toggleAddedToCartModal: () => void;
  setItemAddedToCart: (item?: TCartItem) => void;
  getCartTotalWithoutDiscountsOrTax: () => number;
  getCartTax: () => number;
  getShippingCost: () => number;
};

type TCartStore = TCartState & TCartActions;

const getCartIdFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("arle-cartId");
  }
};

// Function to set the cart ID in localStorage
const setCartIdInLocalStorage = (id: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("arle-cartId", id);
  }
};

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 21);

const id = nanoid();

// Get the existing cart ID from localStorage, or generate a new one if it doesn't exist
let cartId = getCartIdFromLocalStorage();
if (!cartId) {
  cartId = id;
  setCartIdInLocalStorage(cartId);
}



export const useCartStore = create<TCartStore>((set, get) => ({
  id: cartId!,
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
  removeDiscountCode: () => set((state: TCartState)=>{
    return { ... state, discountCode: null};
  }),
  getProductDiscountAmount: () => {
    const items: TCartItem[] = get().items;
    // let total = 0;
    const discountCode = get().discountCode;

    let totalDiscount = 0;

    if(discountCode){
    const total = get().getCartTotalBeforeShipping();
      totalDiscount = total * discountCode.discount / 100;
      return Math.round(totalDiscount)
    }
    else{
      for (const item of items) {
        const discountAmountPerItem = item.originalPrice - item.price;
        const totalDiscountForItem = discountAmountPerItem * item.quantity;
        totalDiscount += totalDiscountForItem;
      }
      return Math.round(totalDiscount);    
    }
    

    // if (discountCode) {
    //   const discountAmount = total * (discountCode?.discount || 100 / 100);
    //   return Math.round(discountAmount);
    // }

    // return 0;
  },
  items:
    typeof window !== "undefined" && localStorage.getItem("arle-cart")
      ? JSON.parse(localStorage.getItem("arle-cart")!)
      : [],

  addItem: async (item: TCartItem) => {
    const addiValidAmounts = await checkAddiAmounts(get().getCartTotal())
    if (typeof window !== "undefined") {
      localStorage.setItem('addiAmounts', JSON.stringify(addiValidAmounts));
    }
    set( (state: TCartState) => {
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
        : { ...i, quantity: i.quantity + 1 }
      );
    } else {
      // Item is not in the cart, add it
      newItems = [...state.items, item];
    }
    
    if (typeof window !== "undefined") {
        localStorage.setItem("arle-cart", JSON.stringify(newItems));
      }

      const inCart = get().isCartOpen;

      return { items: newItems, isAddedToCartModalOpen: inCart ? false : true, itemAddedToCart: item };
    })
  },
  clearCart: () =>
    set(() => {
      localStorage.removeItem("arle-cart");
      const newCartId = nanoid();
      localStorage.setItem("arle-cartId", newCartId );
      localStorage.setItem("","")
      localStorage.setItem("arle-cartOpen", JSON.stringify(false))
      return { items: [], id: newCartId };
    }),
 
  resetCartId: () => 
    set(() => {
      localStorage.removeItem("arle-cart");
      const newCartId = nanoid();
      localStorage.setItem("arle-cartId", newCartId );
      localStorage.setItem("","")
      localStorage.setItem("arle-cartOpen", JSON.stringify(false))
      return { id: newCartId };
    }),

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
        localStorage.setItem("arle-cart", JSON.stringify(newItems));
      }

      return { items: newItems };
    }),
  removeAllOfOneItem: (item: TCartItem) =>
    set((state: TCartState) => {
      const newItems = state.items.filter(
        (i) => i.productId !== item.productId || i.variantId !== item.variantId
      );


      if (typeof window !== "undefined") {
        localStorage.setItem("arle-cart", JSON.stringify(newItems));
      }

      return { items: newItems };
    }),

  isCartOpen: false,

  toggleCart: async () => {
    const currentCartOpen = get().isCartOpen;
    const newCartOpenState = !currentCartOpen;

    // Actualizar el estado global del carrito
    set({ isCartOpen: newCartOpenState });

    // Guardar el nuevo estado en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("arle-cartOpen", JSON.stringify(newCartOpenState));
    }
  },
  openCart: async () => {
    const currentCartOpen = get().isCartOpen;
    if(!currentCartOpen) {
      set({ isCartOpen: true })
      if (typeof window !== "undefined") {
        localStorage.setItem("arle-cartOpen", JSON.stringify(true));
      }
    };
  },

  closeCart: async () => {
    const currentCartOpen = get().isCartOpen;
    if(currentCartOpen) {
    set({ isCartOpen: false });

    // Guardar el nuevo estado en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("arle-cartOpen", JSON.stringify(false));
    }
    }
  },

  initializeCartState: () => {
    if (typeof window !== "undefined") {
      const storedCartOpen = localStorage.getItem("arle-cartOpen");
      if (storedCartOpen !== null) {
        set({ isCartOpen: JSON.parse(storedCartOpen) });
      }
    }
  },
  getCartTax: () => {
    const items: TCartItem[] = get().items;
    let total = 0;

    items.forEach((item) => (total += item.price * item.quantity));
    const tax = +(total * TAX).toFixed(0);

    return tax;
  },
  getCartTotalWithoutDiscountsOrTax: () => {
    const items: TCartItem[] = get().items;
  let total = 0;

  items.forEach((item) => (total += item.originalPrice * item.quantity));

  const tax = get().getCartTax();
  const totalWithoutTax = +(total - tax).toFixed(0);

  return totalWithoutTax;

  },
  getCartSubtotal: () => {
    const items: TCartItem[] = get().items;
    let total = 0;

    items.forEach((item) => (total += item.originalPrice * item.quantity));

    return total;
  },
  
  getCartTotalBeforeShipping: () => {
    const items: TCartItem[] = get().items;
    let total = 0;
    const discountCode = get().discountCode;

    if(discountCode){
      items.forEach((item) => (total += item.originalPrice * item.quantity));
      return total
    } else {
      items.forEach((item) => (total += item.price * item.quantity));
      return total;
    }
  },
  
  getShippingCost: () => {
    const items: TCartItem[] = get().items;
    // const total = get().getCartTotalBeforeShipping();

    if(items.length === 0){
      return 0;
    }
    // if (total >= 250000) {
    //   return 0;
    // }
    return 0;
  },
  getCartTotal: () => {
    const total = get().getCartTotalBeforeShipping();
    const discount = get().discountCode;
    // const tax = get().getCartTax();
    const shipping = get().getShippingCost();

    if(discount) {
      return Math.round(total * (1 - discount.discount /100)) + shipping
    }
    else {
      return Math.round(total + shipping);
    }
  }
  
}));
