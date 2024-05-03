"use client"
import { z } from "zod";
import { arrayMessage, moveEmptyKeyValuesToParent, setNestedProperty, toCamelCase } from "../_helpers";
import ProductCard from "./ProductCard";
import { usePerfumeLujoUploadStore, usePerfumePremiumUploadStore } from "./productUploadStore";
import { useEffect, useState } from "react";
import { excelData } from "../fileUpload";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { savePerfumesPremiumInSanityUsingForm } from "../saveProductActions/savePerfumesPremium";
import { ZodObject } from 'zod';
import { TError, savePerfumesLujo } from "../saveProductActions/newSavePerfumesLujo";

const zodSiBoolean = z.string().optional().nullable().default('no').transform(value => value === 'si').or(z.boolean());


const inspiracionWithResena = z.object({
  contenido: z.object({
    imagen: z.object({
      alt: z.string(),
      id: z.string().optional().nullable(),
      url: z.string()
    }).optional().nullable(),
    resena: z.string().min(1, "no hay resena de inspiracion"),
  }),
  usarInspiracion: zodSiBoolean.refine(value => value === true),
});

const inspiracionWithoutResena = z.object({
  // contenido: z.object({
  //   id: z.string().optional().nullable(),
  // }),
  usarInspiracion: zodSiBoolean.refine(value => value === false),
});

const zodInspiracion = z.union([inspiracionWithResena, inspiracionWithoutResena]).optional().nullable();


const perfumeDeLujoExcelSchema = z.object({
  titulo: z.string(),
  marca: z.string(),
  variantes: z.array(z.object({
    codigoDeReferencia: z.string().or(z.number()),
    precio: z.number(),
    precioConDescuento: z.number().optional().nullable(),
    registroInvima: z.string().or(z.number()).optional().nullable(),
    unidadesDisponibles: z.number(),
    mostrarUnidadesDisponibles: zodSiBoolean,
    tamano: z.string().or(z.number()),
    etiqueta: z.string().optional().nullable().transform(etiqueta => ({ tag: etiqueta })),
  })),
  concentracion: z.string(),
  descripcion: z.object({
    imagen: z.object({
      alt: z.string(),
      id: z.string().optional().nullable(),
      url: z.string()
    }).optional().nullable(),
    texto: z.string(),
  }),
  genero: z.string(),
  ingredientes: z.array(z.string()),
  inspiracion: zodInspiracion,
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
    registroInvima: z.string().or(z.number()).optional().nullable(),
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

const handleZodValidation = (data: any, schema: z.ZodSchema<any>, setErrors: React.Dispatch<React.SetStateAction<string[] | null>>) => {
  const zodResult = z.array(schema).safeParse(data);

  if (!zodResult.success) {
    const errorMessages = zodResult.error.errors.map(err => {
      const path = err.path
        .filter((_, index) => index !== 2) // Remove the second '0'
        .map((part, index) => index === 0 ? Number(part) + 1 : part) // Adjust the product index
        .join(' > ');

      return `Error en el producto ${(path)}: ${err.message}`;
    });
    setErrors(errorMessages);
  } else {
    return zodResult.data
  }
}

// type ProductType = "perfumeLujo" | "perfumePremium" | "relojesPremium" | "relojesLujo" | "gafasLujo" | "gafasPremium";

// type ProductTypes = {
//   [K in ProductType]: ZodObject<any>;
// };

// const productTypes: ProductTypes = {
//   perfumeLujo: perfumeDeLujoExcelSchema,
//   perfumePremium: perfumePremiumExcelSchema,
//   relojesPremium: perfumeDeLujoExcelSchema,
//   relojesLujo: perfumeDeLujoExcelSchema,
//   gafasLujo: perfumeDeLujoExcelSchema,
//   gafasPremium: perfumeDeLujoExcelSchema,
// }

export type TPerfumeDeLujoExcel = z.infer<typeof perfumeDeLujoExcelSchema>;
export type TPerfumePremiumExcel = z.infer<typeof perfumePremiumExcelSchema>;

export type TProductType = TPerfumeDeLujoExcel | TPerfumePremiumExcel;

const UploadedData = ({ data, productType }: { data: excelData[]; productType: null | 'perfumeLujo' | 'perfumePremium' | 'relojesPremium' | 'relojesLujo' | 'gafasLujo' | 'gafasPremium' }) => {

  const [uploadErrors, setUploadErrors] = useState<string[] | null>(null);

  const { addProducts: addPerfumesLujo, products: perfumesLujo } = usePerfumeLujoUploadStore()
  const { addProducts: addPerfumesPremium, products: perfumesPremium } = usePerfumePremiumUploadStore()


  const [perfumeDeLujoFormState, perfumeDeLujoFormAction] = useFormState(savePerfumesLujo, { message: undefined, errors: [], success: false });
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
        (p) => {
          return (p.marca === obj.marca && p.titulo === obj.titulo) || (p.marca === obj.marca && p.modelo !== undefined && p.modelo === obj.modelo)
        }

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
        if (productType?.includes("perfume")) {

          acc.push({
            ...obj,
            variantes: [obj.variante],
            imagenes: Array.from(new Set(images)),
          });
        } else {
          acc.push({
            ...obj,
            variantes: [{ ...obj.variante, imagenes: Array.from(new Set(images)) }]
          })
        }
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
      const prods = handleZodValidation(products, perfumeDeLujoExcelSchema, setUploadErrors)
      if (prods) {

        
        addPerfumesLujo(prods)
      }
    }
    if (productType === "perfumePremium") {
      const prods = handleZodValidation(products, perfumePremiumExcelSchema, setUploadErrors)
      if (prods) {
        addPerfumesPremium(prods)
      }
    }
    // if (productType === "gafasLujo") {
    //   // console.log("here", products)
    //   const prods = handleZodValidation(products, gafasLujoExcelSchema, setUploadErrors)
    //   if (!prods) {
    //     return setUploadErrors(["Error en la validación de los productos, por favor revisa los datos y vuelve a intentar."]);
    //   }
    //   addGafasLujo(prods)
    // }
  }, [data]);

  if (!data || !productType) {
    return null;
  }

  return (
    <section className="flex flex-col items-center w-full max-w-3xl">
      {/* <button onClick={reset} >volver a intentar</button> */}
      {productType === 'perfumeLujo' && (
        <ProductUpload
          formAction={perfumeDeLujoFormAction}
          formState={perfumeDeLujoFormState}
          productType={productType}
          products={perfumesLujo as TPerfumeDeLujoExcel[]}
          uploadErrors={uploadErrors}
        />
      )}
      {productType === 'perfumePremium' && (
        <ProductUpload
          formAction={perfumePremiumFormAction}
          formState={perfumePremiumFormState}
          productType={productType}
          products={perfumesPremium as TPerfumePremiumExcel[]}
          uploadErrors={uploadErrors}
        />
      )}
      {/* {productType === 'gafasLujo' && (
        <ProductUpload
          formAction={gafasLujoFormAction}
          formState={gafasLujoFormState}
          productType={productType}
          products={gafasLujo as TGafasLujoExcel[]}
          uploadErrors={uploadErrors}
        />
      )} */}
      {uploadErrors && uploadErrors.length > 0 && uploadErrors.map((error, i) => <p className="text-red-600 text-base" key={error + i}>{error}</p>)}
    </section>
  )
}

export default UploadedData;


const Guardar = () => {
  const { pending } = useFormStatus();

  return (
    <button className="light-button border border-black my-4 px-2">
      {pending ? "Guardando..." : "Guardar"}
    </button>
  )
}

const ProductUpload = ({ productType, products, formState, formAction, uploadErrors }: {
  productType: string;
  products: (TPerfumePremiumExcel | TPerfumeDeLujoExcel)[];
  formState: { error: string | null; success: boolean, message?: string } | { errors: TError[] | null; success: boolean; message?: string };
  formAction: (data: any) => void;
  uploadErrors: string[] | null;
}) => {

  const [errors, setErrors] = useState<null | TError[]>()

  useEffect(() => {
    // console.log("running useEffect")
    setErrors(null)
    if ("errors" in formState && formState.errors) {
      // console.log(formState.errors)
      setErrors(formState.errors)
    }
  }, [formState])

  // console.log({ formState })
  return (
    <>
      {formState.success ? (
        <>
          {formState.message && <p className="text-green-600 text-base">{formState.message}</p>}
          {/* <p className="text-green-600 text-base">Productos guardados con éxito</p> */}
          <Link href="/mass-uploads">
            Volver al inicio
          </Link>
        </>
      ) : (
        !uploadErrors && (
          <section className="pb-10 flex flex-col">
            <ul className="flex flex-col gap-10 w-full">
              {products.map((product, index) => (
                <li key={index} className="">
                  <ProductCard product={product} productType={productType} />
                </li>
              ))}
            </ul>
            <form action={() => {
              // formState.errors = null
              formAction({ products, productType })
            }}
              className="">
              <Guardar />
            </form>
            {'error' in formState && formState.error && <p className="text-red-600 text-base">{formState.error}</p>}
            {errors && errors.length > 0 && errors.map((error, i) => <p className="text-red-600 text-base" key={`${error.message}-${i}`}>
              {error.product && <>
                <span className="ml-1">
                  {error.product.marca}
                </span>
                {"modelo" in error.product && (
                  <span className="ml-1">
                    {error.product.modelo}
                  </span>
                )}
                {"titulo" in error.product && (
                  <span className="ml-1">
                    {error.product.titulo}
                  </span>
                )}
              </>}
              {error.path && <>
                <span className="ml-1">
                  {pathToHumanReadable(error.path)}
                </span>
              </>}
              <span className="ml-1">
                {error.message.replace("Required", "Requerido").replace("Invalid input", "Item Invalido o Requerido")}
              </span>
            </p>)}
          </section>
        )
      )}
    </>
  )
};

const pathToHumanReadable = (path: string) => {
  const pathParts = path.split('.');
  const pathMapping: { [key: string]: string } = {
    variantes: 'Variants',
    imagenes: 'Images',
  };
  return pathParts
    .slice(1) // Skip the first part of the path
    .map((part, index) => {
      // If the part is a number, add 1 to it
      if (!isNaN(Number(part))) {
        return `item ${Number(part) + 1}`;
      }
      // Otherwise, map it to a human-readable string
      return pathMapping[part] || part;
    })
    .join(' > ');
};