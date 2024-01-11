import { TGafaLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import InfoSection from "../InfoSection";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import ProductSlide, { ProductImage } from "@/app/_components/ProductSlide";

type TGafaLujoProps = {
  product: TGafaLujo;
};

const GafaLujo = ({ product }: TGafaLujoProps) => {
  return (
    <>
      <HeroProduct
        product={product}
        images={product.variantes[0].imagenes}
      />

      {product.inspiracion.usarInspiracion && (
        <section className="bg-slate-900 w-screen flex justify-center">
          <InfoSection
            titulo="Inspiración"
            descripcion={product.inspiracion.contenido?.resena || ""}
            alt={product.inspiracion.contenido?.imagen?.alt}
            url={product.inspiracion.contenido?.imagen?.url}
            className="lg:w-mx"
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
                  formaDeLaMontura: product.especificaciones.montura.formaDeLaMontura,
                  materialMontura: product.especificaciones.montura.materialMontura,
                  materialVarilla: product.especificaciones.montura.materialVarilla,
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
    </>
  );
};

export default GafaLujo;
