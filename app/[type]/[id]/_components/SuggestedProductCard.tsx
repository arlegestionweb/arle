"use client";
import Labels from "@/app/_components/Labels";
import ProductSlide from "@/app/_components/ProductSlide";
import { VariantSelector } from "@/app/listing/_components/ProductCard";
import {
  TGafa,
  TPerfume,
  TProduct,
  TReloj,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import {
  isGafaLujo,
  isPerfumeLujo,
  isPerfumePremium,
  isRelojLujo,
} from "@/sanity/queries/pages/types";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import Link from "next/link";
import { useState } from "react";

const SuggestedProductCard = ({ producto }: { producto: TProduct }) => {
  const [selectedVariant, setSelectedVariant] = useState<TVariant>(
    producto.variantes[0]
  );

  return (
    <>
      {selectedVariant.unidadesDisponibles <= 0 ? (
        <Labels
          label={"Agotado"}
          className="left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
        />
      ) : selectedVariant.mostrarUnidadesDisponibles &&
        selectedVariant.unidadesDisponibles < 4 ? (
        <Labels
          label={"Ultimas Unidades"}
          className="left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
        />
      ) : (
        selectedVariant.tag && (
          <Labels
            label={selectedVariant.tag}
            className="left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
          />
        )
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
  return (
    <>
      <section className="w-full h-[150px] overflow-hidden">
        {product.variantes[0].imagenes.length > 1 ? (
          <ProductSlide
            slug={product.slug}
            imagesProduct={
              "imagenes" in selectedVariant ? selectedVariant.imagenes : []
            }
            className="h-full w-full"
          />
        ) : (
          "imagenes" in selectedVariant && (
            <Link href={product.slug} className="h-full w-full">
              <picture
                className={`object-contain h-full w-full`}
              >
                <source
                  sizes={`(max-width: 608px) 400px, 200px`}
                  srcSet={`
                    ${selectedVariant.imagenes[0].url}?fit=max&q=75&w=640&fm=webp 640w,
                    ${selectedVariant.imagenes[0].url}?fit=max&q=75&w=320&fm=webp 320w,
                  `}
                  type="image/webp"
                />
                <img
                  src={selectedVariant.imagenes[0].url}
                  alt={product.variantes[0].imagenes[0].alt || ""}
                  width={200}
                  height={200}
                  className="h-full w-full object-contain"
                />
              </picture>
            </Link>
          )
        )}
      </section>

      <section className="mt-2 flex-1 justify-end font-tajawal flex flex-col gap-1">
        <Link href={product.slug} className="flex flex-col gap-0.5">
          <h2 className="leading-none text-lg md:text-xl md:leading-none font-bold  text-gray-800 capitalize">
            {product.marca}
          </h2>
          <h3 className="text-md md:text-lg md:leading-none font-medium text-gray-700 leading-none">
            {isPerfumePremium(product)
              ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${
                  product.detalles.concentracion
                }`
              : isPerfumeLujo(product)
              ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${
                  product.concentracion
                }`
              : isReloj(product)
              ? product.modelo
              : product.modelo}
          </h3>
          {isPerfume(product) && (
            <p className="text-sm leading-none capitalize text-gray-600">
              {`${"tamano" in selectedVariant && selectedVariant.tamano}ml | `}
              {product.genero}
            </p>
          )}
          {isGafa(product) && (
            <p className="text-sm leading-none capitalize text-gray-600">
              {isGafaLujo(product)
                ? product.especificaciones.tipoDeGafa
                : product.detalles.tipoDeGafa}
              {` | ${product.genero}`}
            </p>
          )}
          {isReloj(product) && (
            <p className="text-sm leading-none capitalize text-gray-600">
              {isRelojLujo(product)
                ? product.movimiento?.tipoDeMovimiento
                : product.detallesReloj.tipoDeMovimiento}
              {` | ${product.genero}`}
            </p>
          )}
        </Link>
      </section>
    </>
  );
};

export default SuggestedProductCard;
