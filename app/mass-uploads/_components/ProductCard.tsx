import { TProductType } from "./UploadedData";

const ProductCard = ({ product }: { product: TProductType }) => {
  return (
    <div className="border border-black p-4">
      <p><strong>Código: </strong>{product.variante.codigoDeReferencia}</p>
      <p><strong>Marca: </strong>{product.marca}</p>
      <p><strong>Modelo: </strong>{product.titulo}</p>
      <p><strong>Variante: </strong>{product.variante.tamano}</p>
      <p><strong>Imagenes: </strong></p>
      <ul className="flex gap-2">
        {product.imagenes.map((image, index) => (
          <li key={index}>
            <img className="w-[50px] h-[50px]" width={50} height={50} src={image as string} alt={product.titulo} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductCard;