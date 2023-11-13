import Image from "next/image";
import {
  TProduct,
  isGafa,
  isPerfume,
  isReloj,
} from "@/sanity/queries/pages/listingQueries";

const ProductoCard = ({ producto }: { producto: TProduct }) => {

  if (isPerfume(producto)) {
    // console.log("perfumes", { producto });
    return (
      <div className="w-[136px] h-[279px] flex-col justify-start items-start gap-2 inline-flex">
        <Image
          src={producto.imagenes[0].url}
          alt={producto.imagenes[0].alt || ""}
          width={136}
          height={136}
          className="object-cover min-w-[136px]"
        />
        {producto.titulo}
        <br />
        {producto.marca}
      </div>
    );
  }

  if (isReloj(producto)) {
    // console.log("relojes", { producto });
    return (
      <div className="w-[136px] h-[279px] flex-col justify-start items-start gap-2 inline-flex">
        <Image
          src={producto.variantes[0].imagenes[0].url}
          alt={producto.variantes[0].imagenes[0].alt || ""}
          width={136}
          height={136}
          className="object-cover min-w-[136px]"
        />
        {producto.modelo}
        <br />
        {producto.marca}
      </div>
    );
  }
  // if (!producto.imagenes) return null;

  if (isGafa(producto)) {
    // producto
    return (
       <div className="w-[136px] h-[279px] flex-col justify-start items-start gap-2 inline-flex">
          <Image
            src={producto.variantes[0].imagenes[0].url}
            alt={producto.variantes[0].imagenes[0].alt || ""}
            width={136}
            height={136}
            className="object-cover min-w-[136px]"
          />
          {producto.modelo}
          <br />
          {producto.marca}
        </div>
    );

  }

};

export default ProductoCard;
