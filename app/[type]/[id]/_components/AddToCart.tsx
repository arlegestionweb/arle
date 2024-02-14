import Button from "@/app/_components/Button";
import { cn } from "@/app/_lib/utils";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { useCartStore } from "@/app/_components/cart/store";
import { TPricing } from "./Product";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";

type PropsAddToCart = {
  className?:string;
  product: TProduct;
  selectedVariant: TVariant;
  quantity: number;
  pricing: TPricing;
}

const AddToCart = ({className, pricing, product, quantity, selectedVariant}:PropsAddToCart) => {
  

  const price = pricing.finalPrice;

  const { addItem } = useCartStore();
  const addToCart = (producto: TProduct, selectedVariant: TVariant, quantity: number = 1) => {
    addItem({
      productId: producto._id,
      variantId: selectedVariant.codigoDeReferencia,
      price: pricing.finalPrice,
      quantity,
      productType: producto._type,
      discountType: "none",
      originalPrice: pricing.precioSinDescuento,
    });
  };

  return (
    <div className={cn("w-[90vw] max-w-lg lg:max-w-none flex flex-col gap-2.5 sticky bottom-5 items-center bg-white shadow py-2 px-2 ", className)}>
      <Button disabled = {selectedVariant.tag === "Agotado" ? true : selectedVariant.unidadesDisponibles === 0 ? true : false} onClick={() => addToCart(product, selectedVariant, quantity)} className="w-full lg:max-w-sm flex justify-center items-center gap-2 button-float">
      <LuShoppingCart className="text-base"/>
        Añadir al Carrito
      </Button>
      <Button disabled = {selectedVariant.tag === "Agotado" ? true : selectedVariant.unidadesDisponibles === 0 ? true : false} labelType={"dark"} className="w-full lg:max-w-sm flex justify-center items-center gap-2 button-float">
      <MdOutlinePayments className="text-base"/> Compra Rápida
      </Button>
    </div>
  );
};

export default AddToCart;
