import { TPerfumeLujo } from "@/sanity/queries/pages/types";
import InfoSection from "../InfoSection";
import ProductSlide, { ProductImage } from "@/app/_components/ProductSlide";
import MobileAddToCart from "../MobileAddToCart";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import HeroProduct from '@/app/_components/lujo/HeroProduct';

type TPerfumeLujoProps = {
  product: TPerfumeLujo;
};

const PerfumeLujo = ({ product }: TPerfumeLujoProps) => {
  return (
    <>
      <HeroProduct
        product={product}
        images={product.imagenes}
      />

      <div className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Descripción"
          descripcion={product.descripcion.texto}
          alt={product.descripcion.imagen.alt}
          url={product.descripcion.imagen.url}
          className="lg:max-w-[calc(1280px+32px)] pb-5"
        />
      </div>

      {product.inspiracion.usarInspiracion && (
        <div className="bg-color-bg-surface-1-default w-screen flex justify-center">
          <InfoSection
            titulo="Inspiración"
            descripcion={product.inspiracion.contenido!.resena || ""}
            alt={product.inspiracion.contenido!.imagen?.alt || ""}
            url={product.inspiracion.contenido!.imagen?.url || ""}
            labelType="light"
            className="text-slate-900 lg:max-w-[calc(1280px+32px)] flex-row-reverse pb-5"
          />
        </div>
      )}

      <section className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Inspiración"
          DesciptionComp={
            <DetallesProducto
              detalles={{
                notasOlfativas: {
                  notasDeBase: product.notasOlfativas.notasDeBase || "",
                  notasDeSalida: product.notasOlfativas.notasDeSalida || "",
                  familiaOlfativa: product.notasOlfativas.familiaOlfativa || "",
                  notasDeCorazon: product.notasOlfativas.notasDeCorazon || "",
                },
                ingredientes: product.ingredientes,
              }}
            />
          }
          ImageComp={
            <ProductSlide
              imageVideoProducts={product.banners}
              className="max-h-[377px] w-full"
              isLink={false}
            />
          }
          className="w-full  lg:max-w-[calc(1280px+32px)]"
        />
      </section>

      <section className="px-4 py-6 lg:hidden">
        <NuestrasComprasIncluyen />
      </section>

      <MobileAddToCart className="lg:hidden" />
    </>
  );
};

export default PerfumeLujo;
