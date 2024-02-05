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
import { TPricing } from "@/app/[type]/[id]/_components/Product";

type PremiumLayoutProps = {
  product: TGafaPremium | TRelojPremium | TPerfumePremium;
  children: JSX.Element[] | JSX.Element;
  selectedVariant: TVariant;
  pricing: TPricing;
};

const PremiumLayout = ({ product, pricing, children, selectedVariant }: PremiumLayoutProps) => {
  const [modelo] = isPerfumePremium(product)
    ? [product.titulo]
    : [product.modelo];
  return (
    <section className="lg:grid lg:grid-cols-12 gap-8 min-h-screen row-auto w-full  lg:max-w-mx px-0 min-[1024px]:px-8 min-[1280px]:px-0">
      <ProductViewer
        product={product}
        className="col-start-8 col-span-1"
        selectedVariant={selectedVariant}
      />

      <section className="col-span-6 pb-5 col-start-1 row-start-1 flex flex-col px-6 lg:px-0 md:px-6 w-full relative">
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
          <Precio
            fullPrice={pricing.precioSinDescuento}
            discountedPrice={pricing.timedDiscountPrice || pricing.precioConDescuento}
          />
        </header>

        {children}
      </section>
    </section>
  );
};

export default PremiumLayout;
