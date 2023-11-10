import Image from "next/image";
import {
  TProduct,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";
import Button from "../Button";
import { LuShoppingCart } from "react-icons/lu";

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
    <div className="w-[288px] flex flex-col gap-4">
      <section className="w-[288px] h-[288px] overflow-hidden bg-black">
        <Image
          src={src}
          alt={alt}
          width={288}
          height={288}
          className="object-cover"
        />
      </section>

      <section className=" font-tajawal flex flex-col gap-3">
        <h3 className="text-xl font-bold leading-6 text-[#303030]">{titulo}</h3>
        <p className="text-[18px] font-medium leading-5 text-[#4f4f4f]">{price}</p>
      </section>
      <Button className="bg-black text-[#CFCFCF] flex justify-center items-center gap-2">
      <LuShoppingCart/>
        <span className="font-inter text-base font-medium leading-6">Agregar</span>
      </Button>
    </div>
  );
};

export default ProductoCard;
