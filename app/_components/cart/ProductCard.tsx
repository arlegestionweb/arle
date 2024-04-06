import Image from "next/image";
import {
  isGafaLujo,
  isPerfumeLujo,
  isPerfumePremium,
  isRelojLujo,
} from "@/sanity/queries/pages/types";
import {
  TProduct,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import Link from "next/link";
import ImageWrapper from "@/app/listing/_components/ImageWrapper";

const ProductCard = ({
  product,
  item,
}: {
  product: TProduct;
  item: {
    originalPrice: number;
    price: number;
    quantity: number;
    variantId: string;
  };
}) => {
  const image =
    product._type === "relojesLujo" ||
      product._type === "relojesPremium" ||
      product._type === "gafasLujo" ||
      product._type === "gafasPremium"
      ? product.variantes[0].imagenes[0]
      : product.imagenes[0];

  const variant = product.variantes.find(
    (variante) => variante.codigoDeReferencia === item.variantId
  );

  return (
    <li key={('sanityUrl' in image) ? image.sanityUrl : image.url} className="flex items-center gap-4">
      {image && (
        <ImageWrapper
          src={('sanityUrl' in image) ? image.sanityUrl : image.url}
          alt={image?.alt}
          width={110}
          height={110}
          className="object-contain h-28 w-28"
        />
      )}
      <section className="flex flex-col font-tajawal">
        {/* <h4 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">
          {productTitle}
        </h4>
        <h5 className="text-zinc-800 text-xl font-medium font-tajawal leading-normal">
          {product.marca}
        </h5>

        <Precio
          fullPrice={item.originalPrice}
          discountedPrice={item.price < item.originalPrice ? item.price : undefined}
          dontDisplayPaymentOptions
        /> */}

        <h2 className="leading-none text-lg md:text-xl md:leading-none font-bold  text-gray-800 capitalize">
          {product.marca}
        </h2>
        <h3 className="text-md mb-1 md:text-lg md:leading-none font-medium text-gray-700 leading-none">
          {isPerfumePremium(product)
            ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${product.detalles.concentracion
            }`
            : isPerfumeLujo(product)
              ? `${product.parteDeUnSet ? "Set " : ""}${product.titulo} - ${product.concentracion
              }`
              : isReloj(product)
                ? product.modelo
                : product.modelo}
        </h3>
        {isPerfume(product) && variant && (
          <p className="text-sm leading-none capitalize text-gray-600">
            {`${"tamano" in variant && variant.tamano}ml | `}
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

        {variant && (
          <p className="text-sm leading-none capitalize text-gray-600">
            {"Código: "}
            {variant.codigoDeReferencia}
          </p>
        )}
        <Link
          href={product.slug}
          className="mt-2 font-sans py-1 max-w-[200px] text-xs dark-button button-float"
        >
          Ver Producto
        </Link>
      </section>
    </li>
  );
};

export default ProductCard;
