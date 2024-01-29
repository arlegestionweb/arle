import Button from "@/app/_components/Button";
import { FastShoppingCartIcon, ShoppingCartIcon } from "./Icons";
import { cn } from "@/app/_lib/utils";
import { TProduct } from "@/sanity/queries/pages/listingQueries";
import { TVariant } from "@/sanity/queries/pages/zodSchemas/general";
import { useCartStore } from "@/app/_components/cart/store";
import { TPricing } from "./Product";

type PropsAddToCart = {
  className?:string;
  product: TProduct;
  selectedVariant: TVariant;
  quantity: number;
  pricing: TPricing;
}

const AddToCart = ({className, pricing, product, quantity, selectedVariant}:PropsAddToCart) => {
  
  const {addItem} = useCartStore();

  console.log({pricing})

  const price = pricing.finalPrice;

  const addToCart = (producto: TProduct, selectedVariant: TVariant, quantity: number = 1) => {
    console.log({price})
    addItem({
      productId: producto._id,
      variantId: selectedVariant.registroInvima,
      price: price,
      quantity,
      productType: producto._type,
      discountType: pricing.discountTypeUsed,
      originalPrice: pricing.precioSinDescuento,
    });
  };
  return (
    <div className={cn("w-80 flex flex-col gap-2.5 sticky bottom-5 mx-auto items-center bg-color-bg-surface-1-default shadow py-2 px-2 my-2", className)}>
      <Button onClick={() => addToCart(product, selectedVariant, quantity)} className="flex justify-center items-center w-full gap-2 px-3 py-2">
        <ShoppingCartIcon /> Añadir al carrito
      </Button>
      <Button labelType={"dark"} className="flex justify-center items-center w-full gap-2 px-3 py-2">
        <FastShoppingCartIcon /> Compra rápida
      </Button>
    </div>
  );
};

export default AddToCart;
