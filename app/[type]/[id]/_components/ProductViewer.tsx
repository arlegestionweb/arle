"use client"
import { ProductTypes, productPixelView } from "@/app/_lib/pixelActions"
import { useEffect } from "react"

type ObjectType = {
    productObject: ProductTypes
}
const ProductViewer = ({productObject}: ObjectType) => {

	useEffect( () => {
		productPixelView(productObject);
	}, [])

  return (<></>)
}

export default ProductViewer