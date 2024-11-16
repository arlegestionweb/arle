"use client";
import {
  TColor,
  TGafa,
  TPerfume,
  TProduct,
  TReloj,
  getTimedDiscountByProductId,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import Button from "../../_components/Button";
import { LuShoppingCart } from "react-icons/lu";
import ProductSlide from "../../_components/ProductSlide";
import Link from "next/link";
import Labels from "../../_components/Labels";
import { useEffect, useState } from "react";
import { TRelojVariant } from "@/sanity/queries/pages/zodSchemas/reloj";
import { colombianPriceStringToNumber } from "@/utils/helpers";
import { useCartStore } from "@/app/_components/cart/store";
import Precio from "@/app/_components/Precio";
import { TPricing } from "@/app/[type]/[id]/_components/Product";
import { TTimedDiscount } from "@/sanity/queries/pages/zodSchemas/general";
import { TVarianSelectorProps } from "@/app/_components/types/card";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { isGafaLujo, isPerfumeLujo, isPerfumePremium, isRelojLujo } from "@/sanity/queries/pages/types";
import ImageWrapper from "./ImageWrapper";
import { addedToCartPixelView } from "@/app/_lib/pixelActions";
import { getOrSetExternalIdPixel } from "@/app/_lib/utils";

const ProductoCard = ({
  producto,
  discount,
}: {
  producto: TProduct;
  discount?: TTimedDiscount;
}) => {
  const [selectedVariant, setSelectedVariant] = useState<TVariant>(
    producto.variantes[0]
  );
  const pricing: TPricing = {
    precioConDescuento: selectedVariant.precioConDescuento
      ? colombianPriceStringToNumber(selectedVariant.precioConDescuento)
      : undefined,
    precioSinDescuento: colombianPriceStringToNumber(selectedVariant.precio),
    timedDiscountPrice: discount
      ? parseFloat(
        (
          (1 - +discount.porcentaje / 100) *
          colombianPriceStringToNumber(selectedVariant.precio)
        ).toFixed(0)
      )
      : undefined,
    finalPrice: 0,
    discountTypeUsed: "none",
  };

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
        pricing.timedDiscountPrice = parseFloat(
          (
            (1 - +discount.porcentaje / 100) *
            colombianPriceStringToNumber(selectedVariant.precio)
          ).toFixed(0)
        );
      }
    };

    fetchTimedDiscounts();
  }, []);

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
        pricing={pricing}
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
  pricing,
}: {
  product: TProduct;
  selectedVariant: TVariant;
  setSelectedVariant: (variant: TVariant) => void;
  pricing: TPricing;
}) => {
  const { addItem } = useCartStore();

  const addToCart = async (
    producto: TProduct,
    selectedVariant: TVariant,
    quantity: number = 1
  ) => {
    addItem({
      productId: producto._id,
      productName: `${product.marca} ${product._type === "gafasLujo" || product._type === "gafasPremium" || product._type === "relojesLujo" || product._type === "relojesPremium" ? product.modelo : product.titulo}`,
      productCode: selectedVariant.codigoDeReferencia,
      variantId: selectedVariant.codigoDeReferencia,
      price: pricing.finalPrice,
      quantity,
      productType: producto._type,
      discountType: "none",
      originalPrice: pricing.precioSinDescuento,
    });
    const productObject = {
      productName : `${product.marca} ${product._id}`,
      productType: `${product._type}`,
      productValue: `${selectedVariant.precio}`
    }
    const externalId = getOrSetExternalIdPixel();
    const savedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("shippingData") || "{}") : null;
    const clientData = {
      name: savedData.name as string,
      email: savedData.email as string,
      phone: savedData.phone as string
    }
    if(typeof window !== "undefined"){
      const fbclid = localStorage.getItem("fbclid") || null;
      addedToCartPixelView(productObject, clientData, externalId, fbclid);
    } else {
      addedToCartPixelView(productObject, clientData, externalId, null);
    }
  };

  const imgSrc = 
   "imagenes" in selectedVariant
      ? selectedVariant.imagenes[0].url
      : "";


  const imgAlt = isPerfume(product)
    ? (product as TPerfume).variantes[0].imagenes[0].alt!
    : isReloj(product)
      ? (product as TReloj).variantes[0].imagenes[0].alt!
      : (product as TGafa).variantes[0].imagenes[0].alt!;


  return (
    <>
      <section className="h-full w-full overflow-hidden">
        {(isPerfume(product) && product.variantes[0].imagenes.length > 1) ||
          (isReloj(product) && product.variantes[0].imagenes.length > 1) ||
          (isGafa(product) && product.variantes[0].imagenes.length > 1) ? (
          <ProductSlide
            slug={product.slug}
            imagesProduct={
                 "imagenes" in selectedVariant
                  ? selectedVariant.imagenes
                  : []
            }
            className=" h-[180px] sm:h-[250px]"
          />
        ) : (
          <Link href={product.slug} >
          <section className="relative h-[180px] sm:h-[250px]">
            <ImageWrapper
              src={
                imgSrc
              }
              alt={
                imgAlt
              }
              width={250}
              height={250}
              className="object-contain h-full w-full"
              />
          </section>
          </Link>
        )}
      </section >

      <section className=" flex-1 justify-end font-tajawal flex flex-col gap-1">
        <Link href={product.slug} className="flex flex-col gap-0.5">
          <h2 className="leading-none text-lg md:text-xl md:leading-none font-bold  text-gray-800 capitalize group-hover:underline underline-offset-2">
            {product.marca}
          </h2>
          <h3 className="text-md md:text-lg md:leading-none font-medium text-gray-700 leading-none">
            {isPerfumePremium(product)
              ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${product.detalles.concentracion}`
              : isPerfumeLujo(product)
                ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${product.concentracion}`
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
        {product.variantes.length > 1 && (
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        )}
        <Precio
          fullPrice={pricing.precioSinDescuento}
          discountedPrice={
            pricing.timedDiscountPrice || pricing.precioConDescuento
          }
          dontDisplayPaymentOptions
        />
      </section>
      <Button
        disabled={selectedVariant.unidadesDisponibles <= 0 ? true : false}
        onClick={() => addToCart(product, selectedVariant)}
        labelType={"dark"}
        className="flex justify-center items-center gap-2 button-float"
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
      <section className="flex flex-wrap gap-y-1 gap-x-2 items-center">
        <h4 className="leading-none font-tajawal text-gray-600 cursor-default">
          Tamaño:
        </h4>
        <div className="flex gap-2">
          {product.variantes.map((variante: TVariant, index) => {
            if ("tamano" in variante && "tamano" in selectedVariant) {
              const isVariantSelected =
                variante.tamano === selectedVariant.tamano;
              return (
                <button
                  onClick={() => setSelectedVariant(variante)}
                  className={`h-7 min-w-7 px-1.5 pt-1 rounded-[5px] text-sm leading-none overflow-hidden border justify-center items-center ${isVariantSelected
                    ? "bg-neutral-100 border-black"
                    : "bg-neutral-200 border-neutral-300"
                    }`}
                  key={`${variante.tamano}-${variante.precio}-${index}`}
                >
                  {variante.tamano}ml
                </button>
              );
            }
          })}
        </div>
      </section>
    );
  }

  if (isGafa(product)) {
    // product.variantes[0].colorDeLaMontura.color;
    return (
      <section className="flex flex-wrap gap-y-1 gap-x-2 items-center">
        <h4 className="leading-none text-gray-600">Color:</h4>
        <ul className="flex gap-1.5 items-center">
          {product.variantes.map((variante, index) => (
            <li
              key={`${variante.colorDeLaMontura.nombre}-${index}`}
              className={
                "codigoDeReferencia" in selectedVariant &&
                  variante.codigoDeReferencia ===
                  selectedVariant.codigoDeReferencia
                  ? `border-[1.5px] border-gray-500 p-[1px] rounded-[6.5px]`
                  : `border-[1.5px] border-transparent p-[1px]`
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
      </section>
    );
  }
  if (isReloj(product)) {
    // product.variantes[0].colorDeLaMontura.color;
    return (
      <section className="flex flex-wrap gap-y-1 gap-x-2 items-center">
        <h4 className="leading-none text-gray-600">Color:</h4>
        <ul className="flex gap-2 items-center">
          {product.variantes.map((variante: TRelojVariant, index) => (
            <li
              key={`${variante.colorCaja.nombre}-${index}`}
              className={
                "codigoDeReferencia" in selectedVariant &&
                  selectedVariant.codigoDeReferencia ===
                  variante.codigoDeReferencia
                  ? `border-[1.5px] border-gray-500 rounded-[6.5px] p-[1px]`
                  : `border-[1.5px] border-transparent p-[1px]`
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
      </section>
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
      className={`w-6 h-6 rounded-[5px] border flex overflow-hidden ${
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
