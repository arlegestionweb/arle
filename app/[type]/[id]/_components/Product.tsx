"use client";

import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { TParams } from "../page";
import GafaLujo from "./gafas/Lujo";
import GafaPremium from "./gafas/Premium";
import PerfumeLujo from "./perfumes/Lujo";
import PerfumePremium from "./perfumes/Premium";
import RelojPremium from "./relojes/Premium";
import RelojLujo from "./relojes/Lujo";
import { use, useEffect, useState } from "react";
import { TTimedDiscount, TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import TimedDiscount from "./TimedDiscount";
import { colombianPriceStringToNumber } from "@/utils/helpers";
import { useRecentlyViewedProductsStore } from "./recentlyViewedProductsStore";
import { ProductCardSlide } from "./ProductCardSlide";
import { pagePixelView } from "@/app/_lib/pixelActions";
import { getOrSetExternalIdPixel } from "@/app/_lib/utils";

export type TPricing = {
  precioConDescuento?: number;
  precioSinDescuento: number;
  timedDiscountPrice?: number;
  finalPrice: number;
  discountTypeUsed: "none" | "timedDiscount" | "discountedPrice";
}

const Product = ({
  params,
  searchParams,
  product,
  discount,
  recommendedProducts
}: {
  params: TParams;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  product: TProduct;
  discount?: TTimedDiscount;
  recommendedProducts?: TProduct[];
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

  const { addProduct, recentlyViewedProducts, getProductsFromLocalStorage } = useRecentlyViewedProductsStore();

  useEffect(() => {
    const externalId = getOrSetExternalIdPixel();
    const savedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("shippingData") || "{}") : null;
    const searchfbclid = searchParams.fbclid as string || null;
    if(searchfbclid && typeof window !== 'undefined') {
      const timeInMillis = Date.now();
      const setFbclid = `fb.1.${timeInMillis}.${searchfbclid}`
      localStorage.setItem("fbclid",setFbclid)
    };
    const clientData = {
      name: savedData.name as string,
      email: savedData.email as string,
      phone: savedData.phone as string
    }
    if(typeof window !== "undefined"){
      const fbclid = localStorage.getItem("fbclid") || null;
      pagePixelView(clientData, externalId, fbclid);
    } else {
      pagePixelView(clientData, externalId, null);
    }
    const fetchRecentlyViewedProductsFromLocalStorage = async () =>{
      return await getProductsFromLocalStorage();
    };

    fetchRecentlyViewedProductsFromLocalStorage();
    addProduct(product)
  }, [])

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
      <section className="flex flex-col gap-6">
        {recommendedProducts && recommendedProducts?.length > 0 && (
          <ProductCardSlide nameSection="Productos Sugeridos" products={recommendedProducts} />
        )}
        <ProductCardSlide nameSection="Vistos recientemente" products={recentlyViewedProducts} />
      </section>
    </>
  );
};

export default Product;
