"use client";
import { useFormState } from "react-dom";
import { excelData, uploadFile, validateUser } from "./actions";
import { camelToTitleCase } from "@/utils/helpers";


function getProductTypeFromFileName(fileName: string): string | null {
  const productTypes = ['perfumeLujo', 'perfumePremium', 'relojesPremium', 'relojesLujo', 'gafasLujo', 'gafasPremium'];

  for (let productType of productTypes) {
    if (fileName.includes(productType)) {
      return productType;
    }
  }

  return null;
}

const ValidationForm = () => {
  const [userFormState, formAction] = useFormState(validateUser, { error: null, success: process.env.NODE_ENV === "development" });
  const [uploadFormState, uploadFormAction] = useFormState(uploadFile, { error: null, success: false, data: [], fileName: ""});

  const titles = uploadFormState.data?.slice(0, 3)

  if (userFormState.success) {
    console.log({ titles })
    return <div className="fixed top-0 z-[100] bg-white text-black w-screen min-h-screen overflow-scroll flex flex-col gap-5 justify-center">
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
      {uploadFormState.data && <>Subiendo {camelToTitleCase(getProductTypeFromFileName(uploadFormState.fileName) || "")}</>}
      {uploadFormState.data && <UploadedData data={uploadFormState.data} />}
      
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


const toCamelCase = (str: string) => {
  const words = str.split(' ');
  return [
    words[0].toLowerCase(),
    ...words.slice(1).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
  ].join('');
};

const arrayMessage = toCamelCase('Encuentra las opciones para este campo en la fila 5 de esta columna, las opciones deben ir en un solo campo separados por comas')

const setNestedProperty = (obj: any, path: string, value: any) => {
  if (path === '') {
    return value;
  }
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      current[keys[i]] = value;
    } else {
      current[keys[i]] = current[keys[i]] || {};
      current = current[keys[i]];
    }
  }
};

const UploadedData = ({ data }: { data: excelData[] }) => {
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

  // console.log({ingredientes: objects?[0].ingredientes});

  objects.forEach(moveEmptyKeyValuesToParent);
  console.log({ objects });
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

function moveEmptyKeyValuesToParent(obj: any) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if ('' in obj[key]) {
        obj[key] = obj[key][''];
      } else {
        moveEmptyKeyValuesToParent(obj[key]);
      }
    }
  }
}


const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="border border-black p-4">
      <h1>{product.variante.codigoDeReferencia}</h1>
      <p>{product.marca}</p>
      <p>{product.titulo}</p>
    </div>
  )
}