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

type TPerfumeLujoProps = {
  product: TPerfumeLujo;
};

const PerfumeLujo = ({ product }: TPerfumeLujoProps) => {
  console.log(product.banners);

  return (
    <section>
      {/* Product view */}
      <div className="relative max-h-[473px]">
        <Image
          alt={product.imagenes[0].alt}
          src={product.imagenes[0].url}
          width={300}
          height={473}
          className="object-cover w-full h-[473px]"
        />
      </div>

      <section className="pb-6">
        <Labels
          className="mx-4 relative max-w-fit mt-4 mb-2"
          labelType={"ultimas unidades"}
          label={"ultimas unidades"}
        />
        <header className="px-4 ">
          <h1 className="text-zinc-800 text-[32px] font-normal font-kanit leading-10 w-full">
            {product.marca}
          </h1>
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            CODE:
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

        <InfoSection
          titulo="Descripción"
          descripcion={product.descripcion.texto}
          alt={product.descripcion.imagen.alt}
          url={product.descripcion.imagen.url}
        />

        {product.inspiracion.usarInspiracion && (
          <InfoSection
            titulo="Inspiración"
            descripcion={product.inspiracion.contenido!.resena || ""}
            alt={product.inspiracion.contenido!.imagen?.alt || ""}
            url={product.inspiracion.contenido!.imagen?.url || ""}
            className="bg-color-bg-surface-1-default text-slate-900"
          />
        )}

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
              className="max-h-[377px]"
              isLink={false}
            />
          }
        />
      </section>
    </section>
  );
};

export default PerfumeLujo;

const DetallesProducto = () => {
  return (
    <div className="w-80 px-4 pt-4 pb-5 border-b border-zinc-700 flex-col justify-start items-center gap-5 inline-flex">
      <div className="self-stretch h-8 justify-start items-center inline-flex">
        <div className="px-3 py-1 border-b-2 border-white flex-col justify-center items-center inline-flex">
          <div className="justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-base font-medium font-inter leading-normal">
              Notas olfativas
            </div>
          </div>
        </div>
        <div className="px-3 py-1 border-b-2 border-zinc-700 flex-col justify-center items-center inline-flex">
          <div className="justify-center items-center gap-2.5 inline-flex">
            <div className="text-neutral-200 text-base font-medium font-inter leading-normal">
              Ingredientes
            </div>
          </div>
        </div>
        <div className="px-3 py-1 border-b-2 border-zinc-700 flex-col justify-center items-center inline-flex">
          <div className="justify-center items-center gap-2.5 inline-flex">
            <div className="text-neutral-200 text-base font-medium font-inter leading-normal">
              Info adicional
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch h-[340px] flex-col justify-start items-center gap-5 flex">
        <div className="self-stretch h-[52px] flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-neutral-200 text-lg font-bold font-tajawal leading-snug">
              Familia olfativa
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-zinc-100 text-lg font-normal font-tajawal leading-snug">
              Amaderada: Cálida, elegante y natural.
            </div>
          </div>
        </div>
        <div className="self-stretch h-[52px] flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-white text-lg font-bold font-tajawal leading-snug">
              Top Notes
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-white text-lg font-normal font-tajawal leading-snug">
              Bergamot, Pink Pepper, Cardamom, Heliotrope.
            </div>
          </div>
        </div>
        <div className="self-stretch h-[52px] flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-white text-lg font-bold font-tajawal leading-snug">
              Heart Notes
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-white text-lg font-normal font-tajawal leading-snug">
              Jasmine, Lavender, Bitter almond, Geranium.
            </div>
          </div>
        </div>
        <div className="self-stretch h-[52px] flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-white text-lg font-bold font-tajawal leading-snug">
              Base Notes
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-white text-lg font-normal font-tajawal leading-snug">
              Vanilla, Amber, Sandalwood, Natural Oud, Gaiac Wood
            </div>
          </div>
        </div>
        <div className="self-stretch h-[52px] flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-white text-lg font-bold font-tajawal leading-snug">
              Best time to wear
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-1 inline-flex">
            <div className="grow shrink basis-0 text-white text-lg font-normal font-tajawal leading-snug">
              During the colder months, or when going out on an adventure
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
