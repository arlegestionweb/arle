import { create } from "zustand";
import { TPerfumeDeLujoExcel, TPerfumePremiumExcel } from "./UploadedData";



// type TProductType = TPerfumeDeLujoExcel | TPerfumePremiumExcel;

type TPerfumeLujoUploadState = {
  products: TPerfumeDeLujoExcel[];
};

type TPerfumeLujoUploadActions = {
  addProducts: (products: TPerfumeDeLujoExcel[]) => void;
  updateProduct: (product: TPerfumeDeLujoExcel) => void;
};


type TProductUploadStore = TPerfumeLujoUploadState & TPerfumeLujoUploadActions;

export const usePerfumeLujoUploadStore = create<TProductUploadStore>((set) => ({
  products: [],
  addProducts: (products) => set((state) => {
    console.log({products})

    const newProducts = products.filter(product => !state.products.some(p => p.titulo === product.titulo));
    return ({ products: [...state.products, ...newProducts] });
  }),
  updateProduct: (newProduct) => set((state) => ({
    products: state.products.map((p) => {
      if (p.marca === newProduct.marca && p.titulo === newProduct.titulo) {
        return newProduct;
      }
      return p;
    })
  }))
}));


type TPerfumePremiumUploadState = {
  products: TPerfumePremiumExcel[];
};

type TPerfumePremiumUploadActions = {
  addProducts: (products: TPerfumePremiumExcel[]) => void;
  updateProduct: (product: TPerfumePremiumExcel) => void;
};


type TPerfumePremiumUploadStore = TPerfumePremiumUploadState & TPerfumePremiumUploadActions;

export const usePerfumePremiumUploadStore = create<TPerfumePremiumUploadStore>((set) => ({
  products: [],
  addProducts: (products) => set((state) => {
    const newProducts = products.filter(product => !state.products.some(p => p.titulo === product.titulo));
    return ({ products: [...state.products, ...newProducts] });
  }),
  updateProduct: (newProduct) => set((state) => ({
    products: state.products.map((p) => {
      if (p.marca === newProduct.marca && p.titulo === newProduct.titulo) {
        return newProduct;
      }
      return p;
    })
  }))
}));