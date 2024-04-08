import { create } from "zustand";
import { TProductType } from "./UploadedData";

type TProductUploadState = {
  products: TProductType[];
};

type TProductUploadActions = {
  addProducts: (products: TProductType[]) => void;
  updateProduct: (product: TProductType) => void;
};


type TProductUploadStore = TProductUploadState & TProductUploadActions;

export const useProductUploadStore = create<TProductUploadStore>((set) => ({
  products: [],
  addProducts: (products) => set((state) => {
    return ({ products: [...state.products, ...products] })}),
  updateProduct: (newProduct) => set((state) => ({
    products: state.products.map((p) => {
      if (p.marca === newProduct.marca && p.titulo === newProduct.titulo) {
        return newProduct;
      }
      return p;
    })
  }))
}));