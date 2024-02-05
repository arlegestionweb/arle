import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { create } from "zustand";

type TRecentlyViewedProductsState = {
  products: TProduct[];
};

type TRecentlyViewedProductsActions = {
  getProductsFromLocalStorage: () => void;
  addProduct: (product: TProduct) => void;
  removeProduct: (product: TProduct) => void;
  clearProducts: () => void;
};

type TRecentlyViewedProductsStore = TRecentlyViewedProductsState &
  TRecentlyViewedProductsActions;

export const useRecentlyViewedProductsStore =
  create<TRecentlyViewedProductsStore>((set, get) => ({
    products: [],
    addProduct: (product: TProduct) =>
      set((state) => {
        const newProducts = state.products.filter((p) => p._id !== product._id);
        newProducts.unshift(product);
        localStorage.setItem(
          "recentlyViewedProducts",
          JSON.stringify(newProducts.slice(0, 5))
        );
        return { products: newProducts.slice(0, 5) };
      }),
    removeProduct: (product: TProduct) =>
      set((state) => {
        const newProducts = state.products.filter((p) => p._id !== product._id);
        localStorage.setItem(
          "recentlyViewedProducts",
          JSON.stringify(newProducts)
        );
        return { products: newProducts };
      }),
    clearProducts: () =>
      set(() => {
        localStorage.removeItem("recentlyViewedProducts");
        return { products: [] };
      }),
    getProductsFromLocalStorage: () => {
      const products = localStorage.getItem("recentlyViewedProducts");
      if (products) {
        set(() => ({ products: JSON.parse(products) }));
      }
    },
  }));
