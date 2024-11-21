"use client";

import { useCartStore } from "@/app/_components/cart/store";
import { useEffect } from "react";

const RemoveCartItems = ({ cartId, success }: {
  cartId?: string;
  success?: boolean;
}) => {

  const { id, clearCart, closeCart, resetCartId } = useCartStore();


  useEffect(() => {
    closeCart();
    if(!success){
      resetCartId();
    } else {
      if (id === cartId) {
        clearCart();
      }
    }
  }, [])

  return null
}

export default RemoveCartItems;