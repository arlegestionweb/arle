import { TPerfumeDeLujoExcel, TProductType } from "./UploadedData";
import SingleImageUpload from "./SingleImageUpload";
import MultipleImageUpload from "./MultipleImageUpload";
import { usePerfumeLujoUploadStore } from "./productUploadStore";


const isPerfumeDeLujo = (product: TProductType): product is TPerfumeDeLujoExcel => {
  return (product as TPerfumeDeLujoExcel).inspiracion !== undefined;
};


const ProductCard = ({ product }: { product: TProductType }) => {
  // useFileDrop('imageUpload', uploadImages);


  return (
    <>
      {isPerfumeDeLujo(product) && (<PerfumeLujoCard product={product} />)}
    </>

  )
}

export default ProductCard;

const PerfumeLujoCard = ({ product }: { product: TPerfumeDeLujoExcel }) => {
  // const addProducts = useProductUploadStore(state => state.addProducts);
  // const updateProduct = useProductUploadStore<TProductType>(state => state.updateProduct);

  const perfumeLujoStore = usePerfumeLujoUploadStore()

  const {updateProduct} = perfumeLujoStore;
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

      {product.inspiracion?.usarInspiracion && product.inspiracion.contenido?.imagen == null ? (
        <SingleImageUpload
          product={product}
          title="Imagen de la inspiración:"
          onImageUpload={(product, imageUrl) => {
            const newProd = {
              ...product,
              inspiracion: isPerfumeDeLujo(product) ? {
                ...product.inspiracion,
                contenido: {
                  imagen: {
                    url: imageUrl,
                    alt: `${product.marca}-${product.titulo}`
                  },
                  resena: product.inspiracion?.contenido?.resena
                }
              } : null,
            };
            updateProduct(newProd as TPerfumeDeLujoExcel);
          }
          }
        />
      ) : (
        product.inspiracion?.contenido?.imagen && (
          <section>
            <h4 className="font-bold">Imagen de la inspiración </h4>
            <img className="w-[50px] h-[50px]" width={50} height={50} src={product.inspiracion.contenido.imagen.url} alt={product.inspiracion.contenido.imagen.alt} />
          </section>
        )
      )}
      {!product.descripcion.imagen ? (
        <SingleImageUpload
          product={product}
          title="Imagen de la descripción:"
          onImageUpload={(product, imageUrl) => {
            const newProd = {
              ...product,
              descripcion: typeof product.descripcion === 'object' ? {
                ...product.descripcion,
                imagen: {
                  url: imageUrl,
                  alt: `${product.marca}-${product.titulo}`
                }
              } : "null",
            };
            updateProduct(newProd as TPerfumeDeLujoExcel);
          }}
        />
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
        <MultipleImageUpload product={product} title="Imágenes del producto" store={perfumeLujoStore}  />
      )}
    </div>
  )
}