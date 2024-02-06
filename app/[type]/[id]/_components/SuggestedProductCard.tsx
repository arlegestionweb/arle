"use client";

import Button from "@/app/_components/Button";
import Labels, { LabelTypes } from "@/app/_components/Labels";
import ProductSlide from "@/app/_components/ProductSlide";
import { useCartStore } from "@/app/_components/cart/store";
import { VariantSelector } from "@/app/listing/_components/ProductCard";
import {
  TGafa,
  TProduct,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { colombianPriceStringToNumber } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SuggestedProductCard = ({ producto }: { producto: TProduct }) => {
  const [selectedVariant, setSelectedVariant] = useState<TVariant>(
    producto.variantes[0]
  );


  return (
    <>
      {selectedVariant.etiqueta && (
        <Labels
          labelType={selectedVariant.etiqueta as LabelTypes}
          label={selectedVariant.etiqueta as LabelTypes}
          className=" left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <CardLayout
        product={producto}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />
    </>
  );
};

const CardLayout = ({
  product,
  selectedVariant,
  setSelectedVariant,
}: {
  product: TProduct;
  selectedVariant: TVariant;
  setSelectedVariant: (variant: TVariant) => void;
}) => {
  const { addItem } = useCartStore();

  const addToCart = (
    producto: TProduct,
    selectedVariant: TVariant,
    quantity: number = 1
  ) => {
    addItem({
      discountType: "none",
      originalPrice: 1999,
      productId: producto._id,
      variantId: selectedVariant.registroInvima,
      price: colombianPriceStringToNumber(selectedVariant.precio),
      quantity,
      productType: producto._type,
    });
  };

  return (
    <>
      <section className="w-full  overflow-hidden">
        {(isPerfume(product) && product.imagenes.length > 1) ||
        (isReloj(product) && product.variantes[0].imagenes.length > 1) ||
        (isGafa(product) && product.variantes[0].imagenes.length > 1) ? (
          <ProductSlide
            slug={product.slug}
            imagesProduct={
              isPerfume(product)
                ? product.imagenes
                : "imagenes" in selectedVariant
                ? selectedVariant.imagenes
                : []
            }
            className=" h-[180px] sm:h-[180px] lg:h-[180px]"
          />
        ) : (
          <Link href={product.slug}>
            <Image
              src={
                isPerfume(product)
                  ? product.imagenes[0].url
                  : "imagenes" in selectedVariant
                  ? selectedVariant.imagenes[0].url
                  : ""
              }
              alt={
                isPerfume(product)
                  ? product.imagenes[0].url
                  : isReloj(product)
                  ? product.variantes[0].imagenes[0].alt!
                  : (product as TGafa).variantes[0].imagenes[0].alt!
              }
              width={288}
              height={288}
              className="object-cover h-[180px] sm:h-[180px] w-full lg:h-[180px]"
            />
          </Link>
        )}
      </section>

      <section className="pt-4 flex-1 justify-between font-tajawal flex flex-col gap-[7px]">
        <h3 className="text-xl font-bold leading-tight text-[#303030]">
          {isPerfume(product)
            ? product.titulo
            : isReloj(product)
            ? product.modelo
            : ([] as any)}
        </h3>
        <VariantSelector
          product={product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        <p className="text-[18px] font-medium leading-5 text-neutral-600 font-tajawal">
          ${selectedVariant.precio}
        </p>
      </section>
    </>
  );
};

export default SuggestedProductCard;
