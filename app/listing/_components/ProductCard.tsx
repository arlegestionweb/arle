"use client";
import Image from "next/image";
import {
  TColor,
  TGafa,
  TProduct,
  getTimedDiscountByProductId,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import Button from "../../_components/Button";
import { LuShoppingCart } from "react-icons/lu";
import ProductSlide from "../../_components/ProductSlide";
import Link from "next/link";
import Labels, { LabelTypes } from "../../_components/Labels";
import { useEffect, useState } from "react";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { colombianPriceStringToNumber } from "@/utils/helpers";
import { useCartStore } from "@/app/_components/cart/store";
import Precio from "@/app/_components/Precio";
import { TPricing } from "@/app/[type]/[id]/_components/Product";
import { TTimedDiscount } from "@/sanity/queries/pages/zodSchemas/general";
import { TVarianSelectorProps } from "@/app/_components/types/card";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";

const ProductoCard = ({ producto, discount }: {
  producto: TProduct,
  discount?: TTimedDiscount;
}) => {
  const [selectedVariant, setSelectedVariant] = useState<TVariant>(
    producto.variantes[0]
  );
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

  useEffect(() => {
    const fetchTimedDiscounts = async () => {
      const { discount } = await getTimedDiscountByProductId(producto._id);

      if (discount) {
        pricing.timedDiscountPrice = parseFloat(((1 - +discount.porcentaje / 100) * colombianPriceStringToNumber(selectedVariant.precio)).toFixed(0));
      }
    }

    fetchTimedDiscounts();
  }, [])

  return (
    <>
      {selectedVariant.etiqueta && (
        <Labels
          labelType={selectedVariant.etiqueta as LabelTypes}
          label={selectedVariant.etiqueta as LabelTypes}
          className="left-1/2 z-[21] transform -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <CardLayout pricing={pricing} product={producto} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
    </>
  );
};


const CardLayout = ({
  product,
  selectedVariant,
  setSelectedVariant,
  pricing
}: {
  product: TProduct;
  selectedVariant: TVariant;
  setSelectedVariant: (variant: TVariant) => void;
  pricing: TPricing;
}) => {
  const { addItem } = useCartStore();
  const addToCart = (producto: TProduct, selectedVariant: TVariant, quantity: number = 1) => {
    addItem({
      productId: producto._id,
      variantId: selectedVariant.codigoDeReferencia,
      price: pricing.finalPrice,
      quantity,
      productType: producto._type,
      discountType: "none",
      originalPrice: pricing.precioSinDescuento,
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
            className=" h-[180px] sm:h-[250px] lg:h-[288px]"
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
              className="object-cover h-[180px] sm:h-[250px] w-full lg:h-[288px]"
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
            : product.modelo}
        </h3>
        <VariantSelector
          product={product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        <Precio
          fullPrice={pricing.precioSinDescuento}
          discountedPrice={pricing.timedDiscountPrice || pricing.precioConDescuento}
          dontDisplayPaymentOptions
        />
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
                  className={`w-[27px] h-[26px] px-5 py-3 rounded-[5px] overflow-hidden border flex-col justify-center items-center gap-2.5 inline-flex ${isVariantSelected
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
                  ? `border-2 border-black p-[1px] rounded-[6px]`
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
                  ? `border-2 border-black rounded-[6px] p-[1px]`
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
      className={`w-[26px] h-[26px] rounded-[5px] border flex overflow-hidden ${
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
    className={`w-full h-full relative group`}
    style={{ backgroundColor: color.color }}
  >
    {/* <div className="absolute -left-2/3 -top-5 opacity-0 group-hover:opacity-100 w-fit whitespace-nowrap">
      {color.nombre}
    </div> */}
  </div>
);
