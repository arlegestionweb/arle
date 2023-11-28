import {
  GiftIcon,
  MessagesIcon,
  SecurityCheckIcon,
  ShippingBoxIcon,
} from "./Icons";

const NuestrasComprasIncluyen = ({
  garantia,
}: {
  garantia: {
    meses: number;
  };
}) => {
  return (
    <section>
      <h2 className="text-zinc-800 text-[28px] font-normal font-kanit leading-loose">
        Nuestras compras online incluyen:
      </h2>
      <div className="flex flex-col gap-4 lg:grid grid-cols-2 lg:gap-x-3 lg:gap-y-2">
        <ItemComprasIncluyen
          title="Muestras adicionales"
          description="Recibe muestras de otros productos."
          icon={<GiftIcon />}
        />
        <ItemComprasIncluyen
          title="Envío gratis"
          description="Por compras mayores a [$valor-minimo]."
          icon={<ShippingBoxIcon />}
        />
        <ItemComprasIncluyen
          title="Asesoría personalizada"
          description="Contáctanos para solucionar tus dudas."
          icon={<MessagesIcon />}
        />
        <ItemComprasIncluyen
          title={`Garantía de ${garantia.meses} meses`}
          description="En todos nuestros productos"
          icon={<SecurityCheckIcon />}
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
    <div className="px-2 py-3 bg-color-bg-surface-1-default border border-stone-300 items-center justify-start gap-[9px] inline-flex w-full">
      {icon}
      <div>
        <h3 className="basis-0 text-zinc-800 text-sm font-bold font-tajawal leading-[16.80px]">
          {title}
        </h3>
        <p className="text-neutral-600 text-sm font-normal font-tajawal leading-[16.80px]">
          {description}
        </p>
      </div>
    </div>
  );
};
