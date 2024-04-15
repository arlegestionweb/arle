"use client"
import { z } from "zod";
import { arrayMessage, moveEmptyKeyValuesToParent, setNestedProperty, toCamelCase } from "../_helpers";
import ProductCard from "./ProductCard";
import { usePerfumeLujoUploadStore, usePerfumePremiumUploadStore } from "./productUploadStore";
import { useEffect } from "react";
import { excelData } from "../fileUpload";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { savePerfumesDeLujoProductsInSanityUsingForm } from "../saveProductActions/savePerfumesLujo";
import { savePerfumesPremiumInSanityUsingForm } from "../saveProductActions/savePerfumesPremium";
import { ZodObject } from 'zod';

const zodSiBoolean = z.string().optional().nullable().default('no').transform(value => value === 'si').or(z.boolean());

const perfumeDeLujoExcelSchema = z.object({
  titulo: z.string(),
  marca: z.string(),
  variantes: z.array(z.object({
    codigoDeReferencia: z.string().or(z.number()),
    precio: z.number(),
    precioConDescuento: z.number().optional().nullable(),
    registroInvima: z.string().or(z.number()),
    unidadesDisponibles: z.number(),
    mostrarUnidadesDisponibles: zodSiBoolean,
    tamano: z.string().or(z.number()),
    etiqueta: z.string().optional().nullable().transform(etiqueta => ({ tag: etiqueta })),
  })),
  concentracion: z.string(),
  descripcion: z.object({
    imagen: z.object({
      alt: z.string(),
      url: z.string().url(),
    }).optional().nullable(),
    texto: z.string(),
  }),
  genero: z.string(),
  ingredientes: z.array(z.string()),
  inspiracion: z.object({
    contenido: z.object({
      imagen: z.object({
        alt: z.string(),
        url: z.string().url(),
      }),
      resena: z.string().optional().nullable(),
    }).optional().nullable(),
    usarInspiracion: zodSiBoolean.optional().nullable(),
  }).optional().nullable(),
  mostrarCredito: zodSiBoolean,
  notasOlfativas: z.object({
    familiaOlfativa: z.string(),
    notasDeBase: z.array(z.string()),
    notasDeCorazon: z.array(z.string()),
    notasDeSalida: z.array(z.string()),
  }),
  paisDeOrigen: z.string(),
  parteDeUnSet: zodSiBoolean,
  imagenes: z.array(z.string().or(z.object({
    url: z.string().url(),
    _id: z.string()
  }))),
  coleccionDeMarca: z.string().optional().nullable(),
});
const perfumePremiumExcelSchema = z.object({
  titulo: z.string(),
  marca: z.string(),
  variantes: z.array(z.object({
    codigoDeReferencia: z.string().or(z.number()),
    precio: z.number(),
    precioConDescuento: z.number().optional().nullable(),
    registroInvima: z.string().or(z.number()),
    unidadesDisponibles: z.number(),
    mostrarUnidadesDisponibles: zodSiBoolean,
    tamano: z.string().or(z.number()),
    etiqueta: z.string().optional().nullable().transform(etiqueta => ({ tag: etiqueta })),
  })),
  coleccionDeMarca: z.string().optional().nullable(),
  descripcion: z.string(),
  detalles: z.object({
    concentracion: z.string(),
    genero: z.string(),
    notasOlfativas: z.object({
      familiaOlfativa: z.string(),
      notasDeBase: z.array(z.string()),
      notasDeCorazon: z.array(z.string()),
      notasDeSalida: z.array(z.string()),
    }),
    resenaCorta: z.string().optional().nullable(),
  }),
  mostrarCredito: zodSiBoolean,
  parteDeUnSet: zodSiBoolean,
  imagenes: z.array(z.string().or(z.object({
    url: z.string().url(),
    _id: z.string()
  }))),
});

type ProductType = "perfumeLujo" | "perfumePremium" | "relojesPremium" | "relojesLujo" | "gafasLujo" | "gafasPremium";

type ProductTypes = {
  [K in ProductType]: ZodObject<any>;
};

const productTypes: ProductTypes = {
  perfumeLujo: perfumeDeLujoExcelSchema,
  perfumePremium: perfumePremiumExcelSchema,
  relojesPremium: perfumeDeLujoExcelSchema,
  relojesLujo: perfumeDeLujoExcelSchema,
  gafasLujo: perfumeDeLujoExcelSchema,
  gafasPremium: perfumeDeLujoExcelSchema,
}
// export type TProductType = z.infer<typeof productTypes[keyof typeof productTypes]>;

export type TPerfumeDeLujoExcel = z.infer<typeof perfumeDeLujoExcelSchema>;
export type TPerfumePremiumExcel = z.infer<typeof perfumePremiumExcelSchema>;

export type TProductType = TPerfumeDeLujoExcel | TPerfumePremiumExcel;

const UploadedData = ({ data, productType }: { data: excelData[]; productType: null | 'perfumeLujo' | 'perfumePremium' | 'relojesPremium' | 'relojesLujo' | 'gafasLujo' | 'gafasPremium' }) => {


  const { addProducts: addPerfumesLujo, products: perfumesLujo } = usePerfumeLujoUploadStore()
  const { addProducts: addPerfumesPremium, products: perfumesPremium } = usePerfumePremiumUploadStore()

  // const updateProduct = useProductUploadStore<TProductType>(state => state.updateProduct);
  // const storeProducts = useProductUploadStore. getState().products; const addProducts = useProductUploadStore<TProductType>(state => state.addProducts);
  // console.log({ state: storeProducts })

  // storeProducts.
  const [perfumeDeLujoFormState, perfumeDeLujoFormAction] = useFormState(savePerfumesDeLujoProductsInSanityUsingForm, { error: null, success: false });
  const [perfumePremiumFormState, perfumePremiumFormAction] = useFormState(savePerfumesPremiumInSanityUsingForm, { error: null, success: false });

  const keys = data.slice(0, 4).map(row => row.values);

  const products = data.slice(4).reduce((acc: any[], row) => {
    let obj: { [key: string]: any; marca?: string; titulo?: string; variante?: any; imagenes?: string[] } = {}; let previousKey = '';
    if (Array.isArray(row.values)) {
      row.values.forEach((value, index) => {
        let key = keys.reduce((acc, curr) => {
          if (Array.isArray(curr)) {
            const part = curr[index];
            return typeof part === 'string' ? `${acc}.${toCamelCase(part)}` : acc;
          }
          return acc;
        }, '').substring(1); // Remove the leading dot

        if (key.includes(arrayMessage) || key.includes("notasDeBase")) {
          const arrayValue = typeof value === 'string' ? value.split(', ') : [];
          let newKey = key.split(arrayMessage)[0];
          if (newKey === '') {
            newKey = previousKey;
          }
          obj = setNestedProperty(obj, newKey, arrayValue) || obj;
        } else {
          previousKey = key;
          obj = setNestedProperty(obj, key, value) || obj;
        }
      });
      const images = ['image-1', 'image-2', 'image-3', 'image-4', 'image-5', 'image-6'].map(key => obj[key]).filter(Boolean);

      const existingProduct = acc.find(
        (p) => p.marca === obj.marca && p.titulo === obj.titulo
      );

      if (existingProduct) {
        if (Array.isArray(existingProduct.variantes)) {
          existingProduct.variantes.push(obj.variante);
        } else {
          existingProduct.variantes = [obj.variante];
        }

        // Add variant images to existing product
        existingProduct.imagenes = Array.from(new Set([...(existingProduct.imagenes || []), ...images]));
      } else {
        acc.push({
          ...obj,
          variantes: [obj.variante],
          imagenes: Array.from(new Set(images)),
        });
      }
    }

    return acc;
  }, []);

  products.forEach(moveEmptyKeyValuesToParent);


  useEffect(() => {
    if (!productType) {
      return;
    }
    if (productType === "perfumeLujo") {
      const zodProds = z.array(perfumeDeLujoExcelSchema).safeParse(products);
      // console.log(productType, {zodProds})
      if (zodProds.success) {
        addPerfumesLujo(zodProds.data);
      }
    }
    if (productType === "perfumePremium") {
      const zodProds = z.array(perfumePremiumExcelSchema).safeParse(products);
      // console.log(productType, { zodProds })
      if (!zodProds.success) {
        return console.log({ errors: zodProds.error })
      }
      // console.log(productType, {zodProds})
      addPerfumesPremium(zodProds.data);
    }

  }, [data]);
  // console.log({perfumesPremium})

  if (!data || !productType) {
    return null;
  }

  return (
    <section className="flex flex-col items-center">
      {productType === 'perfumeLujo' && (
        <>
          <ul className="flex flex-col gap-2">
            {perfumesLujo.map((product, index) => (
              <li key={index}>
                <ProductCard product={product} productType={productType} />
              </li>
            ))}
          </ul>
          {!perfumeDeLujoFormState.success && (
            <form action={() => perfumeDeLujoFormAction({ products: perfumesLujo as TPerfumeDeLujoExcel[], productType })}>
              <Submit />
            </form>
          )}

          {perfumeDeLujoFormState.success && (
            <>
              <p className="text-green-600 text-base">Productos guardados con éxito</p>
              <Link href="/mass-uploads">
                Volver al inicio
              </Link>
            </>
          )}
          {perfumeDeLujoFormState.error && <p className="text-red-600 text-base">{perfumeDeLujoFormState.error}</p>}
        </>
      )}
      {productType === 'perfumePremium' && (
        <>
          <ul className="flex flex-col gap-2">
            {perfumesPremium.map((product, index) => (
              <li key={index}>
                <ProductCard product={product} productType={productType} />
              </li>
            ))}
          </ul>
          {!perfumeDeLujoFormState.success && (
            <form action={() => perfumePremiumFormAction({ products: perfumesPremium as TPerfumePremiumExcel[], productType })}>
              <Submit />
            </form>
          )}

          {perfumePremiumFormState.success && (
            <>
              <p className="text-green-600 text-base">Productos guardados con éxito</p>
              <Link href="/mass-uploads">
                Volver al inicio
              </Link>
            </>
          )}
          {perfumePremiumFormState.error && <p className="text-red-600 text-base">{perfumePremiumFormState.error}</p>}
        </>
      )}
      {/* {productType === 'perfumePremium' && (
        <>
          {!perfumePremiumFormState.success && (
            <form action={() => perfumePremiumFormAction({ products: perfumesLujo as TPerfumePremiumExcel[], productType })}>
              <Submit />
            </form>
          )}

          {perfumePremiumFormState.success && (
            <>
              <p className="text-green-600 text-base">Productos guardados con éxito</p>
              <Link href="/mass-uploads">
                Volver al inicio
              </Link>
            </>
          )}
          {perfumePremiumFormState.error && <p className="text-red-600 text-base">{perfumePremiumFormState.error}</p>}
        </>
      )} */}
    </section>
  )
}

export default UploadedData;


const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <button className="light-button border border-black my-4 px-2">
      {pending ? "Guardando..." : "Guardar"}
    </button>
  )
}
