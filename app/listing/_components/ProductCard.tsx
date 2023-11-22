"use client";
import Image from "next/image";
import {
  TGafa,
  TProduct,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import Button from "../../_components/Button";
import { LuShoppingCart } from "react-icons/lu";
import ProductSlide from "./ProductSlide";
import Link from "next/link";
import Labels, { LabelTypes } from "../../_components/Labels";

const ProductoCard = ({ producto }: { producto: TProduct }) => {
  // console.log(producto);

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

const CardLayout = ({ product }: { product: TProduct }) => {

  const productPrices = product.variantes.map(variante => variante.precio);
  console.log({productPrices, variantes: product.variantes});
  
  
  // const maxPrice = Math.max(...productPrices);


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
        <p className="text-[18px] font-medium leading-5 text-[#4f4f4f]">
          ${product.variantes[0].precio}
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
