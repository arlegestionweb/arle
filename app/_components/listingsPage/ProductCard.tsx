import Image from "next/image";
import {
  GafaType,
  PerfumeLujoType,
  PerfumePremiumType,
  RelojType,
} from "../types";

const ProductoCard = ({
  producto,
}: {
  producto: PerfumeLujoType | PerfumePremiumType | RelojType | GafaType;
}) => {
  if (!producto.imagenes) return null;
  function hasMarca(obj: any): obj is { marca: { titulo: string } } {
    return !!obj.marca && typeof obj.marca.titulo === 'string';
  }



  return (
    <div className="w-[136px] h-[279px] flex-col justify-start items-start gap-2 inline-flex">
      <Image
        src={producto.imagenes[0].url}
        alt={producto.imagenes[0].alt}
        width={136}
        height={136}
        className="object-cover min-w-[136px]"
      />
      {producto.modelo}
      {hasMarca(producto) && producto.type.includes("reloj") && (
        <>
          <br />
          {producto.marca.titulo}
        </>
      )}
      <br />${producto.precio}
    </div>
  );
};

export default ProductoCard;
