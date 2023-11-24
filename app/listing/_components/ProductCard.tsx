"use client";
import Image from "next/image";
import {
  TGafa,
  TProduct,
  TVarianteGafa,
  TVariantePerdume,
  TVarianteReloj,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import Button from "../../_components/Button";
import { LuShoppingCart } from "react-icons/lu";
import ProductSlide from "./ProductSlide";
import Link from "next/link";
import Labels, { LabelTypes } from "../../_components/Labels";
import { useState } from "react";

const ProductoCard = ({ producto }: { producto: TProduct }) => {

  return (
    <>
      {producto.variantes[0].etiqueta && (
        <Labels
          labelType={producto.variantes[0].etiqueta as LabelTypes}
          label={producto.variantes[0].etiqueta as LabelTypes}
          className="left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <CardLayout product={producto} />
    </>
  );
};

type TVariant = TVariantePerdume | TVarianteGafa | TVarianteReloj;

const CardLayout = ({ product }: { product: TProduct }) => {
  const [selectedVariant, setSelectedVariant] = useState<TVariant>(
    product.variantes[0]
  );

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
                : isReloj(product)
                ? product.variantes[0].imagenes
                : (product as TGafa).variantes[0].imagenes
            }
            className=" h-[180px] lg:h-[288px]"
          />
        ) : (
          <Link href={product.slug}>
            <Image
              src={
                isPerfume(product)
                  ? product.imagenes[0].url
                  : isReloj(product)
                  ? product.variantes[0].imagenes[0].url
                  : (product as TGafa).variantes[0].imagenes[0].url
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
              className="object-cover h-[180px] w-full lg:h-[288px]"
            />
          </Link>
        )}
      </section>

      <section className=" flex-1 justify-between font-tajawal flex flex-col gap-3">
        <h3 className="text-xl font-bold leading-6 text-[#303030]">
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
        <p className="text-[18px] font-medium leading-5 text-[#4f4f4f]">
          ${selectedVariant.precio}
        </p>
      </section>
      <Button labelType={"dark"} className="flex justify-center items-center gap-2">
        <LuShoppingCart />
        <span className="font-inter text-base font-medium leading-6">
          Agregar
        </span>
      </Button>
    </>
  );
};

export default ProductoCard;

const VariantSelector = ({
  product,
  setSelectedVariant,
  selectedVariant,
}: {
  product: TProduct;
  selectedVariant: TVariant;
  setSelectedVariant: (variant: TVariant) => void;
}) => {

  if (isPerfume(product)) {

    return (
      <div className="flex gap-2 flex-col w-fit">
        <h4>Tamaño (ml):</h4>
        <div className="flex gap-2">
          {product.variantes.map((variante) => {
            if ("tamano" in variante && "tamano" in selectedVariant) {
              const isVariantSelected =
                variante.tamano === selectedVariant.tamano;
              return (
                <button
                  onClick={() => setSelectedVariant(variante)}
                  className={`w-[27px] h-[26px] px-5 py-3 rounded border flex-col justify-center items-center gap-2.5 inline-flex ${
                    isVariantSelected
                      ? "bg-neutral-100 border-black"
                      : "bg-neutral-200 border-neutral-300"
                  }`}
                >
                  {variante.tamano}
                </button>
              );
            }
            // TODO the other variant types
            return null;
          })}
        </div>
      </div>
    );
  }
  return <div>escoge color</div>;
};
