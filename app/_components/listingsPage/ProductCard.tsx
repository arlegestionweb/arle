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
      <br/>
      ${producto.precio}
    </div>
  );
};

export default ProductoCard;
