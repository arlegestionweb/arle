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
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { useCartStore } from "@/app/_components/cart";
import { colombianPriceStringToNumber } from "@/utils/helpers";

const Product = ({
  params,
  product,
}: {
  params: TParams;
  product: TProduct;
}) => {
  const [selectedVariant, setSelectedVariant] = useState<TVariant>(
    product.variantes[0]
  );

  return (
    <>
      {params.type === "gafasLujo" && product._type === "gafasLujo" && (
        <GafaLujo
          setSelectedVariant={setSelectedVariant}
          product={product}
          selectedVariant={selectedVariant as TVarianteGafa}
        />
      )}
      {params.type === "gafasPremium" && product._type === "gafasPremium" && (
        <GafaPremium
          product={product}
          selectedVariant={selectedVariant as TVarianteGafa}
          setSelectedVariant={setSelectedVariant}
        />
      )}
      {params.type === "perfumeLujo" && product._type === "perfumeLujo" && (
        <PerfumeLujo
          product={product}
          selectedVariant={selectedVariant as TPerfumeVariant}
          setSelectedVariant={setSelectedVariant}
        />
      )}
      {params.type === "perfumePremium" &&
        product._type === "perfumePremium" && (
          <PerfumePremium
            product={product}
            selectedVariant={selectedVariant as TPerfumeVariant}
            setSelectedVariant={setSelectedVariant}
          />
        )}
      {params.type === "relojesPremium" &&
        product._type === "relojesPremium" && (
          <RelojPremium
            product={product}
            selectedVariant={selectedVariant as TRelojVariant}
            setSelectedVariant={setSelectedVariant}
          />
        )}
      {params.type === "relojesLujo" && product._type === "relojesLujo" && (
        <RelojLujo
          product={product}
          selectedVariant={selectedVariant as TRelojVariant}
          setSelectedVariant={setSelectedVariant}
        />
      )}
    </>
  );
};

export default Product;
