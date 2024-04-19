"use client";
import { useFormState } from "react-dom";
import { uploadFile } from "../../fileUpload";
import { TProductTypesForUpload } from "./utils";
import { camelToTitleCase } from "@/utils/helpers";
import UploadedData from "../../_components/UploadedData";
import { useState } from "react";

const UploadFiles = () => {
  const [productType, setProductType] = useState<TProductTypesForUpload>("perfumeLujo");

  const productTypesArray: TProductTypesForUpload[] = ['perfumeLujo', 'perfumePremium', 'relojesPremium', 'relojesLujo', 'gafasLujo', 'gafasPremium'];

  return (
    <>
      <h1 className="font-semibold mt-5">Escoge el tipo de archivo</h1>
      <select name="" id="" value={productType} onChange={(e) => setProductType(e.target.value as TProductTypesForUpload)} className="border border-black px-2 py-1 my-5">
        {productTypesArray.map(option => <option key={option} value={option}>{camelToTitleCase(option)}</option>)}
      </select>
      {productType && <UploadComponent title={`Subir Archivo de ${camelToTitleCase(productType)}`} productType={productType} />}
    </>
  );
}

export default UploadFiles;


const UploadComponent = ({ title, productType }: {
  title: string;
  productType: TProductTypesForUpload;
}) => {
  const [uploadFormState, uploadFormAction] = useFormState(uploadFile, { error: null, success: false, data: [], fileName: "" });

  return (
    <>
      {!uploadFormState.success ? (
        <form
          action={uploadFormAction}
        >
          <label htmlFor="file" className="flex flex-col gap-5 border border-black px-10 py-5">
            <h2>
              {title}
            </h2>
            <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="file" />
            <button type="submit" className="bg-white text-black border border-black px-2">
              Subir Archivo
            </button>
          </label>
        </form>
      ) : (
        <a href="/mass-uploads/upload">subir un archivo diferente</a>
      )}

      {uploadFormState.data && uploadFormState.data.length >= 1 && productType && <h2 className="font-semibold">{camelToTitleCase(productType)}</h2>}
      {uploadFormState.data && uploadFormState.data.length >= 1 && <UploadedData data={uploadFormState.data} productType={productType} />}
      {uploadFormState.error && <p className="text-red-600 text-base">{uploadFormState.error}</p>}

    </>
  )
};