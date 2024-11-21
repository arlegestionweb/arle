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
import ProductViewer from "../ProductViewer";

type TRelojLujoProps = {
  product: TRelojLujo;
  selectedVariant: TRelojVariant;
  setSelectedVariant: (variant: TVariant) => void;
  setCantidad: (cantidad: number) => void;
  cantidad: number;
  pricing: TPricing;
};

const RelojLujo = ({
  pricing,
  product,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
}: TRelojLujoProps) => {

  const productObject = {
    productName: `${product.marca} ${product.modelo}`,
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

      {product.inspiracion.usarInspiracion && (
        <InfoSection
          titulo="Inspiración"
          descripcion={product.inspiracion.contenido?.resena || ""}
          alt={product.inspiracion.contenido?.subirImagen ? (product.inspiracion.contenido.imagenExterna?.alt || "") : (product.inspiracion.contenido?.imagen?.alt || "")}
          url={product.inspiracion.contenido?.subirImagen ? (product.inspiracion.contenido.imagenExterna?.url || "") : (product.inspiracion.contenido?.imagen?.url || "")}
          className=""
        />
      )}

      {product.detalles?.usarDetalles && (
        <InfoSection
          titulo="Detalles"
          descripcion={product.detalles?.contenido?.texto || ""}
          alt={product.detalles.contenido?.subirImagen ? (product.detalles.contenido.imagenExterna?.alt || "") : (product.detalles.contenido?.imagen?.alt || "")}
          url={product.detalles.contenido?.subirImagen ? (product.detalles.contenido.imagenExterna?.url || "") : (product.detalles.contenido?.imagen?.url || "")}
          labelType={product.inspiracion.usarInspiracion ? "light" : "dark"}
          className={product.inspiracion.usarInspiracion ? "lg:flex-row-reverse" : ""}
        />
      )}

      {product.movimiento?.usarMovimiento && (
        <InfoSection
          titulo="Movimiento"
          descripcion={product.movimiento?.contenido?.descripcion || ""}
          subTitulo={product.movimiento?.tipoDeMovimiento || ""}
          alt={product.movimiento?.contenido?.imagen?.alt || ""}
          url={product.movimiento?.contenido?.imagen?.url || ""}
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
        labelType={!product.inspiracion.usarInspiracion &&
          !product.detalles?.usarDetalles &&
          !product.movimiento?.usarMovimiento
          ? "dark"
          : product.inspiracion.usarInspiracion &&
            product.detalles?.usarDetalles &&
            !product.movimiento?.usarMovimiento
            ? "dark"
            : product.inspiracion.usarInspiracion &&
              !product.detalles?.usarDetalles &&
              product.movimiento?.usarMovimiento
              ? "dark"
              : !product.inspiracion.usarInspiracion &&
                product.detalles?.usarDetalles &&
                product.movimiento?.usarMovimiento
                ? "dark"
                : "light"}
        titulo="Inspiración"
        DescriptionComp={
          <DetallesProducto
            theme={!product.inspiracion.usarInspiracion &&
              !product.detalles?.usarDetalles &&
              !product.movimiento?.usarMovimiento
              ? "dark"
              : product.inspiracion.usarInspiracion &&
                product.detalles?.usarDetalles &&
                !product.movimiento?.usarMovimiento
                ? "dark"
                : product.inspiracion.usarInspiracion &&
                  !product.detalles?.usarDetalles &&
                  product.movimiento?.usarMovimiento
                  ? "dark"
                  : !product.inspiracion.usarInspiracion &&
                    product.detalles?.usarDetalles &&
                    product.movimiento?.usarMovimiento
                    ? "dark"
                    : "light"}
            detalles={{
              caja: {
                cristal: product.caja.cristal,
                "Diámetro de la caja": product.caja.diametro + " mm",
                "Material de la caja": product.caja.material,
              },
              especificaciones: {
                "Tipo de reloj": product.especificaciones.tipoDeReloj,
                "Estilo de reloj": product.especificaciones.estiloDeReloj,
                "Tipo de cierre": product.especificaciones.tipoDeCierre,
                "Resistencia al agua":
                  product.especificaciones.resistenciaAlAgua,
                materialDelPulso: product.especificaciones.material,
                ...(product.especificaciones.funciones
                  ? {
                    funciones: product.especificaciones.funciones.map(funcion => `${funcion.titulo}`).join(", "),
                  }
                  : {}),
              },
              colores: {
                colorDelPulso: selectedVariant.colorPulso.nombre || "",
                colorDelTablero: selectedVariant.colorTablero.nombre || "",
                colorDeLaCaja: selectedVariant.colorCaja.nombre || "",

              },
              garantía: {
                meses: product.garantia.meses + "",
                descripción: product.garantia.descripcion || "",
              },
            }}
          />
        }
        ImageComp={
          product.banners ? (
            <ProductSlide
              imagesProduct={
                (product.banners &&
                  product.banners.map(
                    (element) =>
                    ({
                      url: element.imagen?.url,
                      alt: element.imagen?.alt,
                    } as ProductImage)
                  )) ||
                []
              }
              className="w-full h-[60vw] max-h-[350px]"
              isLink={false}
            />
          ) : null
        }
        className={!product.inspiracion.usarInspiracion &&
          !product.detalles?.usarDetalles &&
          !product.movimiento?.usarMovimiento
          ? ""
          : product.inspiracion.usarInspiracion &&
            product.detalles?.usarDetalles &&
            !product.movimiento?.usarMovimiento
            ? ""
            : product.inspiracion.usarInspiracion &&
              !product.detalles?.usarDetalles &&
              product.movimiento?.usarMovimiento
              ? ""
              : !product.inspiracion.usarInspiracion &&
                product.detalles?.usarDetalles &&
                product.movimiento?.usarMovimiento
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

export default RelojLujo;
