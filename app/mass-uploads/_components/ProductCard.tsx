import { TPerfumeDeLujoExcel, TProductType, TPerfumePremiumExcel } from "./UploadedData";
import SingleImageUpload from "./SingleImageUpload";
import MultipleImageUpload from "./MultipleImageUpload";
import { usePerfumeLujoUploadStore } from "./productUploadStore";


// const isPerfumeDeLujo = (product: TProductType): product is TPerfumeDeLujoExcel => {
//   return (product as TPerfumeDeLujoExcel).inspiracion !== undefined;
// };


const ProductCard = ({ product, productType }: { product: TProductType; productType: string }) => {
  // useFileDrop('imageUpload', uploadImages);


  return (
    <>
      {productType === "perfumeLujo" && (<PerfumeLujoCard product={product as TPerfumeDeLujoExcel} />)}
      {/* {productType === "perfumePremium" && (<PerfumePremiumCard product={product as TPerfumePremiumExcel} />)} */}
    </>

  )
}

export default ProductCard;

const PerfumeLujoCard = ({ product }: { product: TPerfumeDeLujoExcel }) => {

  const perfumeLujoStore = usePerfumeLujoUploadStore()

  const { updateProduct: updatePerfumeLujo } = perfumeLujoStore;
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
          onImageUpload={(imageUrl) => {
            const newProd = {
              ...product,
              inspiracion: product.inspiracion ? {
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
            updatePerfumeLujo(newProd as TPerfumeDeLujoExcel);
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
          onImageUpload={(imageUrl) => {
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
            updatePerfumeLujo(newProd as TPerfumeDeLujoExcel);
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
        <MultipleImageUpload product={product} title="Imágenes del producto" callback={(newImages) => {
          const newProd = {
            ...product,
            imagenes: newImages
          }
          updatePerfumeLujo(newProd as TPerfumeDeLujoExcel);
        }} />
      )}
    </div>
  )
}
const PerfumeLujoCard = ({ product }: { product: TPerfumeDeLujoExcel }) => {

  const perfumeLujoStore = usePerfumeLujoUploadStore()

  const { updateProduct: updatePerfumeLujo } = perfumeLujoStore;
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
          onImageUpload={(imageUrl) => {
            const newProd = {
              ...product,
              inspiracion: product.inspiracion ? {
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
            updatePerfumeLujo(newProd as TPerfumeDeLujoExcel);
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
          onImageUpload={(imageUrl) => {
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
            updatePerfumeLujo(newProd as TPerfumeDeLujoExcel);
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
        <MultipleImageUpload product={product} title="Imágenes del producto" callback={(newImages) => {
          const newProd = {
            ...product,
            imagenes: newImages
          }
          updatePerfumeLujo(newProd as TPerfumeDeLujoExcel);
        }} />
      )}
    </div>
  )
}