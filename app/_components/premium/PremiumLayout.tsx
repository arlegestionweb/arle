import {
  TGafaPremium,
  TPerfumePremium,
  TRelojPremium,
  isPerfumePremium,
} from "@/sanity/queries/pages/types";
import ProductViewer from "./ProductView";
import Labels from "../Labels";
import {
  TVariant,
} from "@/sanity/queries/pages/zodSchemas/general";
import Precio from "../Precio";
import { TPricing } from "@/app/[type]/[id]/_components/Product";
import { GoChevronLeft } from "react-icons/go";
import { isPerfume } from "@/sanity/queries/pages/listingQueries";
import BlackFridayProductDiscount from "../BlackFridayProductDiscount";

type PremiumLayoutProps = {
  product: TGafaPremium | TRelojPremium | TPerfumePremium;
  children: JSX.Element[] | JSX.Element;
  selectedVariant: TVariant;
  pricing: TPricing;
};

const PremiumLayout = ({
  product,
  pricing,
  children,
  selectedVariant,
}: PremiumLayoutProps) => {
  const [modelo] = isPerfumePremium(product)
    ? [product.titulo]
    : [product.modelo];

    const discountPercent = pricing.precioConDescuento ? Math.round((1 - (pricing.precioConDescuento / pricing.precioSinDescuento)) * 100) : null

  return (
    <section className="default-paddings w-full flex justify-center lg:py-8">
      <section className="w-full max-w-screen-xl flex flex-col lg:flex-row-reverse lg:items-center gap-8 ">
        <ProductViewer
          product={product}
          selectedVariant={selectedVariant}
        />

        <section className="py-5 lg:py-0 flex flex-col w-full basis-full relative grow-0 shrink items-center">
          <header className="flex flex-col gap-2.5 w-full">
            <button
              className="flex items-center -ml-1 group"
              onClick={() => window.history.back()}
            >
              <GoChevronLeft className="text-lg text-gray-700 group-hover:text-gray-500" />
              <span className="text-gray-700 text-base font-normal font-inter leading-[21px] underline-offset-2 group-hover:underline group-hover:text-gray-500">
                Volver
              </span>
            </button>

            {selectedVariant.unidadesDisponibles === 0 ? (
              <Labels
                label={"Agotado"}
                className="relative max-w-fit lg:mt-0 mb-2"
              />
            ) : selectedVariant.mostrarUnidadesDisponibles &&
              selectedVariant.unidadesDisponibles < 4 ? (
              <Labels
                label={"Ultimas Unidades"}
                className="relative max-w-fit lg:mt-0 mb-2"
              />
            ) : (
              selectedVariant.tag && (
                <Labels
                  label={selectedVariant.tag}
                  className="relative max-w-fit lg:mt-0 mb-2"
                />
              )
            )}
              <BlackFridayProductDiscount discountPercent={discountPercent} />

            <h1 className="text-zinc-800 text-3xl lg:text-4xl font-bold font-play capitalize">
              {product.marca}
            </h1>
            <h1 className="text-2xl text-gray-600 font-bold font-play -mt-2 mb-2 capitalize">
              {isPerfume(product) && product.parteDeUnSet && "Set - "}{modelo}
            </h1>
            {isPerfumePremium(product) && (
              <h2 className="text-xl -mt-3 mb-2 text-gray-600 font-normal font-play">
              {product.detalles.concentracion} - {"tamano" in selectedVariant && selectedVariant.tamano}ml
              </h2>
              )}
            <span className="text-zinc-500 text-sm md:text-base md:leading-none font-normal font-tajawal leading-none">
              Código: {selectedVariant.codigoDeReferencia}
            </span>
            <Precio
              fullPrice={pricing.precioSinDescuento}
              discountedPrice={
                pricing.timedDiscountPrice || pricing.precioConDescuento
              }
            />
          </header>

          {children}
        </section>
      </section>
    </section>
  );
};

export default PremiumLayout;
