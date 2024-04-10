"use client";
import { useEffect, useState } from "react";
import { saveImageToSanity } from "./saveImageToSanity";
import { useFormState } from "react-dom";
import { TProductType } from "./UploadedData";

const SingleImageUpload = ({ title, product, onImageUpload }: {
  title: string;
  product: TProductType;
  onImageUpload: (product: TProductType, imageUrl: string) => void;
}) => {
  const [image, setImage] = useState<File | null>(null);

  const [formState, formAction] = useFormState(saveImageToSanity, {
    status: "pending",
    message: "",
    image: undefined
  })

  useEffect(() => {
    if (formState.status === "success" && formState.image) {
      onImageUpload(product, formState.image.url);
    }
  }, [formState.status, formState.image]);


  return (
    <section className="flex flex-col">
      <h4 className="font-bold">{title}</h4>
      {/* {formState.status === "success" && formState.image?.url ? (
        <Image src={formState.image?.url} alt="Uploaded Image" width={200} height={200} />
      ) : ( */}
      <form className="max-w-1/3" action={formAction}>
        <label htmlFor="imageUpload" id="imageUpload" className="flex flex-col items-center p-5 gap-2  bg-gray-200 border border-dashed border-black ">
          <span>Subir o arrastrar imagen para la descripcion acá</span >
          <input accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} type="file" name="imageUpload" />
        </label >
        {image && (
          <button className="border border-black px-2 py-1">Guardar Imagen</button>
        )}
      </form >
      {/* )} */}
    </section>
  );
}

export default SingleImageUpload;