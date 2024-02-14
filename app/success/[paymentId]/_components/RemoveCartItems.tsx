"use client";

import { useCartStore } from "@/app/_components/cart/store";
import { useEffect } from "react";

const RemoveCartItems = ({ cartId }: {
  cartId: string;
}) => {

  const { id, clearCart } = useCartStore();

  useEffect(() => {
    if (id === cartId) {
      clearCart();
    }
  }, [id, cartId])

  return null
}

export default RemoveCartItems;