"use client";

import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { TParams } from "../page";
import GafaLujo from "./gafas/Lujo";
import GafaPremium from "./gafas/Premium";
import PerfumeLujo from "./perfumes/Lujo";
import PerfumePremium from "./perfumes/Premium";
import RelojPremium from "./relojes/Premium";
import RelojLujo from "./relojes/Lujo";
import { useState } from "react";
import { TTimedDiscount, TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import TimedDiscount from "./TimedDiscount";
import { colombianPriceStringToNumber } from "@/utils/helpers";

export type TPricing = {
  precioConDescuento?: number;
  precioSinDescuento: number;
  timedDiscountPrice?: number;
  finalPrice: number;
  discountTypeUsed: "none" | "timedDiscount" | "discountedPrice";
}

const Product = ({
  params,
  product,
  discount
}: {
  params: TParams;
  product: TProduct;
  discount?: TTimedDiscount;
}) => {
  const [selectedVariant, setSelectedVariant] = useState<TVariant>(
    product.variantes[0]
  );

  const [cantidad, setCantidadState] = useState<number>(1);

  const setCantidad = (newCantidad: number) => {
    if (newCantidad < 1) {
      newCantidad = 1;
    }

    setCantidadState(newCantidad);
  };
  console.log({ selectedVariant, discount, variantes: product.variantes })

  const pricing: TPricing = {
    precioConDescuento: selectedVariant.precioConDescuento ? colombianPriceStringToNumber(selectedVariant.precioConDescuento) : undefined,
    precioSinDescuento: colombianPriceStringToNumber(selectedVariant.precio),
    timedDiscountPrice: discount ? parseFloat(((1 - +discount.porcentaje / 100) * colombianPriceStringToNumber(selectedVariant.precio)).toFixed(0)) : undefined,
    finalPrice: 0,
    discountTypeUsed: "none"
  }

  if (pricing.timedDiscountPrice) {
    pricing.finalPrice = pricing.timedDiscountPrice;
    pricing.discountTypeUsed = "timedDiscount";
  } else if (pricing.precioConDescuento) {
    pricing.finalPrice = pricing.precioConDescuento;
    pricing.discountTypeUsed = "discountedPrice";
  } else {
    pricing.finalPrice = pricing.precioSinDescuento;
    pricing.discountTypeUsed = "none";
  }

  console.log("in product.tsx", { pricing })
  return (
    <>
      {discount && pricing.discountTypeUsed === "timedDiscount" && (
        <TimedDiscount discount={discount} />
      )}
      {params.type === "gafasLujo" && product._type === "gafasLujo" && (
        <GafaLujo
          setSelectedVariant={setSelectedVariant}
          product={product}
          selectedVariant={selectedVariant as TVarianteGafa}
          cantidad={cantidad}
          setCantidad={setCantidad}
          pricing={pricing}
        />
      )}
      {params.type === "gafasPremium" && product._type === "gafasPremium" && (
        <GafaPremium
          product={product}
          selectedVariant={selectedVariant as TVarianteGafa}
          setSelectedVariant={setSelectedVariant}
          cantidad={cantidad}
          setCantidad={setCantidad}
          pricing={pricing}
        />
      )}
      {params.type === "perfumeLujo" && product._type === "perfumeLujo" && (
        <PerfumeLujo
          product={product}
          selectedVariant={selectedVariant as TPerfumeVariant}
          setSelectedVariant={setSelectedVariant}
          cantidad={cantidad}
          setCantidad={setCantidad}
          pricing={pricing}

        />
      )}
      {params.type === "perfumePremium" &&
        product._type === "perfumePremium" && (
          <PerfumePremium
            product={product}
            selectedVariant={selectedVariant as TPerfumeVariant}
            setSelectedVariant={setSelectedVariant}
            cantidad={cantidad}
            setCantidad={setCantidad}
            pricing={pricing}

          />
        )}
      {params.type === "relojesPremium" &&
        product._type === "relojesPremium" && (
          <RelojPremium
            product={product}
            selectedVariant={selectedVariant as TRelojVariant}
            setSelectedVariant={setSelectedVariant}
            cantidad={cantidad}
            setCantidad={setCantidad}
            pricing={pricing}

          />
        )}
      {params.type === "relojesLujo" && product._type === "relojesLujo" && (
        <RelojLujo
          product={product}
          selectedVariant={selectedVariant as TRelojVariant}
          setSelectedVariant={setSelectedVariant}
          cantidad={cantidad}
          setCantidad={setCantidad}
          pricing={pricing}

        />
      )}
    </>
  );
};

export default Product;
