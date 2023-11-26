import { FastShoppingCartIcon, ShoppingCartIcon } from "./Icons";

const MobileAddToCart = () => {
  return (
    <div className="flex flex-col gap-2.5 sticky bottom-5 mx-auto items-center bg-color-bg-surface-1-default shadow py-2 px-2 my-2 w-fit">
      <button className="flex items-center border w-full gap-2 bg-color-bg-surface-1-default px-3 py-2">
        <ShoppingCartIcon /> Añadir al carrito
      </button>
      <button className="flex items-center border w-full gap-2 bg-color-bg-surface-1-default px-3 py-2">
        <FastShoppingCartIcon /> Compra rápida
      </button>
    </div>
  );
};

export default MobileAddToCart;
