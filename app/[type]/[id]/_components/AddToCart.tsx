import Button from "@/app/_components/Button";
import { FastShoppingCartIcon, ShoppingCartIcon } from "./Icons";
import { cn } from "@/app/_lib/utils";

type PropsAddToCart = {
  className?:string
}

const AddToCart = ({className}:PropsAddToCart) => {
  return (
    <div className={cn("w-80 flex flex-col gap-2.5 sticky bottom-5 mx-auto items-center bg-color-bg-surface-1-default shadow py-2 px-2 my-2", className)}>
      <Button className="flex justify-center items-center w-full gap-2 px-3 py-2">
        <ShoppingCartIcon /> Añadir al carrito
      </Button>
      <Button labelType={"dark"} className="flex justify-center items-center w-full gap-2 px-3 py-2">
        <FastShoppingCartIcon /> Compra rápida
      </Button>
    </div>
  );
};

export default AddToCart;
