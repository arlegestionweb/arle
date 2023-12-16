import { TPerfumeLujo } from "@/sanity/queries/pages/types";
import Image from "next/image";
import Labels, { LabelTypes } from "../../../../_components/Labels";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";
import Cantidad from "../Cantidad";
import InfoSection from "../InfoSection";
import ProductSlide from "@/app/_components/ProductSlide";
import GalleryProduct from "@/app/_components/lujo/GalleryProduct";
import MobileAddToCart from "../MobileAddToCart";
import NuestrasComprasIncluyen from "../NuestrasComprasIncluyen";

type TPerfumeLujoProps = {
  product: TPerfumeLujo;
};

const PerfumeLujo = ({ product }: TPerfumeLujoProps) => {
  console.log(product.imagenes);

  return (
    <>
      <section className="lg:grid lg:grid-cols-12 gap-8 min-h-screen row-auto w-full lg:max-w-[calc(1280px+32px)]">
        {/* Product view */}
        <GalleryProduct
          className="col-start-1 col-span-6"
          imagesProduct={product.imagenes}
        />

        <section className="row-start-1 col-start-7 col-span-6 flex flex-col">
          <Labels
            className="mx-4 relative max-w-fit mt-4 lg:mt-0 mb-2"
            labelType={"ultimas unidades"}
            label={"ultimas unidades"}
          />
          <header className="px-4 ">
            <h1 className="text-zinc-800 text-[32px] font-normal font-kanit leading-10 w-full">
              {product.marca}
            </h1>
            <h2>
              {product.marca} | {product.genero}
            </h2>
            <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
              CODE:{product.variantes[0].codigoDeReferencia}
            </span>
            <p className="text-zinc-800 text-[32px] font-normal font-kanit leading-9">
              ${product.variantes[0].precio}
            </p>
            <div className="text-justify">
              <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
                Págalo a 4 cuotas de $
                {numberToColombianPriceString(
                  colombianPriceStringToNumber(product.variantes[0].precio) / 4
                )}{" "}
                sin intereses.
                <br />
                [provider]
              </span>
              <span className="text-neutral-600 text-sm font-normal font-tajawal leading-[16.80px]">
                .{" "}
              </span>
              <span className="text-zinc-800 text-sm font-normal font-tajawal leading-[16.80px]">
                Learn More
              </span>
            </div>{" "}
          </header>

          {/* <VariantSelector
          product={product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        /> */}

          <section className="px-4 mt-2 mb-6">
            <Cantidad />
          </section>

          <MobileAddToCart className="hidden static shadow-none w-full px-4 gap-6 space-y-2 lg:block" />

          <section className="px-4 hidden lg:block">
            <NuestrasComprasIncluyen />
          </section>
        </section>
      </section>

      <div className="bg-slate-900 w-screen flex justify-center">
        <InfoSection
          titulo="Descripción"
          descripcion={product.descripcion.texto}
          alt={product.descripcion.imagen.alt}
          url={product.descripcion.imagen.url}
          className="lg:max-w-[calc(1280px+32px)]"
        />
      </div>

      {product.inspiracion.usarInspiracion && (
        <div className="bg-color-bg-surface-1-default w-screen flex justify-center">
          <InfoSection
            titulo="Inspiración"
            descripcion={product.inspiracion.contenido!.resena || ""}
            alt={product.inspiracion.contenido!.imagen?.alt || ""}
            url={product.inspiracion.contenido!.imagen?.url || ""}
            className="text-slate-900 lg:max-w-[calc(1280px+32px)] flex-row-reverse"
          />
        </div>
      )}

      <section className="bg-slate-900 w-screen flex justify-center">

        <InfoSection
          titulo="Inspiración"
          DesciptionComp={<DetallesProducto />}
          ImageComp={
            <ProductSlide
              imagesProduct={[
                {
                  alt: product.banners[0].imagen?.alt,
                  url: product.banners[0].imagen?.url || "",
                },
              ]}
              className="max-h-[377px] w-full"
              isLink={false}
            />
          }
          className="w-full  lg:max-w-[calc(1280px+32px)]"
        />
      </section>

      <section className="px-4 mt-28 py-6 lg:hidden">
        <NuestrasComprasIncluyen />
      </section>

      <MobileAddToCart className="lg:hidden" />
    </>
  );
};

export default PerfumeLujo;

const DetallesProducto = () => {
  return (
    <section className="">
      
    </section>
  );
};
