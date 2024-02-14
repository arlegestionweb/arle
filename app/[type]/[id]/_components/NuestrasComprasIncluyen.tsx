import { RiSecurePaymentLine } from "react-icons/ri";
import { PiCertificateBold } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { LuShieldCheck } from "react-icons/lu";

const NuestrasComprasIncluyen = ({
  garantia,
}: {
  garantia?: {
    meses: number;
  };
}) => {
  return (
    <section className="pt-4 pointer-events-none">
      <h2 className="text-gray-600 text-xl w-full font-semibold font-tajawal leading-none mb-1">
        Nuestras compras online incluyen:
      </h2>
      <div className="flex flex-col gap-2 sm:grid grid-cols-2 lg:gap-x-3 lg:gap-y-2">
        <ItemComprasIncluyen
          title="Pagos Seguros"
          description="Paga con tranquilidad a través de Wompi"
          icon={<RiSecurePaymentLine className=" w-5 h-5" />}
        />
        {garantia ? (
          <ItemComprasIncluyen
            title={`Garantía de ${garantia.meses} meses`}
            description="Para nuestros productos"
            icon={<LuShieldCheck className=" w-5 h-5" />}
          />
        ) : (
          <ItemComprasIncluyen
            title={`Originalidad`}
            description="Garantizamos Productos 100% Originales"
            icon={<PiCertificateBold className=" w-5 h-5" />}
          />
        )}
        <ItemComprasIncluyen
          title="Envío gratis"
          description="Por compras mayores a $250.000."
          icon={<MdOutlineLocalShipping className=" w-5 h-5" />}
        />
        <ItemComprasIncluyen
          title="Asesoría personalizada"
          description="Contáctanos para solucionar tus dudas."
          icon={<BiChat className=" w-5 h-5" />}
        />
      </div>
    </section>
  );
};

export default NuestrasComprasIncluyen;

const ItemComprasIncluyen = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <section className="px-2 py-3 gap-2 bg-gray-100 border border-gray-300 items-center justify-start flex">
      <header className="flex w-5 text-gray-700">{icon}</header>
      <footer className="flex flex-col ">
        <h3 className="basis-0 text-gray-800 text-sm font-bold font-tajawal leading-[16.80px]">
          {title}
        </h3>
        <p className="text-gray-600 text-sm font-normal font-tajawal leading-[16.80px]">
          {description}
        </p>
      </footer>
    </section>
  );
};
