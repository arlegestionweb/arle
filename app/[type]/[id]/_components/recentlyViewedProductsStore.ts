import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { create } from "zustand";

type TRecentlyViewedProductsState = {
  recentlyViewedProducts: TProduct[];
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
  create<TRecentlyViewedProductsStore>((set, get) => {
    const getProductsFromLocalStorage = () => {
      if (typeof window !== 'undefined') {
        const products = localStorage.getItem("arle-recentlyViewedProducts");
        if (products) {
          set(() => ({ recentlyViewedProducts: JSON.parse(products) }));
        }
      }
    };

    // Call getProductsFromLocalStorage during initialization
    getProductsFromLocalStorage();

    return {
      recentlyViewedProducts: [],
      addProduct: (product: TProduct) =>
        set((state) => {
          const newProducts = state.recentlyViewedProducts.filter(
            (p) => p._id !== product._id
          );
          newProducts.unshift(product);
          const productsToStore = newProducts.slice(0, 6); // Keep only the first 6 products
          localStorage.setItem(
            "arle-recentlyViewedProducts",
            JSON.stringify(productsToStore)
          );
          return { recentlyViewedProducts: productsToStore };
        }),
      removeProduct: (product: TProduct) =>
        set((state) => {
          const newProducts = state.recentlyViewedProducts.filter(
            (p) => p._id !== product._id
          );
          localStorage.setItem(
            "arle-recentlyViewedProducts",
            JSON.stringify(newProducts)
          );
          return { recentlyViewedProducts: newProducts };
        }),
      clearProducts: () =>
        set(() => {
          localStorage.removeItem("arle-recentlyViewedProducts");
          return { recentlyViewedProducts: [] };
        }),
      getProductsFromLocalStorage,
    };
  });