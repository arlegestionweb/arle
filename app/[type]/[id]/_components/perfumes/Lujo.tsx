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

      <section className="px-4 pb-6">
        <Labels
          className="relative max-w-fit mt-4 mb-2"
          labelType={"ultimas unidades"}
          label={"ultimas unidades"}
        />
        <header>
          <h1 className="text-zinc-800 text-[32px] font-normal font-kanit leading-10 w-full">
            {product.marca}
          </h1>
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            CODE:
          </span>
          <p className="text-zinc-800 text-[32px] font-normal font-kanit leading-9">
            $90000
          </p>
          <div className="text-justify">
            <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
              Págalo a 4 cuotas de $
              {numberToColombianPriceString(
                colombianPriceStringToNumber("90000") / 4
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

        <section className="mt-2">
          <Cantidad />
        </section>

        
      </section>
    </section>
  );
};

export default PerfumeLujo;
