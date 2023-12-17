import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import MobileAddToCart from "@/app/[type]/[id]/_components/MobileAddToCart";
import NuestrasComprasIncluyen from "@/app/[type]/[id]/_components/NuestrasComprasIncluyen";
import {
  colombianPriceStringToNumber,
  numberToColombianPriceString,
} from "@/utils/helpers";
import Labels from "../Labels";
import GalleryProduct from "./GalleryProduct";
import { TGafaLujo, TPerfumeLujo, TRelojLujo, isPerfumeLujo } from "@/sanity/queries/pages/types";
import { isPerfume } from "@/sanity/queries/pages/listingQueries";
import { imageType } from "../types";

type HeroProductProps = {
  product: TPerfumeLujo | TRelojLujo | TGafaLujo;
  images: imageType;
};

const HeroProduct = ({ product, images }: HeroProductProps) => {
  return (
    <section className="lg:grid lg:grid-cols-12 gap-8 min-h-screen row-auto w-full lg:max-w-[calc(1280px+32px)]">
      {/* Product view */}
      <GalleryProduct
        className="col-start-1 col-span-6"
        imagesProduct={images}
        orientation={isPerfumeLujo(product) ? "horizontal": "vertical"}
      />

      <section className="row-start-1 col-start-7 col-span-6 flex flex-col">
        <Labels
          className="mx-4 relative max-w-fit mt-4 lg:mt-0 mb-2"
          labelType={"ultimas unidades"}
          label={"ultimas unidades"}
        />
        <header className="px-4 ">
          <h1 className="text-zinc-800 text-[32px] font-normal font-kanit leading-10 w-full">
            {product.marca}
          </h1>
          <h2>
            {product.marca} | {product.genero}
          </h2>
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            CODE:{product.variantes[0].codigoDeReferencia}
          </span>
          <p className="text-zinc-800 text-[32px] font-normal font-kanit leading-9">
            ${product.variantes[0].precio}
          </p>
          <div className="text-justify">
            <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
              Págalo a 4 cuotas de $
              {numberToColombianPriceString(
                colombianPriceStringToNumber(product.variantes[0].precio) / 4
              )}{" "}
              sin intereses.
              <br />
              [provider]
            </span>
            <span className="text-neutral-600 text-sm font-normal font-tajawal leading-[16.80px]">
              .{" "}
            </span>
            <span className="text-zinc-800 text-sm font-normal font-tajawal leading-[16.80px]">
              Learn More
            </span>
          </div>{" "}
        </header>

        {/* <VariantSelector
    product={product}
    selectedVariant={selectedVariant}
    setSelectedVariant={setSelectedVariant}
  /> */}

        <section className="px-4 mt-2 mb-6">
          <Cantidad />
        </section>

        <MobileAddToCart className="hidden static shadow-none w-full px-4 gap-6 space-y-2 lg:block" />

        <section className="px-4 hidden lg:block">
          <NuestrasComprasIncluyen garantia={isPerfumeLujo(product)? undefined: product.garantia } />
        </section>
      </section>
    </section>
  );
};

export default HeroProduct;
