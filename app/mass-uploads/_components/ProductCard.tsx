import { TPerfumeDeLujoExcel, TProductType, TPerfumePremiumExcel, TGafasLujoExcel } from "./UploadedData";
import SingleImageUpload from "./SingleImageUpload";
import MultipleImageUpload from "./MultipleImageUpload";
import { useGafasLujoUploadStore, usePerfumeLujoUploadStore, usePerfumePremiumUploadStore } from "./productUploadStore";


const ProductCard = ({ product, productType }: { product: TProductType; productType: string }) => {

  return (
    <>
      {productType === "perfumeLujo" && (<PerfumeLujoCard product={product as TPerfumeDeLujoExcel} />)}
      {productType === "perfumePremium" && (<PerfumePremiumCard product={product as TPerfumePremiumExcel} />)}
      {productType === "gafasLujo" && (<GafasLujoCard product={product as TGafasLujoExcel} />)}
    </>

  )
}

export default ProductCard;


const GafasLujoCard = ({ product }: { product: TGafasLujoExcel }) => {
  const { updateProduct: updateGafasLujo } = useGafasLujoUploadStore();
  return (
    <section className="border border-black p-4 flex flex-col justify-between">
      <header>
        <h2><strong>Marca: </strong> {product.marca} <strong> Modelo: </strong> {product.modelo}</h2>
      </header>
      <section>
        <h3><strong>Variantes: </strong></h3>
        <ul className="flex flex-col gap-2 w-full">
          {product.variantes.map((variant) => (
            <li key={variant.codigoDeReferencia} className="p-1 w-full border border-black">
              <h4><strong>Codigo de Variante:</strong> {variant.codigoDeReferencia}</h4>
              {variant.imagenes && variant.imagenes.length > 0 ? (
                <section>
                  <p><strong>Imagenes del producto: </strong></p>
                  <ul className="flex gap-2">
                    {variant.imagenes.map((image, index) => (
                      <li key={index}>
                        <img className="w-[50px] h-[50px]" width={50} height={50} src={typeof image === "string" ? image : image.url} alt={product.modelo} />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : (
                <MultipleImageUpload product={product} title="Subir imagenes de la variante" callback={(newImages) => {
                  const newProd = {
                    ...product,
                    variantes: product.variantes.map((v) => ({
                      ...v,
                      imagenes: newImages
                    }))
                  }
                  updateGafasLujo(newProd as TGafasLujoExcel);
                }} />
              )}
            </li>
          ))}
        </ul>
        {product.detalles.usarDetalles && (
          !product.detalles.contenido || !product.detalles.contenido?.imagen || !product.detalles?.contenido?.imagen?.url ? (
            <SingleImageUpload
              product={product}
              title="Imagen de los detalles:"
              onImageUpload={(imageUrl) => {
                const newProd = {
                  ...product,
                  detalles: product.detalles ? {
                    ...product.detalles,
                    contenido: {
                      imagen: {
                        url: imageUrl,
                        alt: `${product.marca}-${product.modelo}`
                      },
                      resena: product.detalles?.contenido?.resena
                    }
                  } : null,
                };
                updateGafasLujo(newProd as TGafasLujoExcel);
              }
              }
            />
          ) : (
            <section>
              <h4 className="font-bold">Imagen de los detalles </h4>
              <img className="w-[50px] h-[50px]" width={50} height={50} src={product.detalles.contenido?.imagen?.url} alt={product.detalles.contenido?.imagen?.alt} />
            </section>
          )
        )}
        {product.inspiracion.usarInspiracion && (
          !product.inspiracion.contenido?.imagen || !product.inspiracion?.contenido?.imagen?.url ? (
            <SingleImageUpload
              product={product}
              title="Imagen de la inspiracion:"
              onImageUpload={(imageUrl) => {
                const newProd = {
                  ...product,
                  inspiracion: product.inspiracion ? {
                    ...product.inspiracion,
                    contenido: {
                      imagen: {
                        url: imageUrl,
                        alt: `${product.marca}-${product.modelo}`
                      },
                      resena: product.inspiracion?.contenido?.resena
                    }
                  } : null,
                };
                updateGafasLujo(newProd as TGafasLujoExcel);
              }
              }
            />
          ) : (
            <section>
              <h4 className="font-bold">Imagen de la inspiracion </h4>
              <img className="w-[50px] h-[50px]" width={50} height={50} src={product.inspiracion.contenido?.imagen?.url} alt={product.inspiracion.contenido?.imagen?.alt} />
            </section>
          )
        )}
        {product.monturaDetalles.usarDetalles && (
          !product.monturaDetalles.contenido?.imagen || !product.monturaDetalles?.contenido?.imagen?.url ? (
            <SingleImageUpload
              product={product}
              title="Imagen de los detalles de la montura:"
              onImageUpload={(imageUrl) => {
                const newProd = {
                  ...product,
                  monturaDetalles: product.monturaDetalles ? {
                    ...product.monturaDetalles,
                    contenido: {
                      imagen: {
                        url: imageUrl,
                        alt: `${product.marca}-${product.modelo}`
                      },
                      resena: product.monturaDetalles?.contenido?.resena
                    }
                  } : null,
                };
                updateGafasLujo(newProd as TGafasLujoExcel);
              }
              }
            />
          ) : (
            <section>
              <h4 className="font-bold">Imagen de los detalles de la montura </h4>
              <img className="w-[50px] h-[50px]" width={50} height={50} src={product.monturaDetalles.contenido?.imagen?.url} alt={product.monturaDetalles.contenido?.imagen?.alt} />
            </section>
          )
        )}
      </section>

    </section>
  )
}

const PerfumeLujoCard = ({ product }: { product: TPerfumeDeLujoExcel }) => {


  const { updateProduct: updatePerfumeLujo } = usePerfumeLujoUploadStore();
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
const PerfumePremiumCard = ({ product }: { product: TPerfumePremiumExcel }) => {

  const { updateProduct: updatePerfumePremium } = usePerfumePremiumUploadStore();
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
          updatePerfumePremium(newProd as TPerfumePremiumExcel);
        }} />
      )}
    </div>
  )
}