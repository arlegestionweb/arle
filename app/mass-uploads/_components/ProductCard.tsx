import useFileDrop from "@/app/_components/hooks/useFileDrop";
import { TProductType } from "./UploadedData";
import { uploadImages } from "./uploadImages";
import SingleImageUpload from "./SingleImageUpload";
import MultipleImageUpload from "./MultipleImageUpload";

const ProductCard = ({ product }: { product: TProductType }) => {
  useFileDrop('imageUpload', uploadImages);
  return (
    <div className="border border-black p-4 flex justify-between">
      {/* <p><strong>Código: </strong>{product.variante.codigoDeReferencia}</p> */}
      <section className="min-w-300px">

        <p><strong>Marca: </strong>{product.marca}</p>
        <p><strong>Modelo: </strong>{product.titulo}</p>
        <p><strong>Variantes: </strong>
          {product.variantes.map((variant) => variant.tamano).join(', ')}
          <strong> Codigos De Ref: </strong>
          {product.variantes.map((variant) => variant.codigoDeReferencia).join(', ')}
        </p>
      </section>
      {!product.descripcion.imagen ? (
        <SingleImageUpload product={product} title="Imagen de la descripción:" />
      ) : (
        <section>
          <h4 className="font-bold">Imagen de la descripción</h4>
          <img className="w-[50px] h-[50px]" width={50} height={50} src={typeof product.descripcion.imagen === "string" ? product.descripcion.imagen : product.descripcion.imagen.url} alt={product.titulo} />
        </section>
      )}
      {product.imagenes.length > 0 ? (
        <section>
          <p><strong>Imagenes del producto: </strong></p>
          <ul className="flex gap-2">
            {product.imagenes.map((image, index) => (
              <li key={index}>
                <img className="w-[50px] h-[50px]" width={50} height={50} src={typeof image === "string" ? image : image.url} alt={product.titulo} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <MultipleImageUpload product={product} title="Imágenes del producto" />
      )}
    </div>
  )
}

export default ProductCard;