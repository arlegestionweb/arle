import { TRelojLujo } from "@/sanity/queries/pages/types";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import InfoSection from "../InfoSection";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import ProductSlide, { ProductImage } from "@/app/_components/ProductSlide";

type TRelojLujoProps = {
  product: TRelojLujo;
};

const RelojLujo = ({product}: TRelojLujoProps) => {
  return (
    <>
      <HeroProduct
        product={product}
        images={product.variantes[0].imagenes}
      />

      <section className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Inspiración"
          descripcion={product.inspiracion.contenido?.resena || ""}
          alt={product.inspiracion.contenido?.imagen?.alt}
          url={product.inspiracion.contenido?.imagen?.url}
          className="lg:max-w-[calc(1280px+32px)]"
        />
      </section>

      <section className="bg-color-bg-surface-1-defaul w-screen flex justify-center">
        <InfoSection
          titulo="Detalles"
          descripcion={product.detalles?.contenido?.texto || ""}
          alt={product.detalles?.contenido?.imagen?.alt || ""}
          url={product.detalles?.contenido?.imagen?.url || ""}
          className="text-slate-900 lg:max-w-[calc(1280px+32px)] flex-row-reverse"
        />
      </section>

      <section className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Movimiento"
          descripcion={product.movimiento?.contenido?.descripcion || ""}
          subTitulo={product.movimiento?.tipoDeMovimiento || ""}
          alt={product.movimiento?.contenido?.imagen?.alt || ""}
          url={product.movimiento?.contenido?.imagen?.url || ""}
          className="lg:max-w-[calc(1280px+32px)]"
        />
      </section>

      <section className="bg-color-bg-surface-1-defaul w-screen flex justify-center">
        <InfoSection
          titulo="Inspiración"
          DesciptionComp={<DetallesProducto detalles={{
            caja: {
              cristal: "algo",
              "Diámetro de la caja": "36mm",
              "Material de la caja": "Titanio",
              "Color de la caja": "Azul glaciar"
            },
            especificaciones:"bg-color-bg-surface-1-defaul w-screen flex justify-center",
            garantia: {
              meses: product.garantia.meses + "",
              "descripción": product.garantia.descripcion || "" 
            }
          }} />}
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
