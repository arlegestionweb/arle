import { TGafaLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import InfoSection from "../InfoSection";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import ProductSlide, { ProductImage } from "@/app/_components/ProductSlide";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import AddToCart from "../AddToCart";
import { TPricing } from "../Product";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";

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
        <InfoSection
          titulo="Inspiración"
          descripcion={product.inspiracion.contenido?.resena || ""}
          alt={product.inspiracion.contenido?.imagen?.alt || ""}
          url={product.inspiracion.contenido?.imagen?.url || ""}
          className=""
        />
      )}

      {product.detalles?.usarDetalles && (
        <InfoSection
          titulo="Detalles"
          descripcion={product.detalles?.contenido?.texto || ""}
          alt={product.detalles?.contenido?.imagen?.alt || ""}
          url={product.detalles?.contenido?.imagen?.url || ""}
          labelType={product.inspiracion.usarInspiracion ? "light" : "dark"}
          className={product.inspiracion.usarInspiracion ? "lg:flex-row-reverse": ""}
        />
      )}

      {product.monturaDetalles?.usarDetalles && (
        <InfoSection
          titulo="Detalles de Montura"
          descripcion={product.monturaDetalles.contenido?.texto || ""}
          alt={product.monturaDetalles.contenido?.imagen?.alt}
          url={product.monturaDetalles.contenido?.imagen?.url}
          labelType={
            product.inspiracion.usarInspiracion &&
            !product.detalles?.usarDetalles
              ? "light"
              : !product.inspiracion.usarInspiracion &&
                product.detalles?.usarDetalles
              ? "light"
              : "dark"
          }
          className={product.inspiracion.usarInspiracion &&
            !product.detalles?.usarDetalles
              ? "lg:flex-row-reverse"
              : !product.inspiracion.usarInspiracion &&
                product.detalles?.usarDetalles
              ? "lg:flex-row-reverse"
              : ""}
        />
      )}

      <InfoSection
        labelType={
          !product.inspiracion.usarInspiracion &&
          !product.detalles?.usarDetalles &&
          !product.monturaDetalles?.usarDetalles
            ? "dark"
            : product.inspiracion.usarInspiracion &&
              product.detalles?.usarDetalles &&
              !product.monturaDetalles?.usarDetalles
            ? "dark"
            : product.inspiracion.usarInspiracion &&
              !product.detalles?.usarDetalles &&
              product.monturaDetalles?.usarDetalles
            ? "dark"
            : !product.inspiracion.usarInspiracion &&
              product.detalles?.usarDetalles &&
              product.monturaDetalles?.usarDetalles
            ? "dark"
            : "light"
        }
        titulo="Inspiración"
        DescriptionComp={
          <DetallesProducto
            theme={
              !product.inspiracion.usarInspiracion &&
              !product.detalles?.usarDetalles &&
              !product.monturaDetalles?.usarDetalles
                ? "dark"
                : product.inspiracion.usarInspiracion &&
                  product.detalles?.usarDetalles &&
                  !product.monturaDetalles?.usarDetalles
                ? "dark"
                : product.inspiracion.usarInspiracion &&
                  !product.detalles?.usarDetalles &&
                  product.monturaDetalles?.usarDetalles
                ? "dark"
                : !product.inspiracion.usarInspiracion &&
                  product.detalles?.usarDetalles &&
                  product.monturaDetalles?.usarDetalles
                ? "dark"
                : "light"
            }
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
          product.banners ? (
            <ProductSlide
              imagesProduct={(product.banners &&
                product.banners.map(
                  (element) => ({
                    url: element.imagen?.url,
                    alt: element.imagen?.alt,
                  } as ProductImage)
                )) ||
                []}
              className="w-full h-[60vw] max-h-[350px]"
              isLink={false}       />
          ) : (
            null
          )
        }
        className={!product.inspiracion.usarInspiracion &&
        !product.detalles?.usarDetalles &&
        !product.monturaDetalles?.usarDetalles
          ? ""
          : product.inspiracion.usarInspiracion &&
            product.detalles?.usarDetalles &&
            !product.monturaDetalles?.usarDetalles
          ? ""
          : product.inspiracion.usarInspiracion &&
            !product.detalles?.usarDetalles &&
            product.monturaDetalles?.usarDetalles
          ? ""
          : !product.inspiracion.usarInspiracion &&
            product.detalles?.usarDetalles &&
            product.monturaDetalles?.usarDetalles
          ? ""
          : "lg:flex-row-reverse"}
      />
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

export default GafaLujo;
