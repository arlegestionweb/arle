import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import AddToCart from "@/app/[type]/[id]/_components/AddToCart";
import NuestrasComprasIncluyen from "@/app/[type]/[id]/_components/NuestrasComprasIncluyen";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";
import Labels from "../Labels";
import GalleryProduct from "./GalleryProduct";
import {
  TGafaLujo,
  TPerfumeLujo,
  TRelojLujo,
  isPerfumeLujo,
} from "@/sanity/queries/pages/types";
import { imageType } from "../types";
import {
  TTimedDiscount,
  TVariant,
} from "@/sanity/queries/pages/zodSchemas/general";
import { VariantSelector } from "@/app/listing/_components/ProductCard";
import Precio from "../Precio";
import { TPricing } from "@/app/[type]/[id]/_components/Product";
import { GoChevronLeft } from "react-icons/go";
import { isGafa, isReloj } from "@/sanity/queries/pages/listingQueries";

type HeroProductProps = {
  product: TPerfumeLujo | TRelojLujo | TGafaLujo;
  images: imageType;
  selectedVariant: TVariant;
  setSelectedVariant: (variant: TVariant) => void;
  cantidad: number;
  setCantidad: (cantidad: number) => void;
  pricing: TPricing;
};

const HeroProduct = ({
  product,
  images,
  selectedVariant,
  setSelectedVariant,
  cantidad,
  setCantidad,
  pricing,
}: HeroProductProps) => {
  return (
    <section className="lg:grid lg:grid-cols-12 gap-8 row-auto w-full lg:max-w-screen-xl lg:py-8">
      {/* Product view */}
      <GalleryProduct
        className="col-start-1 col-span-6"
        imagesProduct={images}
        orientation={!isReloj(product) ? "horizontal" : "vertical"}
      />

      <section className="relative row-start-1 col-start-7 col-span-6 flex flex-col">
        <header className="default-paddings lg:px-4 flex flex-col gap-2 lg:gap-3">
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

          <h1 className="text-gray-800 text-4xl font-jomolhari capitalize leading-none w-full">
            {product.marca}
          </h1>
          <h1 className="text-2xl text-gray-600 font-jomolhari capitalize leading-none ">
            {isPerfumeLujo(product) ? `${product.parteDeUnSet ? "Set " :""}${product.titulo}` : product.modelo}
          </h1>
          {isGafa(product) && product.descripcion && (
            <p className="font-tajawal leading-tight lg:leading-tight text-base lg:text-lg text-gray-600 ">
              {product.descripcion}
            </p>
          )}
          {isReloj(product) && product.descripcion && (
            <p className="font-tajawal leading-tight lg:leading-tight text-base lg:text-lg text-gray-600 ">
              {product.descripcion}
            </p>
          )}
          {isPerfumeLujo(product) && (
            <h2 className="text-gray-600 text-xl font-normal font-tajawal leading-none mt-0.5">
              {product.concentracion} - {"tamano" in selectedVariant && selectedVariant.tamano}ml
            </h2>
          )}
          <p className="text-zinc-500 text-sm md:text-base font-normal font-tajawal leading-none md:leading-none">
            <span className="capitalize">
              {product.marca} | {product.genero}
            </span>
          </p>
          <span className="text-zinc-500 text-sm md:text-base md:leading-none font-normal font-tajawal leading-none">
            Código: {selectedVariant.codigoDeReferencia}
          </span>
          <Precio
            dontDisplayPaymentOptions={product.mostrarCredito ? false : true}
            fullPrice={pricing.precioSinDescuento}
            discountedPrice={
              pricing.timedDiscountPrice || pricing.precioConDescuento
            }
          />
        </header>

        <section className="default-paddings lg:px-4 py-2 pb-6 lg:pb-2 flex first:flex-col gap-6 font-tajawal">
          { product.variantes.length > 1 &&
            <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />}
          <Cantidad
            cantidad={cantidad}
            anadirACantidad={() => setCantidad(cantidad + 1)}
            restarACantidad={() => setCantidad(cantidad - 1)}
          />
        </section>

        <AddToCart
          product={product}
          quantity={cantidad}
          selectedVariant={selectedVariant}
          pricing={pricing}
          className="hidden static shadow-none w-full px-4 space-y-2 lg:block"
        />

        <section className="px-4 hidden pb-0 lg:block">
          <NuestrasComprasIncluyen
            garantia={isPerfumeLujo(product) ? undefined : product.garantia}
          />
        </section>
      </section>
    </section>
  );
};

export default HeroProduct;
