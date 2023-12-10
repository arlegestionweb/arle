import { TPerfumeLujo } from "@/sanity/queries/pages/types";
import Image from "next/image";
import Labels, { LabelTypes } from "../../../../_components/Labels";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";
import Cantidad from "../Cantidad";

type TPerfumeLujoProps = {
  product: TPerfumeLujo;
};

const PerfumeLujo = ({ product }: TPerfumeLujoProps) => {
  console.log(product);

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

        <section className="bg-slate-900 min-h-[40vh] pt-6">
          <section className="px-4 flex flex-col gap-2 pb-5">
            <h2 className="text-color-bg-surface-1-default text-2xl font-normal font-crimson leading-7">
              Descripción
            </h2>
            <p className="grow shrink basis-0 text-color-bg-surface-0-default text-lg font-normal font-tajawal leading-snug">
              {product.descripcion.texto}
            </p>
          </section>
          <div className="relative w-full h-64">
            <Image
              alt={product.descripcion.imagen.alt}
              src={product.descripcion.imagen.url}
              layout="fill"
              className="object-cover"
            />
          </div>
        </section>

        <section>
          
        </section>

      </section>
    </section>
  );
};

export default PerfumeLujo;
