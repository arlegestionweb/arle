import Image from "next/image";
import {
  TProduct,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";

const ProductoCard = ({ producto }: { producto: TProduct }) => {
  if (isPerfume(producto)) {
    return (
      <CardLayout
        src={producto.imagenes[0].url}
        alt={producto.imagenes[0].alt || ""}
        titulo={producto.titulo}
        price={producto.marca}
      />
    );
  }

  if (isReloj(producto)) {
    return (
      <CardLayout
        src={producto.variantes[0].imagenes[0].url}
        alt={producto.variantes[0].imagenes[0].alt || ""}
        titulo={producto.modelo}
        price={producto.marca}
      />
    );
  }
  // if (!producto.imagenes) return null;

  return (
    <div className="w-[136px] h-[279px] flex-col justify-start items-start gap-2 inline-flex">
      gafas here
    </div>
  );
};

const CardLayout = ({
  src,
  alt,
  titulo,
  price,
}: {
  src: string;
  alt: string;
  titulo: string;
  price: string;
}) => {
  return (
    <div className="bg-blue-300 w-full h-[279px] flex-col justify-start items-start gap-2 inline-flex">
      <Image
        src={src}
        alt={alt}
        width={136}
        height={136}
        className="object-cover min-w-[136px]"
      />
      {titulo}
      <br />
      {price}
    </div>
  );
};

export default ProductoCard;
