import { TPerfumeLujo } from "@/sanity/queries/pages/types";
import InfoSection from "../InfoSection";
import ProductSlide from "@/app/_components/ProductSlide";
import AddToCart from "../AddToCart";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TPricing } from "../Product";
import ProductViewer from "../ProductViewer";

type TPerfumeLujoProps = {
  product: TPerfumeLujo;
  selectedVariant: TPerfumeVariant;
  setSelectedVariant: (variant: TVariant) => void;
  setCantidad: (cantidad: number) => void;
  cantidad: number;
  pricing: TPricing;
};

const PerfumeLujo = ({
  product,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
  pricing,
}: TPerfumeLujoProps) => {


  const productObject = {
    productName: `${product.marca} ${product.titulo}`,
    productType: `${product._type}`,
    productValue: `${selectedVariant.precio}`
  }


  return (
    <>
      <ProductViewer productObject={productObject} />
      <HeroProduct
        product={product}
        images={selectedVariant.imagenes}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        cantidad={cantidad}
        setCantidad={setCantidad}
        pricing={pricing}
      />
      <InfoSection
        titulo="Descripción"
        descripcion={product.descripcion.texto}
        alt={product.descripcion.imagen?.alt || product.descripcion.imagenExterna?.alt}
        url={product.descripcion.imagen?.url || product.descripcion.imagenExterna?.url}
        className=""
      />

      {product.inspiracion?.usarInspiracion && (
        <InfoSection
          titulo="Inspiración"
          descripcion={product.inspiracion.contenido!.resena || ""}
          alt={
            !product.inspiracion.contenido?.subirImagen
              ? ("imagen" in product.inspiracion.contenido! && product.inspiracion.contenido!.imagen?.alt)
                ? product.inspiracion.contenido!.imagen.alt
                : undefined
              : (product.inspiracion.contenido!.imagenExterna.alt)
                ? product.inspiracion.contenido!.imagenExterna.alt
                : undefined
          }
          url={
            !product.inspiracion.contenido?.subirImagen
              ? ("imagen" in product.inspiracion.contenido! && product.inspiracion.contenido!.imagen?.url)
                ? product.inspiracion.contenido!.imagen.url
                : undefined
              : (product.inspiracion.contenido!.imagenExterna.url)
                ? product.inspiracion.contenido!.imagenExterna.url
                : undefined
          }
          labelType="light"
          className="lg:flex-row-reverse"
        />
      )}
      <InfoSection
        titulo="Inspiración"
        labelType={product.inspiracion?.usarInspiracion ? "dark" : "light"}
        DescriptionComp={
          <DetallesProducto
            theme={product.inspiracion?.usarInspiracion ? "dark" : "light"}
            detalles={{
              notasOlfativas: {
                familiaOlfativa: product.notasOlfativas.familiaOlfativa || "",
                notasDeSalida: product.notasOlfativas.notasDeSalida?.toString().replaceAll(",",", ") || "",
                notasDeCorazon: product.notasOlfativas.notasDeCorazon?.toString().replaceAll(",",", ") || "",
                notasDeBase: product.notasOlfativas.notasDeBase?.toString().replaceAll(",",", ") || "",
              },
              ingredientes: {
                ingredientes: product.ingredientes?.join(", ") || "",
              },
              especificaciones: {
                género: product.genero.charAt(0).toUpperCase() + product.genero.slice(1) || "",
                tamaño: selectedVariant.tamano.toString() + "ml" || "",
                concentración: product.concentracion || "",
                paísDeOrigen: product.paisDeOrigen || "",
                ...(selectedVariant.registroInvima ? {
                  registroInvima: selectedVariant.registroInvima,
                } : {})
              }
            }}
          />
        }
        ImageComp={
          product.banners ?
            <ProductSlide
              imageVideoProducts={product.banners || []}
              className="w-full h-[60vw] md:max-h-[350px]"
              isLink={false}
            /> :
            null
        }
      />

      <section className="px-4 py-6 lg:hidden">
        <NuestrasComprasIncluyen />
      </section>

      <AddToCart
        pricing={pricing}
        className="lg:hidden"
        product={product}
        quantity={cantidad}
        selectedVariant={selectedVariant}
      />
    </>
  );
};

export default PerfumeLujo;
