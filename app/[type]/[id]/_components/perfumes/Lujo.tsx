import { TPerfumeLujo } from "@/sanity/queries/pages/types";
import InfoSection from "../InfoSection";
import ProductSlide from "@/app/_components/ProductSlide";
import AddToCart from "../AddToCart";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";
import DetallesProducto from "@/app/_components/lujo/DetallesProduct";
import HeroProduct from "@/app/_components/lujo/HeroProduct";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TTimedDiscount, TVariant } from "@/sanity/queries/pages/zodSchemas/general";

type TPerfumeLujoProps = {
  product: TPerfumeLujo;
  selectedVariant: TPerfumeVariant;
  setSelectedVariant: (variant: TVariant) => void;
  setCantidad: (cantidad: number) => void;
  cantidad: number;
  discount?: TTimedDiscount;
};

const PerfumeLujo = ({
  product,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
  discount
}: TPerfumeLujoProps) => {
  return (
    <>
      <HeroProduct
        product={product}
        images={product.imagenes}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        cantidad={cantidad}
        setCantidad={setCantidad}
        discount={discount}
      />

      <div className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Descripción"
          descripcion={product.descripcion.texto}
          alt={product.descripcion.imagen.alt}
          url={product.descripcion.imagen.url}
          className="lg:max-w-mx pb-5"
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
            className="text-slate-900 lg:max-w-mx flex-row-reverse pb-5"
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
          className="w-full  lg:max-w-mx"
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
      />
    </>
  );
};

export default PerfumeLujo;
