import { TGafaLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import InfoSection from "../InfoSection";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import ProductSlide, { ProductImage } from "@/app/_components/ProductSlide";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TTimedDiscount, TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import AddToCart from "../AddToCart";
import { TPricing } from "../Product";
import { ProductCardSlide } from "../ProductCardSlide";

type TGafaLujoProps = {
  product: TGafaLujo;
  selectedVariant: TVarianteGafa;
  setSelectedVariant: (variant: TVariant) => void;
  cantidad: number;
  setCantidad: (cantidad: number) => void;
  pricing: TPricing;
};

const GafaLujo = ({
  product,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
  pricing,
}: TGafaLujoProps) => {
  return (
    <>
      <HeroProduct
        product={product}
        images={selectedVariant.imagenes}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        cantidad={cantidad}
        setCantidad={setCantidad}
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

      {product.monturaDetalles.usarDetalles && (
        <section className=" bg-slate-900 w-screen flex justify-center">
          <InfoSection
            titulo="Detalles de Montura"
            descripcion={product.monturaDetalles.contenido?.texto || ""}
            alt={product.monturaDetalles.contenido?.imagen?.alt}
            url={product.monturaDetalles.contenido?.imagen?.url}
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
                especificaciones: {
                  tipoDeGafa: product.especificaciones.tipoDeGafa,
                  estiloDeGafa: product.especificaciones.estiloDeGafa,
                  materialDeLente: product.especificaciones.lente.material,
                  tipoDeLente: product.especificaciones.lente.tipo,
                  queIncluye: product.especificaciones.queIncluye,
                  formaDeLaMontura:
                    product.especificaciones.montura.formaDeLaMontura,
                  materialMontura:
                    product.especificaciones.montura.materialMontura,
                  materialVarilla:
                    product.especificaciones.montura.materialVarilla,
                  paisDeOrigen: product.especificaciones.paisDeOrigen,
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
          className="w-full lg:max-w-mx flex-row-reverse"
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

      <section className="max-w-mx w-full py-4 pl-8 lg:px-8 lg:flex lg:flex-col">
        <ProductCardSlide />
      </section>
    </>
  );
};

export default GafaLujo;
