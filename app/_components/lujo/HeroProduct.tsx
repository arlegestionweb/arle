import Cantidad from "@/app/[type]/[id]/_components/Cantidad";
import MobileAddToCart from "@/app/[type]/[id]/_components/MobileAddToCart";
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
import { isPerfume } from "@/sanity/queries/pages/listingQueries";
import { imageType } from "../types";

type HeroProductProps = {
  product: TPerfumeLujo | TRelojLujo | TGafaLujo;
  images: imageType;
};

const HeroProduct = ({ product, images }: HeroProductProps) => {
  return (
    <section className="lg:grid lg:grid-cols-12 gap-8 lg:pb-12 min-h-[70vh] row-auto w-full lg:max-w-mx">
      {/* Product view */}
      <GalleryProduct
        className="col-start-1 col-span-6"
        imagesProduct={images}
        orientation={isPerfumeLujo(product) ? "horizontal" : "vertical"}
      />

      <section className="row-start-1 col-start-7 col-span-6 flex flex-col">
        <Labels
          className="mx-4 relative max-w-fit lg:mt-0 mb-2"
          labelType={"ultimas unidades"}
          label={"ultimas unidades"}
        />
        <header className="px-4 ">
          <h1 className="text-zinc-800 text-[32px] font-semibold font-crimson leading-9 w-full">
            {isPerfumeLujo(product) ? product.titulo : product.modelo}
          </h1>
          <h2 className="text-neutral-600 text-xl font-medium font-tajawal leading-normal">
            {isPerfumeLujo(product) ? product.concentracion : ""}
          </h2>
          <p className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            <span className="capitalize">
              {product.marca} | {product.genero}
            </span>
          </p>
          <span className="text-zinc-500 text-sm font-normal font-tajawal leading-[16.80px]">
            CODE:{product.variantes[0].codigoDeReferencia}
          </span>
          <p className="text-zinc-800 text-[32px] font-normal font-crimson leading-9">
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

        <section className="px-4 mb-6 lg:my-6 lg:px-8">
          <Cantidad />
        </section>

        <MobileAddToCart className="hidden static shadow-none w-full py-6 px-4 gap-6 space-y-2 lg:block" />

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
