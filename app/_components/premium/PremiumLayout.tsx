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
import { TTimedDiscount, TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import Precio from "../Precio";

type PremiumLayoutProps = {
  product: TGafaPremium | TRelojPremium | TPerfumePremium;
  children: JSX.Element[] | JSX.Element;
  selectedVariant: TVariant;
  discount?: TTimedDiscount;
};

const PremiumLayout = ({ product, discount, children, selectedVariant }: PremiumLayoutProps) => {
  const [modelo] = isPerfumePremium(product)
    ? [product.titulo]
    : [product.modelo];

  // console.log({product, selectedVariant}, "here")
  const price = discount ? Math.floor((1 - +discount.porcentaje / 100) * colombianPriceStringToNumber(selectedVariant.precio)) : Math.floor(colombianPriceStringToNumber(selectedVariant.precio)); console.log({ discount })
  return (
    <section className="lg:grid lg:grid-cols-12 gap-8 min-h-screen row-auto w-full lg:max-w-mx">
      <ProductViewer
        product={product}
        className="col-start-8 col-span-1"
        selectedVariant={selectedVariant}
      />

      <section className="col-span-6 pb-5 col-start-1 row-start-1 flex flex-col px-5 md:px-8 w-full relative">
        <Labels
          className="relative max-w-fit mt-4 mb-2"
          labelType={selectedVariant.etiqueta as LabelTypes}
          label={selectedVariant.etiqueta as LabelTypes}
        />

        <header>
          <h1 className="text-zinc-800 text-[32px] font-normal font-kanit leading-10 w-full">
            {product.marca} {modelo}
          </h1>
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            CODE: {selectedVariant.codigoDeReferencia}
          </span>
          <Precio price={price} selectedVariant={selectedVariant} discount={discount} />
        </header>

        {children}
      </section>
    </section>
  );
};

export default PremiumLayout;
