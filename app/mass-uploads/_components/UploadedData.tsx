import { z } from "zod";
import { excelData, saveProductsInSanity } from "../actions";
import { arrayMessage, moveEmptyKeyValuesToParent, setNestedProperty, toCamelCase } from "../_helpers";
import ProductCard from "./ProductCard";


const zodSiBoolean = z.string().transform(value => value === 'si');

const perfumeDeLujoExcelSchema = z.object({
  titulo: z.string(),
  marca: z.string(),
  variante: z.object({
    codigoDeReferencia: z.string(),
    precio: z.number(),
    precioConDescuento: z.number().optional().nullable(),
    registroInvima: z.string().or(z.number()),
    unidadesDisponibles: z.number(),
    mostrarUnidadesDisponibles: zodSiBoolean,
    tamano: z.string().or(z.number()),
  }),
  concentracion: z.string(),
  descripcion: z.object({
    imagen: z.object({
      alt: z.string(),
      url: z.string().url(),
    }),
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
    usarInspiracion: zodSiBoolean,
  }),
  mostrarCredito: zodSiBoolean,
  notasOlfativas: z.object({
    familiaOlfativa: z.string(),
    notasDeBase: z.array(z.string()),
    notasDeCorazon: z.array(z.string()),
    notasDeSalida: z.array(z.string()),
  }),
  paisDeOrigen: z.string(),
  parteDeUnSet: zodSiBoolean,
  "image-1": z.string().url().optional().nullable(),
  "image-2": z.string().url().optional().nullable(),
  "image-3": z.string().url().optional().nullable(),
  "image-4": z.string().url().optional().nullable(),
  "image-5": z.string().url().optional().nullable(),
  "image-6": z.string().url().optional().nullable(),
}).transform(rawData => {
  const imagenes: string[] = [];
  for (let i = 1; i <= 6; i++) {
    const key = `image-${i}` as keyof typeof rawData;
    if (rawData[key] && typeof rawData[key] === 'string') {
      imagenes.push(rawData[key] as string);
    }
  }
  return { ...rawData, imagenes };
});
const productTypes = {
  perfumeLujo: perfumeDeLujoExcelSchema,
  // perfumePremium: perfumeDeLujoExcelSchema,
  // relojesPremium: perfumeDeLujoExcelSchema,
  // relojesLujo: perfumeDeLujoExcelSchema,
  // gafasLujo: perfumeDeLujoExcelSchema,
  // gafasPremium: perfumeDeLujoExcelSchema,
}

export type TProductType = z.infer<typeof productTypes[keyof typeof productTypes]>;


const UploadedData = ({ data, productType }: { data: excelData[]; productType: null | 'perfumeLujo' | 'perfumePremium' | 'relojesPremium' | 'relojesLujo' | 'gafasLujo' | 'gafasPremium' }) => {
  if (!data || !productType) {
    return null;
  }


  const keys = data.slice(0, 4).map(row => row.values);

  const products = data.slice(4).map(row => {
    let obj = {};
    let previousKey = '';
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
    }
    return obj;
  });

  products.forEach(moveEmptyKeyValuesToParent);


  const zodProducts = z.array(productTypes[productType as keyof typeof productTypes]).safeParse(products);

  console.log({ products, zodProducts })
  if (!zodProducts.success) {
    return <div className="fixed top-0 z-[100] bg-white text-black w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-black text-2xl">Errores en la validación del archivo</h1>
        <ul>
          {zodProducts.error.errors.map((error, index) => (
            <li key={index}>
              <p>{error.message}</p>
              <p>{JSON.stringify(error)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  }


  return (
    <section>
      <ul className="flex flex-col gap-2">
        {zodProducts.data.map((product, index) => (
          <li key={index}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <button onClick={() => {
        saveProductsInSanity(zodProducts.data, productType)
      }}>Guardar</button>
    </section>
  )
}

export default UploadedData;

