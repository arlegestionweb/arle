"use client";
import Image from "next/image";
import {
  TColor,
  TGafa,
  TProduct,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import Button from "../../_components/Button";
import { LuShoppingCart } from "react-icons/lu";
import ProductSlide from "../../_components/ProductSlide";
import Link from "next/link";
import Labels, { LabelTypes } from "../../_components/Labels";
import { use, useState } from "react";
import { TVarianteGafa } from "@/sanity/queries/pages/zodSchemas/gafas";
import { TPerfumeVariant } from "@/sanity/queries/pages/zodSchemas/perfume";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { useCartStore } from "@/app/_components/cart";
import { colombianPriceStringToNumber } from "@/utils/helpers";

const ProductoCard = ({ producto }: { producto: TProduct }) => {
  const [selectedVariant, setSelectedVariant] = useState<TVariant>(
    producto.variantes[0]
  );

  return (
    <>
      {selectedVariant.etiqueta && (
        <Labels
          labelType={selectedVariant.etiqueta as LabelTypes}
          label={selectedVariant.etiqueta as LabelTypes}
          className="left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <CardLayout product={producto} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
    </>
  );
};

type TVariant = TPerfumeVariant | TVarianteGafa | TRelojVariant;

const CardLayout = ({
  product,
  selectedVariant,
  setSelectedVariant
}: {
  product: TProduct;
  selectedVariant: TVariant;
  setSelectedVariant: (variant: TVariant) => void;
}) => {
  const { addItem } = useCartStore();
  const addToCart = (producto: TProduct, selectedVariant: TVariant) => {
    addItem({
      productId: producto._id,
      variantId: selectedVariant.registroInvima,
      price: colombianPriceStringToNumber(selectedVariant.precio),
      quantity: 1,
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
            className=" h-[180px] lg:h-[288px]"
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
      <Button
        onClick={() => addToCart(product, selectedVariant)}
        labelType={"dark"}
        className="flex justify-center items-center gap-2"
      >
        <LuShoppingCart />
        <span className="font-inter text-base font-medium leading-6">
          Agregar
        </span>
      </Button>
    </>
  );
};

export default ProductoCard;

type TVarianSelectorProps<T extends TProduct> = {
  product: T;
  selectedVariant: T["variantes"][0];
  setSelectedVariant: (variant: T["variantes"][0]) => void;
};
export const VariantSelector = <T extends TProduct>({
  product,
  setSelectedVariant,
  selectedVariant,
}: TVarianSelectorProps<T>) => {
  if (isPerfume(product)) {
    return (
      <div className="flex gap-2 flex-col w-fit">
        <h4>Tamaño (ml):</h4>
        <div className="flex gap-2">
          {product.variantes.map((variante: TVariant, index) => {
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
                  key={`${variante.tamano}-${variante.precio}-${index}`}
                >
                  {variante.tamano}
                </button>
              );
            }
          })}
        </div>
      </div>
    );
  }

  if (isGafa(product)) {
    // product.variantes[0].colorDeLaMontura.color;
    return (
      <>
        <h4>Color:</h4>
        <ul className="flex gap-2">
          {product.variantes.map((variante, index) => (
            <li
              key={`${variante.colorDeLaMontura.nombre}-${index}`}
              className={
                "codigoDeReferencia" in selectedVariant &&
                variante.codigoDeReferencia ===
                  selectedVariant.codigoDeReferencia
                  ? `border-2 border-black p-[1px]`
                  : ""
              }
            >
              <ColorSelector
                onClick={() => setSelectedVariant(variante)}
                color1={variante.colorDeLaMontura}
                color2={variante.colorDelLente}
                color3={variante.colorDeLaVarilla}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
  if (isReloj(product)) {
    // product.variantes[0].colorDeLaMontura.color;
    return (
      <>
        <h4>Color:</h4>
        <ul className="flex gap-2">
          {product.variantes.map((variante: TRelojVariant, index) => (
            <li
              key={`${variante.colorCaja.nombre}-${index}`}
              className={
                "codigoDeReferencia" in selectedVariant &&
                selectedVariant.codigoDeReferencia ===
                  variante.codigoDeReferencia
                  ? `border-2 border-black p-[1px]`
                  : ""
              }
            >
              <ColorSelector
                onClick={() => setSelectedVariant(variante)}
                color1={variante.colorCaja}
                color2={variante.colorPulso}
                color3={variante.colorTablero}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
};

const ColorSelector = ({
  color1,
  onClick,
  color2,
  color3,
}: {
  onClick: () => void;
  color1: TColor;
  color2: TColor;
  color3: TColor;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[27px] h-[26px] rounded border flex ${
        // variante.colorDeLaMontura.color === selectedVariant.colorDeLaMontura.color
        //   ? "bg-neutral-100 border-black"
        //   : "bg-neutral-200 border-neutral-300"
        "border-neutral-300"
      }`}
    >
      <ColorBar color={color1} />
      <ColorBar color={color2} />
      <ColorBar color={color3} />
    </button>
  );
};
const ColorBar = ({ color }: { color: TColor }) => (
  <div
    className={`w-1/3 h-full relative group`}
    style={{ backgroundColor: color.color }}
  >
    <div className="absolute -left-2/3 -top-5 opacity-0 group-hover:opacity-100 w-fit whitespace-nowrap">
      {color.nombre}
    </div>
  </div>
);
