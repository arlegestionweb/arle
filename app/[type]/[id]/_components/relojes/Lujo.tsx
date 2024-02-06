import { TRelojLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import InfoSection from "../InfoSection";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import ProductSlide, { ProductImage } from "@/app/_components/ProductSlide";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import AddToCart from "../AddToCart";
import { TPricing } from "../Product";

type TRelojLujoProps = {
  product: TRelojLujo;
  selectedVariant: TRelojVariant;
  setSelectedVariant: (variant: TVariant) => void;
  setCantidad: (cantidad: number) => void;
  cantidad: number;
  pricing: TPricing;
};

const RelojLujo = ({ pricing, product, selectedVariant, setSelectedVariant, cantidad, setCantidad }: TRelojLujoProps) => {

  return (
    <>
      <HeroProduct
        product={product}
        images={selectedVariant.imagenes}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        cantidad={cantidad}
        setCantidad={setCantidad}
        // discount={discount}
        pricing={pricing}
      />

      {product.inspiracion.usarInspiracion && (
        <section className="bg-slate-900 w-screen flex justify-center">
          <InfoSection
            titulo="Inspiración"
            descripcion={product.inspiracion.contenido?.resena || ""}
            alt={product.inspiracion.contenido?.imagen?.alt}
            url={product.inspiracion.contenido?.imagen?.url}
            className="w-full lg:w-mx"
          />
        </section>
      )}

      {product.detalles?.usarDetalles && (
        <section className="bg-color-bg-surface-1-defaul w-screen flex justify-center">
          <InfoSection
            titulo="Detalles"
            descripcion={product.detalles?.contenido?.texto || ""}
            alt={product.detalles?.contenido?.imagen?.alt || ""}
            url={product.detalles?.contenido?.imagen?.url || ""}
            labelType={"light"}
            className="w-full lg:w-mx flex-row-reverse"
          />
        </section>
      )}

      {product.movimiento?.usarMovimiento && (
        <section className="bg-slate-900 w-screen flex justify-center">
          <InfoSection
            titulo="Movimiento"
            descripcion={product.movimiento?.contenido?.descripcion || ""}
            subTitulo={product.movimiento?.tipoDeMovimiento || ""}
            alt={product.movimiento?.contenido?.imagen?.alt || ""}
            url={product.movimiento?.contenido?.imagen?.url || ""}
            className="w-full lg:w-mx"
          />
        </section>
      )}

      <section className="bg-color-bg-surface-1-defaul w-screen flex justify-center">
        <InfoSection
          labelType={"light"}
          titulo="Inspiración"
          DesciptionComp={
            <DetallesProducto
              theme="light"
              detalles={{
                caja: {
                  cristal: product.caja.cristal,
                  "Diámetro de la caja": product.caja.diametro + "mm",
                  "Material de la caja": product.caja.material,
                },
                especificaciones: {
                  "Tipo de reloj": product.especificaciones.tipoDeReloj,
                  "Estilo de reloj": product.especificaciones.estiloDeReloj,
                  "Resistencia al agua": product.especificaciones.resistenciaAlAgua,
                  material: product.especificaciones.material,
                  ...(product.especificaciones.funciones
                    ? {
                      funciones: product.especificaciones.funciones.map(
                        (funcion) => `${funcion.titulo}: ${funcion.descripcion}`
                      ),
                    }
                    : {}),
                },
                garantia: {
                  meses: product.garantia.meses + "",
                  descripción: product.garantia.descripcion || "",
                },
              }}
            />
          }
          ImageComp={
            <ProductSlide
              imagesProduct={
                (product.banners &&
                  product.banners.map(
                    element =>
                    ({
                      url: element.imagen?.url,
                      alt: element.imagen?.alt,
                    } as ProductImage)
                  )) ||
                []
              }
              className="max-h-[377px] w-full"
              isLink={false}
            />
          }
          className="lg:max-w-mx w-full text-slate-900 flex-row-reverse"
        />
      </section>
      <section className="px-4 py-6 lg:hidden">
        <NuestrasComprasIncluyen />
      </section>

      <AddToCart
        className="lg:hidden"
        product={product}
        quantity={cantidad}
        selectedVariant={selectedVariant}
        pricing={pricing}
      />
    </>
  );
};

export default RelojLujo;
