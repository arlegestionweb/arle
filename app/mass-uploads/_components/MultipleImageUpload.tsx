import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { saveImageArrayToSanity } from "./saveImageArrayToSanity";
import Image from "next/image";
import { useProductUploadStore } from "./productUploadStore";
import { TProductType } from "./UploadedData";

const MultipleImageUpload = ({
  title,
  product
}: {
  title: string
  product: TProductType
}) => {
  const [images, setImages] = useState<File[]>([]);

  const { updateProduct } = useProductUploadStore();

  const [formState, formAction] = useFormState(saveImageArrayToSanity, {
    status: "pending",
    message: "",
    images: undefined
  })

  const action = async (formData: FormData) => {
    formAction(formData);
  }

  useEffect(() => {
    if (formState.status === "success" && formState.images) {
      const newProd = {
        ...product,
        imagenes: formState.images
      }
      console.log("updating:", { oldProd: product, newProd, mess: formState.message });
      updateProduct(newProd);
    }
  }, [formState.status, formState.images]);


  return (
    <section className="flex flex-col">
      <h4 className="font-bold">{title}</h4>
      <form className="max-w-1/3" action={action}>
        <label htmlFor="imageUpload" id="imageUpload" className="flex flex-col items-center p-5 gap-2  bg-gray-200 border border-dashed border-black ">
          <span>Subir o arrastrar imagenes del producto acá</span>
          <input accept="image/*" onChange={(e) => setImages(e.target.files ? Array.from(e.target.files) : [])} multiple type="file" name="imageUpload" />
        </label>
        {images.length > 0 && (
          <button className="border border-black px-2 py-1">Guardar Imagenes en base de datos</button>
        )}
      </form>
    </section>
  );
}

export default MultipleImageUpload;