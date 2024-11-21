"use client"

import { useCartStore } from "@/app/_components/cart/store";
import Link from "next/link";

const TryAgainButton = () => {

  const { openCart } = useCartStore();

  return (
    <Link href="/listing" className="mt-4 dark-button button-float" onClick={()=> openCart()}>Inténtalo de nuevo.</Link>
  )
}

export default TryAgainButton