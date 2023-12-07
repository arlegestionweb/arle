import {
  TGafaPremium,
  TPerfumePremium,
  TRelojPremium,
  isPerfumePremium,
} from "@/sanity/queries/pages/types";
import ProductViewer from "./ProductView";
import Labels, { LabelTypes } from "../Labels";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";

type PremiumLayoutProps = {
  product: TGafaPremium | TRelojPremium | TPerfumePremium;
  children: JSX.Element[] | JSX.Element;
};

const PremiumLayout = ({ product, children }: PremiumLayoutProps) => {
  const [modelo] = isPerfumePremium(product)
    ? [product.titulo]
    : [product.modelo];

  return (
    <section className="lg:grid lg:grid-cols-12 gap-8 min-h-screen row-auto w-full lg:max-w-[calc(1280px+32px)]">
      <ProductViewer
        product={product}
        className="col-start-8 col-span-1"
      />

      <section className="col-span-6 col-start-1 row-start-1 flex flex-col px-5 md:px-8 w-full relative">
        <Labels
          className="relative max-w-fit mt-4 mb-2"
          labelType={product.variantes[0].etiqueta as LabelTypes}
          label={product.variantes[0].etiqueta as LabelTypes}
        />

        <header>
          <h1 className="text-zinc-800 text-[32px] font-normal font-kanit leading-10 w-full">
            {product.marca} {modelo}
          </h1>
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            CODE: {product.variantes[0].codigoDeReferencia}
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

        {children}
      </section>
    </section>
  );
};

export default PremiumLayout;
