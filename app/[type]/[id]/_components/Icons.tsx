import Image from "next/image";

export const MinusIcon = () => {
  return (
    <Image src="/icons/minus.png" width={14} height={14} alt="Icono de menos" />
  );
};


export const PlusIcon = () => {
  return (
    <Image src="/icons/plus.png" width={14} height={14} alt="Icono de menos" />
  );
};

export const GiftIcon = () => {
  return (
    <Image src="/icons/gift.png" width={20} height={20} alt="Icono de regalo" />
  );
}

export const ShippingBoxIcon = () => {
  return (
    <Image src="/icons/box.png" width={20} height={20} alt="Icono de envío" />
  );
}

export const MessagesIcon = () => {
  return (
    <Image src="/icons/messages.png" width={20} height={20} alt="Icono de mensajes" />
  );
}

export const SecurityCheckIcon = () => {
  return (
    <Image src="/icons/securityCheck.png" width={20} height={20} alt="Icono de seguridad" />
  );
}