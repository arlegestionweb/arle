import { TRelojLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import InfoSection from "../InfoSection";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import ProductSlide, { ProductImage } from "@/app/_components/ProductSlide";

type TRelojLujoProps = {
  product: TRelojLujo;
};

const RelojLujo = ({ product }: TRelojLujoProps) => {
  console.log(product.especificaciones.funciones);

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
            className="lg:w-[calc(1280px+32px)]"
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
            className="w-full lg:w-[calc(1280px+32px)] flex-row-reverse"
          />
        </section>
      )}

      {product.movimiento?.usarMovimiento && (
        <section className="bg-slate-900 w-screen flex justify-center">
          <InfoSection
            titulo="Movimiento"
            descripcion={product.movimiento?.contenido?.descripcion || ""}
            subTitulo={product.movimiento?.contenido?.tipo || ""}
            alt={product.movimiento?.contenido?.imagen?.alt || ""}
            url={product.movimiento?.contenido?.imagen?.url || ""}
            className="lg:w-[calc(1280px+32px)]"
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
                  "Diámetro de la caja": product.caja.diametro+"mm",
                  "Material de la caja": product.caja.material,
                },
                especificaciones:{
                  "Tipo de reloj":product.especificaciones.tipoDeReloj,
                  "Estilo de reloj":product.especificaciones.estiloDeReloj,
                  "Resistencia al agua":product.especificaciones.resistenciaAlAgua,
                  material: product.especificaciones.material,
                  funciones: product.especificaciones.funciones.map(funcion => `${funcion.titulo}: ${funcion.descripcion}`)
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
          className="w-full text-slate-900 lg:max-w-[calc(1280px+32px)] flex-row-reverse"
        />
      </section>
    </>
  );
};

export default RelojLujo;
