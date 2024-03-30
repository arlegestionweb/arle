"use client";
import { useFormState } from "react-dom";
import { excelData, uploadFile, validateUser } from "./actions";
import { camelToTitleCase } from "@/utils/helpers";
import { arrayMessage, moveEmptyKeyValuesToParent, setNestedProperty, toCamelCase } from "./_helpers";
import ProductCard from "./_components/ProductCard";
import { z } from "zod";

type TProductTypes = 'perfumeLujo' | 'perfumePremium' | 'relojesPremium' | 'relojesLujo' | 'gafasLujo' | 'gafasPremium';


function getProductTypeFromFileName(fileName: string): TProductTypes | null {
  const productTypes: TProductTypes[] = ['perfumeLujo', 'perfumePremium', 'relojesPremium', 'relojesLujo', 'gafasLujo', 'gafasPremium'];

  for (let productType of productTypes) {
    if (fileName.includes(productType)) {
      return productType as TProductTypes;
    }
  }


  return null;
}

const ValidationForm = () => {
  // const [userFormState, formAction] = useFormState(validateUser, { error: null, success: process.env.NODE_ENV === "development" });
  const [userFormState, formAction] = useFormState(validateUser, { error: null, success: false });
  const [uploadFormState, uploadFormAction] = useFormState(uploadFile, { error: null, success: false, data: [], fileName: "" });

  if (userFormState.success) {
    const productType = getProductTypeFromFileName(uploadFormState.fileName || '');
    return <div className="fixed top-0 z-[100] bg-white text-black w-screen min-h-screen max-h-[800px] overflow-scroll flex flex-col gap-5 justify-center">
      <div className="flex gap-2 items-center flex-col max-w-lg mx-auto text-center">
        <h1 className="text-black text-2xl">Genere un archivo de excel</h1>
        {/* <form action={generateExcelFile}> */}

        <a href="/mass-uploads/generateExcelFile?file=perfumeLujo" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para Perfume de Lujo
        </a>
        <a href="/mass-uploads/generateExcelFile?file=perfumePremium" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para Perfume Premium
        </a>
        <a href="/mass-uploads/generateExcelFile?file=gafasLujo" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para gafas de Lujo
        </a>
        <a href="/mass-uploads/generateExcelFile?file=gafasPremium" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para gafas Premium
        </a>
        <a href="/mass-uploads/generateExcelFile?file=relojesLujo" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para relojes de Lujo
        </a>
        <a href="/mass-uploads/generateExcelFile?file=relojesPremium" className="bg-white w-full text-black border border-black px-10">
          Generar Excel para relojes Premium
        </a>
        <form action={uploadFormAction}>
          <input type="file" name="file" />
          <button type="submit" className="bg-white text-black border border-black px-2">
            Upload file
          </button>
        </form>
      </div>
      {/* </form> */}
      {/* <Titles titles={titles} /> */}
      {uploadFormState.data && productType && <>Subiendo {camelToTitleCase(productType)}</>}
      {uploadFormState.data && <UploadedData data={uploadFormState.data} productType={getProductTypeFromFileName(uploadFormState.fileName)} />}

    </div>
  }

  return (
    <div className="fixed top-0 z-[100] bg-white text-black w-screen h-screen flex items-center justify-center">
      <form action={formAction} className="flex flex-col gap-4">
        <label className="flex flex-col" htmlFor="email">
          <span>E-mail</span>
          <input className="border border-black" type="email" name="email" />
        </label>
        <label className="flex flex-col" htmlFor="password">
          <span>Password</span>
          <input className="border border-black" type="password" name="password" />
        </label>
        <button type="submit" className="bg-white text-black border border-black">
          Submit
        </button>
        {userFormState.error && <p className="text-red-600 text-base">{userFormState.error}</p>}
      </form>
    </div>
  );
}

export default ValidationForm;

const perfumeDeLujoExcelSchema = z.object({
  titulo: z.string(),
  marca: z.string(),
  variante: z.object({
    codigoDeReferencia: z.string(),
    precio: z.number(),
    precioConDescuento: z.number(),
    registroInvima: z.string(),
    unidadesDisponibles: z.number(),
    mostrarUnidadesDisponibles: z.boolean(),
    tamano: z.number(),
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
      resena: z.string(),
    }),
    usarInspiracion: z.string(),
  }),
  mostrarCredito: z.string(),
  notasOlfativas: z.object({
    familiaOlfativa: z.string(),
    notasDeBase: z.string(),
    notasDeCorazon: z.array(z.string()),
    notasDeSalida: z.array(z.string()),
  }),
  paisDeOrigen: z.string(),
  parteDeUnSet: z.string(),
  "image-1": z.string().url().optional().nullable(),
  "image-2": z.string().url().optional().nullable(),
  "image-3": z.string().url().optional().nullable(),
  "image-4": z.string().url().optional().nullable(),
  "image-5": z.string().url().optional().nullable(),
  "image-6": z.string().url().optional().nullable(),
});

const UploadedData = ({ data, productType }: { data: excelData[]; productType: null | 'perfumeLujo' | 'perfumePremium' | 'relojesPremium' | 'relojesLujo' | 'gafasLujo' | 'gafasPremium' }) => {
  if (!data || !productType) {
    return null;
  }

  const keys = data.slice(0, 4).map(row => row.values);

  const objects = data.slice(4).map(row => {
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

        if (key.includes(arrayMessage)) {
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

  objects.forEach(moveEmptyKeyValuesToParent);
  console.log({ objects })
  return (
    <>
      <ul>
        {objects.map((product, index) => (
          <li key={index}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  )
}



